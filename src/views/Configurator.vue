<script setup>
import Footer from "../components/Footer.vue";
import Navigation from "../components/Navigation.vue";
</script>

<template>
  <Navigation />
  <main class="configurator__main">
    <h1 class="configurator__h1">Configurator</h1>
    <div class="configurator__donut">
      <h1>Configurator</h1>
    </div>
      <div class="configurator__form">
        <input type="text" name="name" required />
        <label for="name" class="configurator__label--wrapper">
          <span class="configurator__text">Name</span>
        </label>
      </div>
      <div class="configurator__form">
        <input type="email" name="email" autocomplete="on" required />
        <label for="email" class="configurator__label--wrapper">
          <span class="configurator__text">Email</span>
        </label>
      </div>
      <form class="configurator__button" action="" method="post">
        <button class="hero__btn">Verstuur je donut!</button>
    </form>
  </main>
  <Footer />
</template>

<style></style>
