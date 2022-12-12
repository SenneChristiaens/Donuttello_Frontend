<script setup>
import { reactive, onMounted, ref } from "vue";
import moment from "moment";
import Footerello from "../components/Footerello.vue";
import Navigation from "../components/Navigation.vue";

let primus = Primus.connect("https://donuttello-backend-5chz.onrender.com/", {
  reconnect: {
    max: Infinity, // Number: The max delay before we try to reconnect.
    min: 500, // Number: The minimum delay before we try reconnect.
    retries: 10, // Number: How many times we should try to reconnect.
  },
});

primus.on("data", (data) => {
    if (data.action === "create") {
    donuts.donuts = data.data;
  }
  if (data.action === "delete") {
    donuts.donuts = donuts.donuts.filter((donut) => {
      return donut._id !== data.data._id;
    });
  }
  if (data.action === "update") {
    donuts.donuts = donuts.donuts.map((donut) => {
      if (donut._id === data.data._id) {
        return data.data;
      } else {
        return donut;
      }
    });
  }
});

let filter = ref("date-new-to-old");
let nickname = ref("");
let donuts = reactive({ donuts: [] });

nickname.value = localStorage.getItem("nickname");

onMounted(() => {
  let apiUrl = "https://donuttello-backend-5chz.onrender.com/api/v1/donuts";
  fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      donuts.donuts = data.data.donuts;
      donuts.donuts.sort((a, b) =>
      new Date(b.date) > new Date(a.date) ? 1 : -1
      );
      primus.write({
        action: "create",
        data: data.data.donuts,
      })
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
      primus.write({
        action: "update",
        data: data.data.donut,
      });
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
      primus.write({
        action: "delete",
        data: data.data.donut,
      });
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
      <router-link to="/details">
        <img class="gallery__image" :src="donut.snapshot" alt="donut" />
      </router-link>
      <div class="gallery__info">
        <h2 class="gallery__company">Voor {{ donut.company }}</h2>
        <h3 class="gallery__title">{{ donut.name }}</h3>
        <p class="gallery__date">
          Gemaakt op {{ moment(donut.date).format("DD MMMM YYYY") }}
        </p>
        <p class="gallery__status">Status: {{ donut.status }}</p>
        <div class="button--status">
          <button
            class="button--hero"
            v-on:click="
              changeStatus(donut._id, 'Bestelling wordt klaargemaakt')
            "
          >
            Bestelling wordt klaargemaakt
          </button>
          <button
            class="button--hero"
            v-on:click="changeStatus(donut._id, 'Bestelling is klaar')"
          >
            Bestelling is klaar
          </button>
        </div>
        <button
          class="button--delete"
          v-on:click.prevent="deleteDonut(donut._id)"
        >
          Verwijder Donut
        </button>
      </div>
    </div>
  </div>
  <Footerello />
</template>

<style scoped></style>
