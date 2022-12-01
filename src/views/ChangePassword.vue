<script setup>
import Navigation from "../components/Navigation.vue";
import Footerello from "../components/Footerello.vue";
import { ref } from "vue";

let message = ref("");
let oldPassword = ref("");
let newPassword = ref("");
let token = localStorage.getItem("token");

function changePassword() {
  fetch(
    "https://donuttello-backend-5chz.onrender.com/api/v1/admins/changepassword",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        oldPassword: oldPassword.value,
        newPassword: newPassword.value,
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        message.value = "Je wachtwoord is gewijzigd!";
      } else {
        message.value = "Er is iets misgegaan, probeer het opnieuw.";
      }
    });
}
</script>

<template>
  <Navigation />
  <main class="login">
    <div class="login__box">
      <h1 class="login__h1">Wijzig wachtwoord</h1>
      <form @submit.prevent="changePassword">
        <div class="login__form">
          <input
            type="password"
            name="password"
            v-model="oldPassword"
            required
          />
          <label for="password" class="login__label--wrapper">
            <span class="login__text">Oud wachtwoord</span>
          </label>
        </div>
        <br />
        <div class="login__form">
          <input
            type="password"
            name="password2"
            v-model="newPassword"
            required
          />
          <label for="newPassword" class="login__label--wrapper">
            <span class="login__text">Nieuw wachtwoord</span>
          </label>
        </div>
        <p class="message message--bad" v-if="message">
          {{ message }}
        </p>
        <button type="submit" class="button--hero">
          Verander mijn wachtwoord
        </button>
      </form>
    </div>
  </main>
  <Footerello />
</template>

<style scoped>
.message {
  margin-top: 0.2rem;
  font-weight: bold;
}

.message--bad {
  color: rgb(243, 31, 31);
}
</style>
