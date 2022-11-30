<script setup>
import Navigation from "../components/Navigation.vue";
import Footerello from "../components/Footerello.vue";
</script>

<template>
  <Navigation />
  <main class="main">
    <div class="hero">
      <h1 class="hero__h1">
        Configureer je <br />
        eigen donut
      </h1>
      <p class="hero__p">Bestel nu online je self-made donut!</p>
      <router-link to="/configurator"
        ><button class="hero__btn">Nu configureren</button></router-link
      >
    </div>
    <div class="info">
      <img
        class="info__img"
        src="/src/assets/freakshake-min.png"
        alt="freakshake"
      />
      <div class="info__text">
        <h2 class="info__h2">Bekijk onze gallerij</h2>
        <p class="info__p">
          Wat inspiratie nodig bij het ontwerpen van je eigen donut? Geen
          probleem, bekijk onze gallerij met donuts van bedrijven die al een
          bestelling hebben gemaakt.
        </p>
        <router-link to="/gallery"
          ><button class="info__btn">Gallerij</button></router-link
        >
      </div>
    </div>
  </main>
  <Footerello />
</template>

<style></style>
