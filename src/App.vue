<script setup>
import Navbar from "@/components/Navbar.vue";
import WeatherCard from "@/components/WeatherCard.vue";
</script>

<template>
  <Navbar />
  <main>
    <WeatherCard />
  </main>
</template>

<style lang="scss">
.title {
  color: $primary-color;
}
</style>
