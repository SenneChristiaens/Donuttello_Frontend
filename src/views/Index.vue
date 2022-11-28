<script setup>
import Navigation from "./Navigation.vue";
import Footer from "./Footer.vue";
</script>

<template>
  <Navigation />
  <main class="main">
    <div class="hero">
      <h1 class="hero__h1">Configureer je eigen donut</h1>
      <p class="hero__p">Bestel nu online je self-made donut!</p>
      <button class="hero__btn">Nu configureren</button>
    </div>
    <div class="info">
      <img
        class="info__img"
        src="/src/assets/freakshake-min.png"
        alt="freakshake"
      />
      <h2 class="info__h2">Bekijk onze gallerij</h2>
      <p class="info__p">
        Wat inspiratie nodig bij het ontwerpen van je eigen donut? Geen
        probleem, bekijk onze gallerij met donuts van bedrijven die al een
        bestelling hebben gemaakt.
      </p>
      <button class="info__btn">Gallerij</button>
    </div>
  </main>
  <Footer />
</template>

<style></style>