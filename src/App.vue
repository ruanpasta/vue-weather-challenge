<script setup>
import IconLoader from "@/components/icons/iconLoader.vue";
import ImageLogo from "@/components/images/imageLogo.vue";
import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <Navbar />
  <h1 class="title">Weather now</h1>
  <IconLoader />
  <ImageLogo />
</template>

<style lang="scss">
.title {
  color: $primary-color;
}
</style>
