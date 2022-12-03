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

function roos(){
  console.log(donut);
  donut.children[0].material.color.set(0xE72870);
}

function lichtroos() {
  console.log(donut);
  donut.children[0].material.color.set(0xF174BA);
}

function bruin() {
  console.log(donut);
  donut.children[0].material.color.set(0x673F37);
}

function lichtbruin() {
  console.log(donut);
  donut.children[0].material.color.set(0xBB7E52);
}

function oranje() {
  console.log(donut);
  donut.children[0].material.color.set(0xDA9034);
}

function geel() {
  console.log(donut);
  donut.children[0].material.color.set(0xEDBF04);
}

function green() {
  console.log(donut);
  donut.children[0].material.color.set(0x7D9A59);
}

function appelblauwzeegroen() {
  console.log(donut);
  donut.children[0].material.color.set(0xBED4C8);
}

function wit() {
  console.log(donut);
  donut.children[0].material.color.set(0xffffff);
}

function zwart() {
  console.log(donut);
  donut.children[0].material.color.set(0x1E0802);
}

</script>

<template>
  <button @click="roos">roos</button>
  <button @click="lichtroos">lichtroos</button>
  <button @click="bruin">bruin</button>
  <button @click="lichtbruin">lichtbruin</button>
  <button @click="oranje">oranje</button>
  <button @click="geel">geel</button>
  <button @click="green">groen</button>
  <button @click="appelblauwzeegroen">appelblauwzeegroen</button>
  <button @click="wit">wit</button>
  <button @click="zwart">zwart</button>
</template>

<style></style>
