<script setup>
import ImageLogo from "../components/images/imageLogo.vue";

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
  position: fixed;
  top: 0;
  width: 100%;

  background-color: $white;
  padding: $sm-size;

  display: flex;
  flex-direction: row;
  justify-content: center;
  box-shadow: 0 0 0.18rem $grey;
}

.nav__item {
  list-style-type: none;
  margin: 0 $sm-size 0 $sm-size;
  display: inline-block;
}
</style>
