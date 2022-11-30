<script setup>
import { reactive, onMounted, ref } from "vue";
import moment from "moment";
import Footerello from "../components/Footerello.vue";
import Navigation from "../components/Navigation.vue";

let filter = ref("date-new-to-old");

let donuts = reactive({ donuts: [] });

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
    case "votes-high-to-low":
      donuts.donuts.sort((a, b) => (b.votes > a.votes ? 1 : -1));
      break;
    case "votes-low-to-high":
      donuts.donuts.sort((a, b) => (b.votes < a.votes ? 1 : -1));
      break;
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
    Status van de <span class="text--pink">Bestellingen</span>
  </h1>

  <select name="sorting" id="sorting" v-on:change="sorting" v-model="filter">
    <option value="date-new-to-old">Datum nieuw naar oud</option>
    <option value="date-old-to-new">Datum oud naar nieuw</option>
    <option value="votes-high-to-low">Votes hoog naar laag</option>
    <option value="votes-low-to-high">Votes laag naar hoog</option>
  </select>

  <div class="gallery">
    <div class="gallery__item" v-for="donut in donuts.donuts" :key="donut.id">
      <h2 class="gallery__title">{{ donut.name }}</h2>
      <p class="gallery__date">
        Gemaakt op {{ moment(donut.date).format("DD MMMM YYYY") }}
      </p>
      <p class="gallery__votes">Votes: {{ donut.votes }}</p>
    </div>
  </div>
  <Footerello />
</template>

<style></style>
