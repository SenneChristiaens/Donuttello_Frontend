<script setup>
import Navigation from "../components/Navigation.vue";
import Footerello from "../components/Footerello.vue";
</script>

<template>
  <Navigation />
  <main class="main">
    <div class=".donut">
        <img src="#" alt="donutimg">
    </div>
    <div class=".details__donut">
        <h1>Info Donut</h1>
        <p>Toppings + kleur topping</p>
        <p>Kleur Glazuur</p>
        <img src="#" alt="bedrijfslogo">
    </div>
    <div class=".details__klant">
        <p>naam Donut</p>
        <p>naam klant</p>
        <p>Email</p>
        <p>aantal donuts</p>
        <p>Opmerkingen</p>
    </div>
  </main>
  <Footerello />
</template>

<style></style>
