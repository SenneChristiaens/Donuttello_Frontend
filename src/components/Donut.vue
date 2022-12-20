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
  document.querySelector(".hero__btn").addEventListener("click", () => {
    postDonut();
  });

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

  renderer.setClearColor(0xffffff, 1);

  // orbit controls
  // const controls = new OrbitControls(camera, renderer.domElement);

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
      //get the children
      const children = donut.children;

      // set the default donut
      donut.children[2].visible = false;
      donut.children[3].visible = false;
      donut.children[1].material.color.set(0xffffff);
      donut.children[4].visible = false;

      //   let dough = children[0];
      //   let glazeColor = children[1].material.color;
      //   let sprinkels = children[2];
      //   let sprinkelsColor = children[2].material.color;
      //   let marshmallows = children[3];
      //   let chocolate = children[4];

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
  const branding = document.getElementById("company__logo");
  branding.addEventListener("change", (e) => {
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
      topping = e.target.value;
    });
  });

  // function to check if sprinkels are visible and open div suiker
  const sprinkelsButton = document.querySelector(".topping__button");
  sprinkelsButton.addEventListener("click", (e) => {
    if (donut.children[2].visible === true) {
      document.querySelector(".suiker").style.visibility = "visible";
      document.querySelector(".suiker").style.height = "auto";
    }
  });

  // function to close the suiker menu if the topping is not sprinkels
  const toppingButtons = document.querySelectorAll(".topping__button");
  toppingButtons.forEach((top) => {
    top.addEventListener("click", (e) => {
      if (e.target.value !== "sprinkels") {
        document.querySelector(".suiker").style.visibility = "hidden";
        document.querySelector(".suiker").style.height = "0";
      }
    });
  });

  // function to change color of topping sprinkels
  const toppingSprinkels = document.querySelectorAll(".sprinkels__button");
  toppingSprinkels.forEach((sprinkle) => {
    sprinkle.addEventListener("click", (e) => {
      donut.children[2].material.color.set(e.target.value);
      toppingColor = e.target.value;
    });
  });

  // function to display the branding on the donut with addLogo class without eventlistener
  const addLogo = document.querySelector(".addLogo");
  addLogo.addEventListener("click", (e) => {
    companyCard.visible = true;
  });

  // function to hide the branding on the donut with removeLogo class without eventlistener
  const removeLogo = document.querySelector(".removeLogo");
  removeLogo.addEventListener("click", (e) => {
    companyCard.visible = false;
  });

  const icing = document.querySelectorAll(".glaze__button");
  icing.forEach((ice) => {
    ice.addEventListener("click", (e) => {
      donut.children[1].material.color.set(e.target.value);
      glazeColor = e.target.value;
    });
  });
  let glazeColor = null;
  let topping = null;
  let toppingColor = null;
  let donutName = document.querySelector("#donutName").value;
  let company = document.querySelector("#company").value;
  let companyLogo = document.querySelector("#company__logo").value;
  let email = document.querySelector("#email").value;
  let snapshot = null;
  let quantity = document.querySelector("#quantity").value;
  let comment = document.querySelector("#comment").value;

  function postDonut() {
    renderer.render(scene, camera);
    snapshot = renderer.domElement.toDataURL("image/jpeg", 1.0);
    let donut = {
      glazeColor: glazeColor,
      topping: topping,
      toppingColor: toppingColor,
      donutName: donutName,
      company: company,
      companyLogo: companyLogo,
      email: email,
      snapshot: snapshot,
      quantity: quantity,
      comment: comment,
    };
    fetch("https://donuttello-backend-5chz.onrender.com/api/v1/donuts/create", {
      method: "POST",
      headers: {
        "Allow-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(donut),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("donutId", data.data.donut._id);
      });
  }
});

camera.position.z = 0.5;

if (window.innerWidth < 600) {
  camera.position.z = 0.75;
} else {
  camera.position.z = 0.5;
}

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}
animate();
</script>

<template>
  <div>
    <div class="configurator__details">
      <h1 class="configurator__h1">Configurator</h1>
      <h2>Toppings</h2>
      <button class="topping__button" value="sprinkels" data-sprinkel="0">
        Sprinkels
      </button>
      <button class="topping__button" value="marshmallows" data-sprinkel="1">
        Marshmallows
      </button>
      <button class="topping__button" value="chocolade" data-sprinkel="2">
        Chocolade
      </button>

      <div class="suiker">
        <h2>Sprinkels</h2>
        <button value="#ff007f" class="sprinkels__button">rood</button>
        <button value="#ffffff" class="sprinkels__button">wit</button>
        <button value="#7d9a59" class="sprinkels__button">groen</button>
        <button value="#edbf04" class="sprinkels__button">geel</button>
        <button value="#673f37" class="sprinkels__button">bruin</button>
        <button value="#58a2e9" class="sprinkels__button">blauw</button>
        <button value="#800080" class="sprinkels__button">paars</button>
      </div>

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
      <button class="addLogo">Ja</button>
      <button class="removeLogo">Nee</button>
      <input
        type="file"
        id="company__logo"
        name="logo"
        accept="image/png, image/jpeg, image/jpg"
      />
    </div>
    <form class="configurator__info" @submit.prevent="postDonut, updateDetails()">
      <div class="configurator__formulier">
        <h1 class="details__h1">Details</h1>
        <div class="configurator__form">
          <input
            v-model="donutName"
            type="text"
            id="donutName"
            name="donutName"
            required
          />
          <label for="donutName" class="configurator__label--wrapper">
            <span class="configurator__text">Naam Donut</span>
          </label>
        </div>

        <div class="configurator__form">
          <input
            v-model="company"
            type="text"
            id="company"
            name="company"
            required
          />
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
          <label for="email" id="email" class="configurator__label--wrapper">
            <span class="configurator__text">Email</span>
          </label>
        </div>
        <div class="configurator__form">
          <input
            id="quantity"
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
          <input
            v-model="comment"
            type="text"
            id="comment"
            name="comment"
            required
          />
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

<script>
export default {
  data() {
    return {
      donutName: "",
      company: "",
      email: "",
      quantity: "",
      comment: "",
    };
  },
  methods: {
    updateDetails() {
      setTimeout(() => {
        const id = localStorage.getItem("donutId");
        console.log(id);
        const donut = {
          donutName: this.donutName,
          company: this.company,
          email: this.email,
          quantity: this.quantity,
          comment: this.comment,
        };
        fetch(
          `https://donuttello-backend-5chz.onrender.com/api/v1/donuts/${id}`,
          {
            method: "PUT",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(donut),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });
      }, 1000);
    },
  },
};
</script>
