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
  renderer.setSize(window.innerWidth/2, window.innerHeight/2);
  document
    .querySelector(".configurator__glaze")
    .appendChild(renderer.domElement);
});


// change camera aspect ratio on resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth/2, window.innerHeight/2);
});


renderer.setClearColor(0xffffff, 0);

// orbit controls
//const controls = new OrbitControls(camera, renderer.domElement);

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
gltfLoaderDonut.load("/src/assets/Donut.gltf", (gltf) => {
  donut = gltf.scene;
  gltf.scene.scale.set(5, 5, 5);
  gltf.scene.position.set(0, 0, 0);
  scene.add(donut);
});

camera.position.z = 0.5;

function animate() {
  requestAnimationFrame(animate);

  //cube.rotation.x += 0.01;
  //cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();

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

// change dough

function lichtbruin_deeg() {
  donut.children[0].material.color.set(0x8b4513);
}

function bruin_deeg() {
  donut.children[0].material.color.set(0x5c3317);
}

function donkerbruin_deeg() {
  donut.children[0].material.color.set(0x3e2317);
}

// change sprinkles

function rood_sprinkles() {
  donut.children[2].material.color.set(0xff0000);
}

function geel_sprinkles() {
  donut.children[2].material.color.set(0xffff00);
}

function groen_sprinkles() {
  donut.children[2].material.color.set(0x00ff00);
}

function blauw_sprinkles() {
  donut.children[2].material.color.set(0x0000ff);
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
</script>

<template>
  <div class="configurator__details">
    <h2>Kleuren</h2>
    <h3>Sprinkles</h3>
    <button @click="rood_sprinkles">rood</button>
    <button @click="geel_sprinkles">geel</button>
    <button @click="groen_sprinkles">groen</button>
    <button @click="blauw_sprinkles">blauw</button>
    <button @click="paars_sprinkles">paars</button>
    <button @click="wit_sprinkles">wit</button>
    <button @click="bruin_sprinkles">bruin</button>
    <h3>Glazuur</h3>
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
    <h3>Deeg</h3>
    <button @click="lichtbruin_deeg">lichtbruin</button>
    <button @click="bruin_deeg">bruin</button>
    <button @click="donkerbruin_deeg">donkerbruin</button>
  </div>
</template>

<style></style>
