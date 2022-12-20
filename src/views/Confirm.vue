<script setup>
import Navigation from "../components/Navigation.vue";
import Footerello from "../components/Footerello.vue";
</script>

<template>
  <Navigation />
  <div class="details__page">
    <div class="configurator__formulier">
        <h1>Je bestelling is geplaatst!</h1>
        <p>Je bestelling is geplaatst en wordt zo snel mogelijk verwerkt.</p>
        <router-link to="/configurator">
            <button class="hero__btn">Terug naar configurator</button>
        </router-link>
    </div>
  </div>
  <Footerello />
</template>

<style scoped>
.details__page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #f5f5f5;
  height: 75vh;
}
.configurator__formulier {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  margin: 10rem;
  background-color: #f5f5f5;
  gap: 1rem;
  width: 50%;
}

.hero__btn {
    background-color: #f7f249;
    border-radius: 3rem;
    color: #e72870;
    border: none;
    padding: 1rem 2rem;
    font-size: 1rem;
    text-transform: uppercase;
    margin: 2rem auto;
    display: inline-block;
    font-family: "Dosis", sans-serif;
    font-weight: bold;
    cursor: pointer;
}

@media screen and (max-width: 768px) {
  .configurator__formulier {
    width: 80%;
    margin: 0;
  }
}
</style>
