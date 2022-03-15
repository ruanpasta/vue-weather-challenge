import { Weather } from "@/components/WeatherCard";
import { WeatherService } from "@/services";

const service = new WeatherService();

const mountedWeather = (data, cityName) => {
  const temperature = Number(data.main.temp.toFixed(0));

  const getInfos = (value, name, unit) =>
    value
      ? { description: name, value: `${value}`, valueType: unit || null }
      : null;

  const humidity = getInfos(data.main.humidity, "Humidity", "%");

  const pressure = getInfos(data.main.pressure, "Pressure", "hPa");

  const informations = [];
  if (humidity) informations.push(humidity);
  if (pressure) informations.push(pressure);

  return new Weather({
    name: cityName,
    title: `${data.name}, ${data.sys.country}`,
    temperature,
    informations,
    lastUpdate: new Date(),
    loading: false,
    errorMessage: "",
  });
};

const canUpdate = (lastUpdate) => {
  if (lastUpdate) {
    const currentDate = new Date(Date.parse(lastUpdate));
    const differenceSeconds =
      (new Date().getTime() - currentDate.getTime()) / 1000;
    const tenMinutesInSeconds = 600;
    return Math.abs(differenceSeconds) <= tenMinutesInSeconds;
  }
  return false;
};

const getWeathersFromApiOrState = async ({ dispatch }) => {
  await dispatch("getWeather", { cityName: "nuuk" });
  await dispatch("getWeather", { cityName: "urubici" });
  await dispatch("getWeather", { cityName: "nairobi" });
};

const actions = {
  async getWeather(
    { commit, dispatch, getters },
    { cityName, isCheckDataInState }
  ) {
    commit("UPDATE_WEATHER_LOADING", { cityName, loading: true });

    const tenMinutes = 610 * 1000;

    const setTimer = () =>
      setTimeout(
        () =>
          dispatch("getWeather", {
            cityName,
            isCheckDataInState: true,
          }),
        tenMinutes
      );

    const lastUpdated = getters.getLastUpdatedFromCity(cityName);
    if (isCheckDataInState && canUpdate(lastUpdated)) {
      commit("UPDATE_WEATHER_LOADING", { cityName, loading: false });
      return setTimer();
    }

    await service
      .getWeatherByCityName(cityName)
      .then((response) => {
        setTimer();
        const weather = mountedWeather(response.data, cityName);
        commit("SET_WEATHER", { weather });
      })
      .catch((err) => {
        const weather = new Weather({
          name: cityName,
          title: cityName,
          temperature: 0,
          lastUpdate: new Date(),
          loading: false,
          errorMessage: err.toString(),
        });
        commit("SET_WEATHER", { weather });
      })
      .finally(() =>
        commit("UPDATE_WEATHER_LOADING", { cityName, loading: false })
      );
  },
  async getWeathers({ dispatch }) {
    await getWeathersFromApiOrState({ dispatch });
  },
};

export default actions;
