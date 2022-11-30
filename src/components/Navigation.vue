<script setup>
import { computed } from "vue";

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("nickname");
  window.location.href = "/login";
}

const isLoggedIn = computed(() => {
  return localStorage.getItem("token") !== null;
});

const isLoggedOut = computed(() => {
  return localStorage.getItem("token") === null;
});

const isAdmin = computed(() => {
  return localStorage.getItem("token") !== null;
});
</script>

<template>
  <nav class="nav">
    <img class="nav__image" src="/src/assets/logo.png" alt="logo" />
    <div class="nav__links">
      <router-link to="/"><a class="nav__item">Home</a></router-link>
      <router-link to="/configurator"><a class="nav__item">Configurator</a></router-link>
      <router-link to="/gallery"><a class="nav__item">Gallerij</a></router-link>
      <router-link to="/login" v-if="isLoggedOut"><a class="nav__item">Login</a></router-link>
      <router-link to="/login" v-if="isLoggedIn"><a class="nav__item" @click="logout">Logout</a></router-link>
      <router-link to="/admin" v-if="isAdmin"><a class="nav__item">Admin</a></router-link>
    </div>
  </nav>
</template>

<style></style>
