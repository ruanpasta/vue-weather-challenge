import { Weather } from "@/components/WeatherCard";
import { WeatherService } from "@/services";

const service = new WeatherService();

const getTemperatureColor = (value) => {
  if (value <= 5) return "cold";
  if (value > 25) return "hot";
  return "neutral";
};

const mountedWeather = (data) => {
  const temperature = Number(data.main.temp.toFixed(0));

  const getInfos = (value, name, unit) =>
    value
      ? {
        description: name,
        value: `${value}`,
        valueType: unit || null,
      }
      : null;

  const humidity = getInfos(data.main.humidity, "Humidity", "%");

  const pressure = getInfos(data.main.pressure, "Pressure", "hPa");

  const informations = [];
  if (humidity) informations.push(humidity);
  if (pressure) informations.push(pressure);

  return new Weather({
    name: data.name,
    title: `${data.name}, ${data.sys.country}`,
    temperature,
    temperatureColor: getTemperatureColor(temperature),
    informations,
    lastUpdate: new Date(),
    loading: false,
    errorMessage: "",
  });
};

const getWeatherData = async ({ commit, state }, cityName) => {
  // const tenMinutes = 610 * 1000;
  const tenMinutes = 20 * 1000;
  commit("SET_LOADING_WEATHER", cityName, true);

  try {
    const { data } = await service.getWeatherByCityName(cityName);
    commit("SET_LOADING_WEATHER", cityName, false);
    setTimeout(() => getWeatherData({ commit, state }, cityName), tenMinutes);
    return mountedWeather(data);
  } catch (err) {
    commit("SET_LOADING_WEATHER", cityName, false);
    return new Weather({
      name: cityName,
      title: cityName,
      temperature: 0,
      lastUpdate: new Date(),
      errorMessage: err.toString(),
    });
  }
};

const canUpdate = (weather) => {
  if (weather.lastUpdate) {
    const currentDate = new Date(Date.parse(weather.lastUpdate));
    const differenceSeconds =
      (new Date().getTime() - currentDate.getTime()) / 1000;
    return Math.abs(differenceSeconds) > 600;
  }
  return false;
};

const getWeathersFromWeatherState = ({ commit, state }) => {
  state.forEach((weather) => {
    if (canUpdate(weather)) return actions.getWeather(weather.name);
    if (weather.lastUpdate && typeof weather.lastUpdate === "string")
      weather.lastUpdate = new Date(Date.parse(weather.lastUpdate));
    return commit("SET_WEATHER", weather);
  });
};

const getWeathersFromApiOrState = async ({ commit, state }) => {
  if (state && state.length) getWeathersFromWeatherState({ commit, state });
  else {
    await actions.getWeather("nuuk");
    await actions.getWeather("urubici");
    await actions.getWeather("nairobi");
  }
};

const actions = {
  getWeather({ commit, state }, cityName) {
    return new Promise((resolve) => {
      const data = getWeatherData({ commit, state }, cityName);
      resolve(commit("SET_WEATHER", data));
    });
  },
  getWeathers({ commit, state }) {
    return new Promise.resolve(getWeathersFromApiOrState({ commit, state }));
  }
};

export default actions;
