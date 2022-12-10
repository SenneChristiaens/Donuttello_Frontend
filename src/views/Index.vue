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
        <h2 class="info__h2">Speciaal Moment Op De Planning?</h2>
        <p class="info__p">
          Maak het compleet met een uniek geschenk waar iedereen van kan genieten.  Als originele attentie of dessert op een grote dag... Iedereen wordt blij van Donuttello Donuts.
        </p>
      </div>
    </div>
  </main>
  <Footerello />
</template>

<style></style>
