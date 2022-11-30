<script setup>
import Navigation from '../components/Navigation.vue'
import Footerello from '../components/Footerello.vue'
</script>

<template>
    <Navigation />
    <div>
        <h1>Login</h1>
        <form>
            <div class="configurator__form">
      <input type="email" name="email" autocomplete="on" required />
      <label for="email" class="configurator__label--wrapper">
        <span class="configurator__text">Email</span>
      </label>
    </div>
        </form>
    </div>
    <Footerello />
</template>

<style>

</style>

