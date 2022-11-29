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
      path: "/:pathMatch(.*)*",
      redirect: "/",
    },
  ],
});

export default router;
