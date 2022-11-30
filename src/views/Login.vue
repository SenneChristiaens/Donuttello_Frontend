<script setup>
import Navigation from "../components/Navigation.vue";
import Footerello from "../components/Footerello.vue";
import { ref } from "vue";

let email = ref("");
let password = ref("");

function login() {
  fetch("https://donuttello-backend-5chz.onrender.com/api/v1/admins/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "email": email.value,
      "password": password.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("nickname", data.nickname);
        window.location.href = "/admin";
      } else {
        alert("Invalid Credentials");
      }
    });
}
</script>

<template>
  <Navigation />
  <main class="login">
    <div class="login__box">
      <h1 class="login__h1">Login</h1>
      <form @submit.prevent="login">
        <div class="login__form">
          <input type="email" name="email" autocomplete="on" v-model="email" required />
          <label for="email" class="login__label--wrapper">
            <span class="login__text">Email</span>
          </label>
        </div>
        <br />
        <div class="login__form">
          <input type="password" name="password" v-model="password" required />
          <label for="password" class="login__label--wrapper">
            <span class="login__text">Password</span>
          </label>
        </div>
        <button type="submit" class="button--hero">Login</button>
      </form>
    </div>
  </main>
  <Footerello />
</template>

<style scoped>
/* .login__box {
  margin: 3rem;
  padding: 3rem;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
  background-color: var(--white);
  box-sizing: border-box;
}

.login__h1 {
  font-size: 2rem;
  text-align: center;
}

.login__form {
  position: relative;
  height: 3.25rem;
  width: 100%;
  color: var(--black);
  overflow: hidden;
}

.login__form input {
  position: absolute;
  height: 100%;
  width: 100%;
  color: var(--black);
  font-size: 1.2rem;
  line-height: 3.25rem;
  outline: 0;
  background-color: inherit;
  padding-top: 1.2rem;
  border: none;
  box-sizing: border-box;
}

.login__form .login__label--wrapper {
  position: absolute;
  height: 100%;
  width: 100%;
  bottom: 0;
  background-color: inherit;
  left: 0;
  pointer-events: none;
  border-bottom: 1px solid var(--pink);
}

.login__form .login__label--wrapper::after {
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  bottom: -1px;
  left: 0;
  background-color: inherit;
  border-bottom: 3px solid var(--pink);
  transform: translateX(-100%);
  transition: transform 0.2s ease;
}

.login__form .login__text {
  position: absolute;
  bottom: 5px;
  left: 0;
  transition: all 0.2s ease;
}

.login__form input:focus + .login__label--wrapper .login__text,
.login__form input:valid + .login__label--wrapper .login__text {
  font-size: 0.9rem;
  transform: translateY(-150%);
  color: var(--pink);
}

.login__form input:focus + .login__label--wrapper::after,
.login__form input:valid + .login__label--wrapper::after {
  transform: translateX(0);
}

.button--hero {
  background-color: var(--yellow);
  border-radius: 3rem;
  color: var(--pink);
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  text-transform: uppercase;
  margin: 3rem 0 0 0;
  display: inline-block;
  font-family: "Dosis", sans-serif;
  font-weight: bold;
}

@media screen and (min-width: 905px) {
  .login__box {
    margin: 10rem;
    min-width: 35rem;
  }
}

@media screen and (min-width: 1440px) {
  .login {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .login__box {
    display: inline-block;
    min-width: 40rem;
  }
}

@media screen and (min-width: 1440px) {
  .login__box {
    min-width: none;
    margin-left: 35rem;
    margin-right: 35rem;
  }
} */
</style>
