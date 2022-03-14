<script setup>
import WeatherInformations from "@/components/WeatherCard/WeatherInformations.vue";
import IconLoader from "@/components/icons/iconLoader.vue";
import { weatherCardProps } from "@/components/WeatherCard/weather.js";

const props = defineProps(weatherCardProps);

defineEmits(["onGetData"]);

defineExpose({ props, IconLoader, WeatherInformations });
</script>

<template>
  <div class="card">
    <div class="card__title">
      <h4>{{ title }}</h4>
    </div>
    <IconLoader class="card__temperature" v-if="loading" />
    <div v-else-if="errorMessage" class="card__error-message">
      <p class="card__error-message__description">{{ errorMessage }}</p>
      <div>
        <button type="button" @click="$emit('onGetData', name)">
          Try again
        </button>
      </div>
    </div>
    <template v-else>
      <div class="card__temperature" v-class-modifier="temperatureColor">
        <div>{{ temperature }}°</div>
      </div>
      <WeatherInformations
        :lastUpdate="lastUpdate"
        :informations="informations"
      />
    </template>
  </div>
</template>

<style lang="scss" scoped>
h4 {
  font-weight: normal;
  margin: 0;
}

button {
  color: $dark;
  background-color: $white;
  padding: $xxs-size $md-size $xxs-size $md-size;
  margin-bottom: $xl3-size;
  font-size: $lg-size;
  border-radius: $xl3-size;
  border: solid 0.125rem #999;

  &:hover {
    filter: brightness(1.15);
  }

  &:active {
    filter: brightness(0.9);
  }
}

.card {
  margin: $md-size;

  background-color: $white;
  box-shadow: 0.063rem 0.12rem 0.18rem $grey;
  border-radius: 0.25rem;
  text-align: center;
  width: 15.62rem;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
}

.card__title {
  font-size: $lg-size;
  padding: $xxs-size;
  color: $dark;
  border-bottom: solid 0.06rem #f0f0f0;
}

.card__error-message {
  margin: $xl3-size 0 $xl3-size 0;
}

.card__error-message__description {
  color: $red;
  font-size: $md-size;
  margin-bottom: $md-size;
}

.card__temperature {
  @include card__temperature;
}

.card__temperature--cold {
  @include card__temperature;
  color: $blue;
}
.card__temperature--neutral {
  @include card__temperature;
  color: $orange;
}
.card__temperature--hot {
  @include card__temperature;
  color: $red;
}
</style>
