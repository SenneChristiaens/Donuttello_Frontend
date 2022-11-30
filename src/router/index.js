import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("../views/Index.vue"),
    },
    {
      path: "/configurator",
      name: "Configurator",
      component: () => import("../views/Configurator.vue"),
    },
    {
      path: "/gallery",
      name: "Gallery",
      component: () => import("../views/Gallery.vue"),
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/admin",
      name: "Admin",
      component: () => import("../views/GalleryAdmin.vue"),
    },
    {
      path: "/changepassword",
      name: "ChangePassword",
      component: () => import("../views/ChangePassword.vue"),
    }
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name === "Admin" && !localStorage.getItem("token")) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
