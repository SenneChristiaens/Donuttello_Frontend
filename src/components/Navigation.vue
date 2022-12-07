<script setup>
import { computed } from "vue";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(faUser, faRightFromBracket);

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
      <router-link to="/login" v-if="isLoggedOut"><a class="nav__item"><font-awesome-icon class="icon" icon="fa-solid fa-user" /></a></router-link>
      <router-link to="/admin" v-if="isAdmin"><a class="nav__item">Admin</a></router-link>
      <router-link to="/changepassword" v-if="isLoggedIn"><a class="nav__item"><font-awesome-icon class="icon" icon="fa-solid fa-user" /></a></router-link>
      <router-link to="/login" v-if="isLoggedIn"><a class="nav__item" @click="logout"><font-awesome-icon class="icon" icon="fa-solid fa-right-from-bracket"></font-awesome-icon></a></router-link>
    </div>
  </nav>
</template>

<style scoped>
.icon {
  padding-top: 2.5px;
  color: #f7f249;
}
</style>
