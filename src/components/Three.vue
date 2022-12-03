<script setup>
import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { ref, onMounted, onUnmounted } from "vue";


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.setClearColor( 0xffffff, 0);

// orbit controls
// const controls = new OrbitControls(camera, renderer.domElement);

// ambient light
const ambientLight = new THREE.AmbientLight( 0xffffff, 0.5 );
scene.add( ambientLight );

// directional light
const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
directionalLight.position.set( 30, 20, 10);
scene.add( directionalLight );

// import donut gltf
let donut;
const gltfLoaderDonut = new GLTFLoader();
gltfLoaderDonut.load("/src/assets/DonutNickBevers.glb", (gltf) => {
  donut = gltf.scene;
  gltf.scene.scale.set(5, 5, 5);
  gltf.scene.position.set(0, 0, 0);
  scene.add(donut);
});

camera.position.z = 3;

function animate() {
  requestAnimationFrame(animate);

  //cube.rotation.x += 0.01;
  //cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();

// change glaze

function lichtroos_glazuur() {
  console.log(donut);
  donut.children[0].material.color.set(0xF174BA);
}

function roos_glazuur(){
  console.log(donut);
  donut.children[0].material.color.set(0xE72870);
}

function lichtbruin_glazuur() {
  console.log(donut);
  donut.children[0].material.color.set(0xBB7E52);
}

function bruin_glazuur() {
  console.log(donut);
  donut.children[0].material.color.set(0x673F37);
}

function oranje_glazuur() {
  console.log(donut);
  donut.children[0].material.color.set(0xDA9034);
}

function geel_glazuur() {
  console.log(donut);
  donut.children[0].material.color.set(0xEDBF04);
}

function green_glazuur() {
  console.log(donut);
  donut.children[0].material.color.set(0x7D9A59);
}

function appelblauwzeegroen_glazuur() {
  console.log(donut);
  donut.children[0].material.color.set(0xBED4C8);
}

function wit_glazuur() {
  console.log(donut);
  donut.children[0].material.color.set(0xffffff);
}

function zwart_glazuur() {
  console.log(donut);
  donut.children[0].material.color.set(0x1E0802);
}

function lichtbruin_deeg(){
  console.log(donut);
  donut.children[1].material.color.set(0xffffff);
}

function bruin_deeg(){
  console.log(donut);
  donut.children[1].material.color.set(0xd3d3d3);
}

function donkerbruin_deeg(){
  console.log(donut);
  donut.children[1].material.color.set(0xa4a4a4);
}

</script>

<template>
  <h2>Kleuren</h2>
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
</template>

<style></style>
