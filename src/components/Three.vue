<script setup>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { ref, onMounted } from "vue";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// log width and height of canvas
console.log(window.innerWidth);
console.log(window.innerHeight);

const renderer = new THREE.WebGLRenderer();
onMounted(() => {
  // renderer.setSize(document.querySelector(".configurator__glaze").clientWidths, document.querySelector(".configurator__glaze").clientHeight);
  renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
  document
    .querySelector(".configurator__glaze")
    .appendChild(renderer.domElement);

  document.getElementById("company__logo").addEventListener("change", (e) => {
    console.log("changed");
    let companyLogo = e.target.files[0];
    console.log(companyLogo);
    const companyMaterial = new THREE.MeshStandardMaterial({
      map: new THREE.TextureLoader().load(URL.createObjectURL(companyLogo)),
      side: THREE.DoubleSide,
      color: 0xffffff,
      flatShading: true,
      depthWrite: false,
      combine: THREE.MixOperation,
      transparent: true,
      alphaTest: 0.5,
    });
    let plane = scene.getObjectByName("plane");
    plane.material = companyMaterial;
  });
});

// change camera aspect ratio on resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
});

renderer.setClearColor(0xffffff, 0);

// orbit controls
const controls = new OrbitControls(camera, renderer.domElement);

// ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(30, 20, 10);
scene.add(directionalLight);

// import donut gltf
const gltfLoaderDonut = new GLTFLoader();
gltfLoaderDonut.load("/model/Donut_chocolate.gltf", (gltf) => {
  let donut = gltf.scene;
  gltf.scene.scale.set(5, 5, 5);
  gltf.scene.position.set(0, 0, 0);
  scene.add(donut);
  gltf.scene.rotation.x = Math.PI * -0.2;
  // toppings
  donut.children[2].visible = false;
  donut.children[3].visible = false;
  donut.children[1].material.color.set(0xffffff);
  donut.children[4].visible = false;
});

const planeGeometry = new THREE.PlaneGeometry(0.15, 0.1);
const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xd2d2d2 });
let plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.name = "plane";
plane.position.set(0.15, 0, 0.103);
plane.rotation.y = 0.06 * Math.PI;
plane.rotation.x = -0.15 * Math.PI;
scene.add(plane);

camera.position.z = 0.5;

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

animate();

// change toppings

function sprinkles_true() {
  donut.children[2].visible = true;
  donut.children[3].visible = false;
  donut.children[4].visible = false;
}

function marshmallows_true() {
  donut.children[3].visible = true;
  donut.children[2].visible = false;
  donut.children[4].visible = false;
}

function chocolate_true() {
  donut.children[4].visible = true;
  donut.children[3].visible = false;
  donut.children[2].visible = false;
}

// change glaze

function lichtroos_glazuur() {
  donut.children[1].material.color.set(0xf174ba);
}

function roos_glazuur() {
  donut.children[1].material.color.set(0xe72870);
}

function lichtbruin_glazuur() {
  donut.children[1].material.color.set(0xbb7e52);
}

function bruin_glazuur() {
  donut.children[1].material.color.set(0x673f37);
}

function oranje_glazuur() {
  donut.children[1].material.color.set(0xda9034);
}

function geel_glazuur() {
  donut.children[1].material.color.set(0xedbf04);
}

function green_glazuur() {
  donut.children[1].material.color.set(0x7d9a59);
}

function appelblauwzeegroen_glazuur() {
  donut.children[1].material.color.set(0xbed4c8);
}

function wit_glazuur() {
  donut.children[1].material.color.set(0xffffff);
}

function zwart_glazuur() {
  donut.children[1].material.color.set(0x1e0802);
}

// change sprinkles color

function roos_sprinkles() {
  donut.children[2].material.color.set(0xff007f);
}

function geel_sprinkles() {
  donut.children[2].material.color.set(0xfff458);
}

function groen_sprinkles() {
  donut.children[2].material.color.set(0x96ca7e);
}

function blauw_sprinkles() {
  donut.children[2].material.color.set(0x58a2e9);
}

function paars_sprinkles() {
  donut.children[2].material.color.set(0x800080);
}

function wit_sprinkles() {
  donut.children[2].material.color.set(0xffffff);
}

function bruin_sprinkles() {
  donut.children[2].material.color.set(0x8b4513);
}

function showSuiker() {
  document.querySelector(".suiker").style.visibility = "visible";
  document.querySelector(".suiker").style.height = "auto";
}

function hideSuiker() {
  document.querySelector(".suiker").style.visibility = "hidden";
  document.querySelector(".suiker").style.height = "0";
}

// delete plane when clicking removelogo button

