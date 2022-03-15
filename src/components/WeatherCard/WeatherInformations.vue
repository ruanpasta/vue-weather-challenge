<script setup>
import moment from "moment";

const props = defineProps({
  informations: { type: Array },
  lastUpdate: { type: Date },
});

defineExpose({ props, moment });
</script>

<template>
  <div v-if="lastUpdate || informations" class="informations">
    <div
      v-if="informations && informations.length > 0"
      class="informations__items"
    >
      <div
        class="informations__items__item"
        v-for="(info, index) in informations"
        :key="index"
      >
        <div class="informations__items__item__description">
          {{ info.description }}
        </div>
        <div class="informations__items__item__value">
          {{ info.value
          }}<span class="informations__items__item__value__type"
            >{{ info.valueType }}
          </span>
        </div>
      </div>
    </div>
    <div v-if="lastUpdate" class="informations__updated">
      Updated at <time>{{ moment(lastUpdate).format("h:mm:ss a") }}</time>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.informations {
  color: $grey;
  background-color: $card-infos-background;
  border-bottom-left-radius: 0.25em;
  border-bottom-right-radius: 0.25em;
  padding: $sm-size;
}

.informations__items {
  display: flex;
  justify-content: space-around;
  padding-bottom: $xxs-size;
}

.informations__items__item__description {
  padding-bottom: 0.31rem;
  text-transform: uppercase;
  font-size: $xs-size;
}

.informations__items__item__value {
  color: $dark;
  font-weight: 500;
}

.informations__items__item__value__type {
  font-size: $sm-size;
}

.informations__updated {
  font-size: $xxs-size;

  time {
    text-transform: uppercase;
  }
}
</style>
