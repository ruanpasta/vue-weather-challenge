<script setup>
import ImageLogo from "@/components/images/imageLogo.vue";
</script>

<template>
  <nav>
    <ul class="nav">
      <li class="nav__item">
        <figure>
          <ImageLogo width="176px" height="26px" />
        </figure>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.nav {
  background-color: $white;
  margin: 0;

  display: flex;
  flex-direction: row;
  justify-content: center;
  box-shadow: 0px 0px 2px $grey;
}

.nav__item {
  list-style-type: none;
  margin: 0 10px 0 10px;
  display: inline-block;
}
</style>