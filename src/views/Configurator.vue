<script setup>
import Footerello from "../components/Footerello.vue";
import Navigation from "../components/Navigation.vue";
import Three from "../components/Three.vue";

</script>

<template>
  <Navigation />
  <main class="configurator__main">
    <!-- <div class="configurator__form">
      <input type="color" name="color-glaze" value="#82d1e4" id="configurator__colorpicker" />
      <label for="color-glaze" class="configurator__color--wrapper">
        <span class="configurator__text">Kleur Glazuur</span>
      </label>
    </div> -->

    <div class="configurator__glaze">
      <Three />
    </div>
  </main>
  <Footerello />
</template>

<style></style>
