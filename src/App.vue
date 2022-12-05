<script setup>
import NavBar from "./components/NavBar.vue";

defineExpose({ NavBar });
</script>

<template>
  <div class="container">
    <NavBar />
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: 100%;
  display: grid;
  grid-template-rows: 60px;
}
</style>
