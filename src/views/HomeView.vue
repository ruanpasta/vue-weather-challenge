<template>
  <main>
    <div class="wheater-cards">
      <template v-for="(state, index) in statesComputed" :key="index">
        <component :is="WeatherCard" v-bind="state" @onGetData="getData" />
      </template>
    </div>
  </main>
</template>

<script setup>
import { Weather, WeatherCard } from "@/components/WeatherCard";
import { computed, onBeforeMount, reactive } from "@vue/runtime-core";
import { WeatherService } from "@/services";
import { useStore } from "vuex";

const service = new WeatherService();

const getTemperatureColor = (value) => {
  if (value <= 5) return "cold";
  if (value > 25) return "hot";
  return "neutral";
};

const getData = async (city) => {
  const element =
    weathersStates.find((weather) => weather.name.toString().includes(city)) ||
    {};
  element.loading = true;

  // const tenMinutes = 610 * 1000;
  const tenMinutes = 20 * 1000;

  try {
    const { data } = await service.getWeatherByCityName(city);
    element.loading = false;
    setTimeout(() => getData(city), tenMinutes);
    return mountedWeather(data);
  } catch (err) {
    element.loading = false;
    return new Weather({
      name: city,
      title: city,
      temperature: 0,
      lastUpdate: new Date(),
      errorMessage: err.toString(),
    });
  }
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

const canUpdate = (weather) => {
  if (weather.lastUpdate) {
    const currentDate = new Date(Date.parse(weather.lastUpdate));
    const differenceSeconds =
      (new Date().getTime() - currentDate.getTime()) / 1000;
    return Math.abs(differenceSeconds) > 600;
  }
  return false;
};

const getWeathersFromWeatherState = (state) => {
  return state.map((weather) => {
    if (canUpdate(weather)) return getData(weather.name);
    if (weather.lastUpdate && typeof weather.lastUpdate === "string")
      weather.lastUpdate = new Date(Date.parse(weather.lastUpdate));
    return weather;
  });
};

const getWeathersStates = async () => {
  const state = getDataFromStorage("weathersStates");

  if (state && state.length) return getWeathersFromWeatherState(state);
  else {
    return [
      await getData("nuuk"),
      await getData("urubici"),
      await getData("nairobi"),
    ];
  }
};

const getDataFromStorage = (name) => {
  try {
    return JSON.parse(localStorage.getItem(name));
  } catch (_) {
    return null;
  }
};

const weathersStates = reactive([]);

const updateWeather = async () => {
  const state = await getWeathersStates();
  state.map((weather) => weathersStates.push(weather));
  sessionStorage.setItem("weathersStates", JSON.stringify(weathersStates));
};

const statesComputed = computed(() => weathersStates);

onBeforeMount(() => {
  console.log(useStore());
  updateWeather();
});

defineExpose({ WeatherCard, statesComputed, getData });
</script>

<style lang="scss">
main {
  @include fullHeight;
}

.wheater-cards {
  @include fullHeight;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  @media (max-width: 840px) {
    flex-direction: column;
    justify-content: start;
  }
}
</style>
