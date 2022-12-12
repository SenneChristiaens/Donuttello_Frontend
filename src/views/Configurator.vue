<script setup>
import Footerello from "../components/Footerello.vue";
import Navigation from "../components/Navigation.vue";
import Three from "../components/Three.vue";

function postDonut() {
  fetch("https://donuttello-backend-5chz.onrender.com/api/v1/donuts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      color: color.value,
      glaze: glaze.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        message.value = "Je donut is toegevoegd!";
      } else {
        message.value = "Er is iets misgegaan, probeer het opnieuw.";
      }
    });
}
</script>

<template>
  <Navigation />
  <main class="configurator__main">
    <!-- <div class="configurator__form">
      <input type="color" name="color-glaze" value="#82d1e4" id="configurator__colorpicker" />
      <label for="color-glaze" class="configurator__color--wrapper">
        <span class="configurator__text">Kleur Glazuur</span>
      </label>
    </div> -->

    <div class="configurator__glaze">
      <Three />
    </div>

    <hr />
    <form @submit.prevent="postDonut">
      <h1 class="details__h1">Details</h1>
      <div class="configurator__form">
        <input type="text" name="name-donut" required />
        <label for="name-donut" class="configurator__label--wrapper">
          <span class="configurator__text">Naam Donut</span>
        </label>
      </div>

      <div class="configurator__donut"></div>

      <div class="configurator__form">
        <input type="text" name="name" required />
        <label for="name" class="configurator__label--wrapper">
          <span class="configurator__text">Naam Bedrijf</span>
        </label>
      </div>
      <div class="configurator__form">
        <input type="email" name="email" autocomplete="on" required />
        <label for="email" class="configurator__label--wrapper">
          <span class="configurator__text">Email</span>
        </label>
      </div>
      <div class="configurator__form">
        <input type="number" name="number" autocomplete="on" required />
        <label for="email" class="configurator__label--wrapper">
          <span class="configurator__text">Aantal Donuts</span>
        </label>
      </div>
      <div class="configurator__form">
        <input type="text" name="comment" required />
        <label for="comment" class="configurator__label--wrapper">
          <span class="configurator__text">Opmerkingen</span>
        </label>
      </div>
      <div class="configurator__button">
        <button type="submit" class="hero__btn">Verstuur je donut!</button>
      </div>
    </form>
  </main>
  <Footerello />
</template>

<style></style>