function removePlane() {
  scene.remove(plane);
}

// add plane when clicking addlogo button

function addPlane() {
  scene.add(plane);
}

const logo = document.getElementById("company__logo");

let donut = scene.getObjectByName("Donut_chocolate");
// let dough = donut.children[0];
// let glaze = donut.children[1];
// let topping = donut.children[2];
// let glazeColor = donut.children[1].material.color;
// let toppingColor = donut.children[2].material.color;
let donutName = ref("");
let company = ref("");
let companyLogo = ref("");
let email = ref("");
let snapshot = ref("");
let quantity = ref("");
let comment = ref("");

function postDonut() {
  let donut = {
    // get the url from company logo
    donutName: donutName.value,
    company: company.value,
    companyLogo: companyLogo.value,
    email: email.value,
    snapshot: snapshot.value,
    quantity: quantity.value,
    comment: comment.value,
    // dough: dough,
    // glaze: glaze,
    // glazeColor: glazeColor,
    // topping: topping,
    // toppingColor: toppingColor,
  };
  console.log(donut);
  fetch("https://donuttello-backend-5chz.onrender.com/api/v1/donuts/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(donut),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}
</script>

<template>
  <div class="configurator__details">
    <h1 class="configurator__h1">Configurator</h1>
    <h2>Toppings</h2>
    <button
      @click="
        sprinkles_true();
        showSuiker();
      "
    >
      Sprinkels
    </button>
    <button
      @click="
        marshmallows_true();
        hideSuiker();
      "
    >
      Marshmallows
    </button>
    <button
      @click="
        chocolate_true();
        hideSuiker();
      "
    >
      Chocolade
    </button>
    <div class="suiker">
      <h2>Sprinkels</h2>
      <button @click="roos_sprinkles">rood</button>
      <button @click="geel_sprinkles">geel</button>
      <button @click="groen_sprinkles">groen</button>
      <button @click="blauw_sprinkles">blauw</button>
      <button @click="paars_sprinkles">paars</button>
      <button @click="wit_sprinkles">wit</button>
      <button @click="bruin_sprinkles">bruin</button>
    </div>
    <h2>Glazuur</h2>
    <button @click="lichtroos_glazuur">lichtroos</button>
    <button @click="roos_glazuur">roos</button>
    <button @click="lichtbruin_glazuur">lichtbruin</button>
    <button @click="bruin_glazuur">bruin</button>
    <button @click="oranje_glazuur">oranje</button>
    <button @click="geel_glazuur">geel</button>
    <button @click="green_glazuur">groen</button>
    <button @click="appelblauwzeegroen_glazuur">appelblauwzeegroen</button>
    <button @click="wit_glazuur">wit</button>
    <button @click="zwart_glazuur">zwart</button>
    <h2>Bedrijfslogo</h2>
    <button class="addlogo" @click="addPlane">Ja</button>
    <button class="removelogo" @click="removePlane">Nee</button>
      <input
        v-on:change="uploadFile"
        type="file"
        id="company__logo"
        name="logo"
        accept="image/png, image/jpeg, image/jpg"
      />
  </div>
  <div>
    <form @submit.prevent="postDonut">
      <div class="configurator__formulier">
        <h1 class="details__h1">Details</h1>
        <div class="configurator__form">
          <input v-model="donutName" type="text" name="donutName" required />
          <label for="donutName" class="configurator__label--wrapper">
            <span class="configurator__text">Naam Donut</span>
          </label>
        </div>

        <div class="configurator__donut"></div>

        <div class="configurator__form">
          <input v-model="company" type="text" name="company" required />
          <label for="company" class="configurator__label--wrapper">
            <span class="configurator__text">Naam Bedrijf</span>
          </label>
        </div>
        <div class="configurator__form">
          <input
            v-model="email"
            type="email"
            name="email"
            autocomplete="on"
            required
          />
          <label for="email" class="configurator__label--wrapper">
            <span class="configurator__text">Email</span>
          </label>
        </div>
        <div class="configurator__form">
          <input
            v-model="quantity"
            type="number"
            name="quantity"
            autocomplete="on"
            required
          />
          <label for="quantity" class="configurator__label--wrapper">
            <span class="configurator__text">Aantal Donuts</span>
          </label>
        </div>
        <div class="configurator__form">
          <input v-model="comment" type="text" name="comment" required />
          <label for="comment" class="configurator__label--wrapper">
            <span class="configurator__text">Opmerkingen</span>
          </label>
        </div>
        <div class="configurator__button">
          <button type="submit" class="hero__btn">Verstuur je donut!</button>
        </div>
      </div>
    </form>
  </div>
</template>

<style></style>
