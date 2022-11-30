<script setup>
import Navigation from "../components/Navigation.vue";
import Footerello from "../components/Footerello.vue";
</script>

<template>
  <Navigation />
  <main class="main">
  <div class="login">
    <h1 class="login__h1">Login</h1>
    <form>
      <div class="login__form">
        <input type="email" name="email" autocomplete="on" required />
        <label for="email" class="login__label--wrapper">
          <span class="login__text">Email</span>
        </label>
      </div>
      <br>
      <div class="login__form">
        <input type="password" name="password" required />
        <label for="password" class="login__label--wrapper">
          <span class="login__text">Password</span>
        </label>
      </div>
      <form class="login__button" action="" method="post">
      <button class="hero__btn">Login</button>
    </form>
    </form>
  </div>
</main>
  <Footerello />
</template>

<style></style>
