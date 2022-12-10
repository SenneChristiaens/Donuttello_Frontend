<script setup>
import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { ref, onMounted, onUnmounted } from "vue";

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
});

// change camera aspect ratio on resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
});

renderer.setClearColor(0xffffff, 0);

// orbit controls
// const controls = new OrbitControls(camera, renderer.domElement);

// ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(30, 20, 10);
scene.add(directionalLight);

// import donut gltf
let donut;
const gltfLoaderDonut = new GLTFLoader();
gltfLoaderDonut.load("/model/Donut_chocolate.gltf", (gltf) => {
  donut = gltf.scene;
  gltf.scene.scale.set(5, 5, 5);
  gltf.scene.position.set(0, 0, 0);
  scene.add(donut);
  gltf.scene.rotation.x = Math.PI * -0.2;
  // toppings
  donut.children[2].visible = false;
  donut.children[3].visible = false;
});

// add plane
const planeGeometry = new THREE.PlaneGeometry(0.1, 0.15);
const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.set(0.15, 0, 0.103);
plane.rotation.y = 0.06 * Math.PI;
plane.rotation.x = -0.15 * Math.PI;
scene.add(plane);

camera.position.z = 0.5;

function animate() {
  requestAnimationFrame(animate);

  //cube.rotation.x += 0.01;
  //cube.rotation.y += 0.01;

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

</script>

<template>
  <div class="configurator__details">
    <h1 class="configurator__h1">Configurator</h1>
    <h2>Toppings</h2>
    <button @click="sprinkles_true(); showSuiker();">Suiker</button>
    <button @click="marshmallows_true(); hideSuiker();">Marshmallows</button>
    <button @click="chocolate_true(); hideSuiker();">Chocolade</button>
    <div class="suiker">
      <h2>Suiker</h2>
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
    <input
      type="file"
      id="company__logo"
      name="logo"
      accept="image/png, image/jpeg, image/jpg"
    />
  </div>
</template>

<style></style>
