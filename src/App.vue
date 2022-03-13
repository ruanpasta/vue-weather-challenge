<script setup>
import NavBar from "@/components/NavBar.vue";
import WeatherCard from "@/components/WeatherCard/WeatherCard.vue";
import { computed } from "@vue/runtime-core";
import moment from "moment";

// const getTemperatureColor = (value) => {
//   if (value <= 5) return "cold";
//   if (value > 25) return "neutral";
//   return "hot";
// };

const statesComputed = computed(() => [
  {
    title: "Urubici, BR",
    temperature: 33,
    temperatureColor: "hot",
    lastUpdate: moment().format("h:mm:ss a"),
    informations: [
      {
        description: "Humidity",
        value: "75%",
        valueType: "",
      },
      {
        description: "Presure",
        value: "892",
        valueType: "hPa",
      },
    ],
  },
  {
    title: "Urubici, BR",
    temperature: 33,
    loading: true,
  },
  {
    title: "Urubici, BR",
    temperature: 4,
    temperatureColor: "cold",
    lastUpdate: "new Date()",
    informations: [],
    errorMessage: "Failed to get data",
  },
]);

const getData = () => {
  console.log("Buscar valores:");
};

defineExpose({ statesComputed, getData });
</script>

<template>
  <NavBar />
  <main>
    <div class="wheater-cards">
      <template v-for="(state, index) in statesComputed" :key="index">
        <component :is="WeatherCard" v-bind="state" @onGetData="getData" />
      </template>
    </div>
  </main>
</template>

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
