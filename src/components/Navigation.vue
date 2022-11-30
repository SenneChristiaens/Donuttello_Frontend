<script setup></script>

<template>
  <nav class="nav">
    <img class="nav__image" src="/src/assets/logo.png" alt="logo" />
    <div class="nav__links">
      <router-link to="/"><a class="nav__item">Home</a></router-link>
      <router-link to="/configurator"><a class="nav__item">Configurator</a></router-link>
      <router-link to="/gallery"><a class="nav__item">Gallerij</a></router-link>
      <router-link to="/login"><a class="nav__item">Login</a></router-link>
      <router-link to="/admin"><a class="nav__item">Admin</a></router-link>
    </div>
  </nav>
</template>

<style></style>
