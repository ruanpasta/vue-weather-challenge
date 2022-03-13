<script setup>
const props = defineProps({
  informations: {
    type: Array,
  },
  lastUpdate: {
    type: String,
  },
});

defineExpose(props);
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
          {{ info.value }}
          <span
            class="informations__items__item__value__type"
            v-if="info.valueType"
            >{{ info.valueType }}
          </span>
        </div>
      </div>
    </div>
    <div v-if="lastUpdate" class="informations__updated">
      Updated at <time>{{ lastUpdate }}</time>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.informations {
  color: $grey;
  background-color: $card-infos-background;
  border-bottom-left-radius: 0.25em;
  border-bottom-right-radius: 0.25em;
  padding: 0.93rem;
}

.informations__items {
  display: flex;
  justify-content: space-around;
  padding-bottom: 0.62rem;
}

.informations__items__item__description {
  padding-bottom: 0.31rem;
  text-transform: uppercase;
  font-size: 0.7em;
}

.informations__items__item__value {
  color: $dark;
  font-weight: 500;
}

.informations__items__item__value__type {
  font-size: 0.8em;
}

.informations__updated {
  font-size: 0.6em;

  time {
    text-transform: uppercase;
  }
}
</style>
