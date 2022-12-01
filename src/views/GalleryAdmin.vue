<script setup>
import { reactive, onMounted, ref } from "vue";
import moment from "moment";
import Footerello from "../components/Footerello.vue";
import Navigation from "../components/Navigation.vue";

let filter = ref("date-new-to-old");
let nickname = ref("");
let donuts = reactive({ donuts: [] });

nickname.value = localStorage.getItem("nickname");

onMounted(() => {
  let apiUrl = "https://donuttello-backend-5chz.onrender.com/api/v1/donuts";
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      donuts.donuts = data.data.donuts;
      donuts.donuts.sort((a, b) =>
        new Date(b.date) > new Date(a.date) ? 1 : -1
      );
    });
});

// ascending = oud -> nieuw

function sorting() {
  switch (filter.value) {
    case "date-new-to-old":
      donuts.donuts.sort((a, b) =>
        new Date(b.date) > new Date(a.date) ? 1 : -1
      );
      break;
    case "date-old-to-new":
      donuts.donuts.sort((a, b) =>
        new Date(b.date) < new Date(a.date) ? 1 : -1
      );
      break;
  }
}
</script>

<template>
  <Navigation />
  <h1 class="gallery__h1">
    👋 Hallo {{ nickname }}, dit is de status van de <span class="text--pink">Bestellingen</span>
  </h1>

  <select name="sorting" id="sorting" v-on:change="sorting" v-model="filter">
    <option value="date-new-to-old">Datum nieuw naar oud</option>
    <option value="date-old-to-new">Datum oud naar nieuw</option>
  </select>

  <div class="gallery">
    <div class="gallery__item" v-for="donut in donuts.donuts" :key="donut.id">
      <img class="gallery__image" :src="donut.url" alt="donut" />
      <div class="gallery__info">
        <h2 class="gallery__company">Voor {{ donut.company }}</h2>
        <h3 class="gallery__title">{{ donut.name }}</h3>
        <p class="gallery__date">
          Gemaakt op {{ moment(donut.date).format("DD MMMM YYYY") }}
        </p>
      </div>
    </div>
  </div>
  <Footerello />
</template>

<style></style>
