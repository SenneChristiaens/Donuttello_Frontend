<script setup>
import Navigation from "../components/Navigation.vue";
import Footerello from "../components/Footerello.vue";
import { ref } from "vue";

let message = ref(false);
let password = ref("");
let password2 = ref("");

</script>

<template>
  <Navigation />
  <main class="login">
    <div class="login__box">
      <h1 class="login__h1">Wijzig wachtwoord</h1>
      <form @submit.prevent="updatePassword">
        <div class="login__form">
          <input type="password" name="password" v-model="password" required />
          <label for="password" class="login__label--wrapper">
            <span class="login__text">Oud wachtwoord</span>
          </label>
        </div>
        <br />
        <div class="login__form">
          <input
            type="password"
            name="password2"
            v-model="password2"
            required
          />
          <label for="password2" class="login__label--wrapper">
            <span class="login__text">Nieuw wachtwoord</span>
          </label>
        </div>
        <p class="message message--bad" v-if="message">
          Wachtwoorden komen niet overeen.
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
