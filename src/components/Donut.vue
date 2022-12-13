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

  // function to change topping
    const toppings = document.querySelectorAll(".topping__button");
    toppings.forEach((top) => {
      top.addEventListener("click", (e) => {
        if (e.target.value === "sprinkels") {
          donut.children[2].visible = true;
          donut.children[3].visible = false;
          donut.children[4].visible = false;
        } else if (e.target.value === "marshmallows") {
          donut.children[2].visible = false;
          donut.children[3].visible = true;
          donut.children[4].visible = false;
        } else if (e.target.value === "chocolade") {
          donut.children[2].visible = false;
          donut.children[3].visible = false;
          donut.children[4].visible = true;
        }
      });
    });

  // function to change color of glaze
  const icing = document.querySelectorAll(".glaze__button");
  icing.forEach((ice) => {
    ice.addEventListener("click", (e) => {
      donut.children[1].material.color.set(e.target.value);
      console.log(e.target.value);
    });
  });
});

camera.position.z = 0.5;

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}
animate();
</script>

<template>
  <div class="configurato__details">
    <h1 class="configurator__h1">Configurator</h1>
    <h2>Toppings</h2>
    <button class="topping__button" value="sprinkels">Sprinkels</button>
    <button class="topping__button" value="marshmallows">Marshmallows</button>
    <button class="topping__button" value="chocolade">Chocolade</button>

    <h2>Glazuur</h2>
    <button value="#f174ba" class="glaze__button">lichtroos</button>
    <button value="#e72870" class="glaze__button">roos</button>
    <button value="#bb7e52" class="glaze__button">lichtbruin</button>
    <button value="#673f37" class="glaze__button">bruin</button>
    <button value="#da9034" class="glaze__button">oranje</button>
    <button value="#edbf04" class="glaze__button">geel</button>
    <button value="#7d9a59" class="glaze__button">groen</button>
    <button value="#bed4c8" class="glaze__button">appelblauwzeegroen</button>
    <button value="#ffffff" class="glaze__button">wit</button>
    <button value="#1e0802" class="glaze__button">zwart</button>
    
    <h2>Bedrijfslogo</h2>
    <input
      type="file"
      id="company__logo"
      name="logo"
      accept="image/png, image/jpeg, image/jpg"
    />
  </div>
</template>
