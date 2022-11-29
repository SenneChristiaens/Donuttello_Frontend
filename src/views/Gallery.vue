<script setup>
import { reactive, onMounted } from "vue";
import moment from "moment";
import Footer from "../components/Footer.vue";
import Navigation from "../components/Navigation.vue";

let donuts = reactive({ donuts: [] });

onMounted(() => {
  let apiUrl = "https://donuttello-backend-5chz.onrender.com/api/v1/donuts";
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      donuts.donuts = data.data.donuts;
      donuts.donuts.forEach((donut) => {
        donut.date = moment(donut.date).format("DD MMMM YYYY");
      });
    });
});
</script>

<template>
  <Navigation />
  <h1>Gallerij</h1>

  <div class="gallery">
    <div class="gallery__item" v-for="donut in donuts.donuts">
      <h2 class="gallery__title">{{ donut.name }}</h2>
      <p class="gallery__date">Gemaakt op {{ donut.date }}</p>
      <p class="gallery__votes">Votes: {{ donut.votes }}</p>
    </div>
  </div>
  <Footer />
</template>

<style></style>
