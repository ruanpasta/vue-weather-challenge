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
import { WeatherCard } from "../components/WeatherCard";
import { computed, onBeforeMount } from "@vue/runtime-core";
import { useStore } from "vuex";

const store = useStore();

const getData = (cityName) => store.dispatch("getWeather", { cityName });

const statesComputed = computed(() => store.getters.getWeathersState);

onBeforeMount(() => store.dispatch("getWeathers", {}));

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
