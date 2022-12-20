<script setup>
import Navigation from "../components/Navigation.vue";
import Footerello from "../components/Footerello.vue";
import { reactive, onMounted } from "vue";

let donuts = reactive({ donuts: [] });
let id = window.location.pathname.split("/")[2];

onMounted(() => {
  let apiUrl = `https://donuttello-backend-5chz.onrender.com/api/v1/donuts/${id}`;
  fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((response) => response.json())
    .then((json) => {
      donuts.donuts = json.data;
    });
});
</script>

<template>
  <Navigation />
  <div class="details__page">
    <div
      class="configurator__formulier"
      v-for="donut in donuts.donuts"
      :key="donut.id"
    >
      <h1>Bestelling Details</h1>
      <h2>Donut</h2>
      <p>Topping: {{ donut.topping }}</p>
      <p>Kleur topping: {{ donut.toppingColor }}</p>
      <p>Glazuur: {{ donut.glazeColor }}</p>
      <br />
      <h2>Bedrijf</h2>
      <p>Bedrijfslogo: {{ donut.companyLogo }}</p>
      <p>Naam Donut: {{ donut.donutName }}</p>
      <p>Naam Bedrijf: {{ donut.company }}</p>
      <p>Email Bedrijf: {{ donut.email }}</p>
      <p>Aantal Donuts: {{ donut.quantity }}</p>
      <p>Opmerkingen: {{ donut.comment }}</p>
      <br />
      <h2>Preview</h2>
      <img :src="donut.snapshot" alt="donut"/>
    </div>
  </div>
  <Footerello />
</template>

<style scoped>

.details__page{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #f5f5f5;
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

@media screen and (max-width: 768px) {
  .configurator__formulier {
    width: 80%;
    margin: 0;
  }
}
</style>
