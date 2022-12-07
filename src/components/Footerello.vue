<script setup>
import { computed } from "vue";

const isAdmin = computed(() => {
  return localStorage.getItem("token") !== null;
});

const isLoggedOut = computed(() => {
  return localStorage.getItem("token") === null;
});
</script>

<template>
  <footer class="footer">
    <img class="footer__img" src="/src/assets/logo.png" alt="logo" />
    <router-link to="/"><a class="nav__item">Home</a></router-link>
    <router-link to="/configurator"><a class="nav__item">Configurator</a></router-link>
    <router-link to="/admin" v-if="isAdmin"><a class="nav__item">Gallerij</a></router-link>
    <router-link to="/login" v-if="isLoggedOut"><a class="nav__item">Login</a></router-link>
    <p class="footer__p">© 2022 reserved by Best Donuts gcv</p>
  </footer>
</template>

<style></style>
