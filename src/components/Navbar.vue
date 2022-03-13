<script setup>
import ImageLogo from "@/components/images/imageLogo.vue";

defineExpose({ ImageLogo });
</script>

<template>
  <nav>
    <ul class="nav">
      <li class="nav__item">
        <figure>
          <ImageLogo width="11rem" height="1.62rem" />
        </figure>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.nav {
  background-color: $white;
  padding: 0.8rem;

  display: flex;
  flex-direction: row;
  justify-content: center;
  box-shadow: 0 0 0.18rem $grey;
}

.nav__item {
  list-style-type: none;
  margin: 0 0.9rem 0 0.9rem;
  display: inline-block;
}
</style>