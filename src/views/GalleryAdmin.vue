<script setup>
import { reactive, onMounted, ref } from "vue";
import moment from "moment";
import Footerello from "../components/Footerello.vue";
import Navigation from "../components/Navigation.vue";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(faTrashCan);

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

function changeStatus(id, status) {
  let apiUrl = `https://donuttello-backend-5chz.onrender.com/api/v1/donuts/${id}`;
  fetch(apiUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: status,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      window.location.reload();
    });
}

function deleteDonut(donutId) {
  let apiUrl = `https://donuttello-backend-5chz.onrender.com/api/v1/donuts/${donutId}`;
  console.log(donutId);
  fetch(apiUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      window.location.href = "/admin";
    });
}
</script>

<template>
  <Navigation />
  <h1 class="gallery__h1">
    👋 Hallo {{ nickname }}, dit is de status van de
    <span class="text--pink">Bestellingen</span>
  </h1>

  <select name="sorting" id="sorting" v-on:change="sorting" v-model="filter">
    <option value="date-new-to-old">Datum nieuw naar oud</option>
    <option value="date-old-to-new">Datum oud naar nieuw</option>
  </select>

  <div class="gallery">
    <div class="gallery__item" v-for="donut in donuts.donuts" :key="donut.id">
      <img class="gallery__image" :src="donut.url" alt="donut" />
      <div class="gallery__info">
        <FontAwesomeIcon
          class="icon"
          icon="trash-can"
          v-on:click.prevent="deleteDonut(donut._id)"
        />
        <h2 class="gallery__company">Voor {{ donut.company }}</h2>
        <h3 class="gallery__title">{{ donut.name }}</h3>
        <p class="gallery__date">
          Gemaakt op {{ moment(donut.date).format("DD MMMM YYYY") }}
        </p>
        <p class="gallery__status">Status: {{ donut.status }}</p>
        <button v-on:click="changeStatus(donut._id, 'Bestelling wordt klaargemaakt')">Bestelling wordt klaargemaakt</button>
        <button v-on:click="changeStatus(donut._id, 'Bestelling is klaar')">Bestelling is klaar</button>
      </div>
    </div>
  </div>
  <Footerello />
</template>

<style>
.icon {
  padding-top: 2.5px;
  color: #82d1e4;
}
</style>
