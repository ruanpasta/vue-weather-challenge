<script setup>
import WeatherInformations from "@/components/WeatherCard/WeatherInformations.vue";
import IconLoader from "@/components/icons/iconLoader.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
  temperatureColor: {
    type: String,
    default: "",
  },
  informations: {
    type: Array,
  },
  lastUpdate: {
    type: String,
  },
  loading: {
    type: Boolean,
  },
  errorMessage: {
    type: String,
  },
});

defineEmits(["onGetData"]);

defineExpose(props);
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
        <button type="button" @click="$emit('onGetData')">Try again</button>
      </div>
    </div>
    <template v-else>
      <div class="card__temperature" v-class-modifier="temperatureColor">
        <div>{{ temperature }}</div>
      </div>
      <WeatherInformations
        :lastUpdate="lastUpdate"
        :informations="informations"
      />
    </template>
  </div>
</template>

<style lang="scss" scoped>
$border-radius: 0.25rem;

h4 {
  font-weight: normal;
  margin: 0;
}

button {
  color: $dark;
  background-color: $white;
  padding: 0.62rem 0.93rem 0.62rem 0.93rem;
  margin-bottom: 1.87rem;
  font-size: 1.1em;
  border-radius: 1.87rem;
  border: solid 0.125rem #999;

  &:hover {
    filter: brightness(1.15);
  }

  &:active {
    filter: brightness(0.9);
  }
}

.card {
  margin: 0.93rem;

  background-color: $white;
  box-shadow: 0.063rem 0.12rem 0.18rem $grey;
  border-radius: $border-radius;
  text-align: center;
  width: 15.62rem;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
}

.card__title {
  font-size: 1.12rem;
  padding: 0.62rem;
  color: $dark;
  border-bottom: solid 0.06rem #f0f0f0;
}

.card__error-message {
  margin: 2rem 0 2rem 0;
}

.card__error-message__description {
  color: $red;
  font-size: 1em;
  font-weight: 600;
  margin-bottom: 0.93rem;
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
