// router.js
import { createRouter, createWebHistory } from "vue-router";
import DetailItem from "../components/DetailItem.vue";
import MenuItem from "../components/MenuItem.vue";
import OrderHistory from "@/components/OrderHistory.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("../App.vue"),
      redirect: "/MenuItem",
      children: [
        {
          path: "/MenuItem",
          name: "MenuItem",
          component: MenuItem,
        },
        {
            path: "/CartItem",
            name: "CartItem",
            component: () => import("../components/CartItem.vue"),

        },
        {
          path: "/OrderHistory",
          name: "OrderHistory",
          component: OrderHistory,
        },
      ],
    },
    {
      path: "/DetailItem",
      name: "DetailItem",
      component: DetailItem,
    },

    // Definisi rute lainnya jika diperlukan
  ],
});

export default router;
