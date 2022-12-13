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

const renderer = new THREE.WebGLRenderer();
onMounted(() => {
  renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
  document
    .querySelector(".configurator__donut")
    .appendChild(renderer.domElement);

  // change camera aspect ratio on resize
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
  });

  renderer.setClearColor(0xbed4c8, 1);

  // orbit controls
  const controls = new OrbitControls(camera, renderer.domElement);

  // ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  // directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(30, 20, 10);
  scene.add(directionalLight);

  // load gltf model
  let donut;
  const loader = new GLTFLoader();
  loader.load(
    "/model/Donut_chocolate.gltf",
    function (gltf) {
      donut = gltf.scene;
      donut.scale.set(5, 5, 5);
      donut.position.set(0, 0, 0);
      gltf.scene.rotation.x = Math.PI * -0.2;
      const material = new THREE.MeshStandardMaterial({
        color: 0x000000,
        flatShading: true,
        depthWrite: false,
        blending: THREE.MixOperation,
        transparent: true,
        alphaTest: 0.5,
      });
      //get the children
      const children = donut.children;

      // set the default donut
      donut.children[2].visible = false;
      donut.children[3].visible = false;
      donut.children[1].material.color.set(0xffffff);
      donut.children[4].visible = false;

      console.log(children);
      scene.add(donut);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

  // create the card for the company logo
  const planeGeometry = new THREE.PlaneGeometry(0.15, 0.1);
  const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xd2d2d2 });
  let companyCard = new THREE.Mesh(planeGeometry, planeMaterial);
  companyCard.name = "companyCard";
  companyCard.position.set(0.15, 0, 0.103);
  companyCard.rotation.y = 0.06 * Math.PI;
  companyCard.rotation.x = -0.15 * Math.PI;
  scene.add(companyCard);

  // add the logo to the donut companyCard
  const companyLogo = document.getElementById("company__logo");
  companyLogo.addEventListener("change", (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Load the new texture
      const texture = new THREE.TextureLoader().load(reader.result);

      // Get the plane object
      const plane = scene.getObjectByName("companyCard");

      // Update the map property of the plane's material
      plane.material.map = texture;

      // Mark the material as needsUpdate
      plane.material.needsUpdate = true;
    };
  });

  camera.position.z = 0.5;

  function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
  }
  animate();
});

</script>

<template>
  <div class="configurato__details">
    <h1 class="configurator__h1">Configurator</h1>
    <input
      type="file"
      id="company__logo"
      name="logo"
      accept="image/png, image/jpeg, image/jpg"
    />
  </div>
</template>
