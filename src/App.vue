<template>
  <v-app>
    <SideBar />
    <v-main>
      <v-container>
        <OrderHistory />
        <v-row>
          <v-col cols="10"><MenuItem /></v-col>
          <v-col cols="2" class="cart"><CartItem /></v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import SideBar from "./components/SideBar";
import MenuItem from "./components/MenuItem";
import CartItem from "./components/CartItem";
import OrderHistory from "./components/OrderHistory.vue";
export default {
  name: "App",
  components: {
    MenuItem,
    SideBar,
    CartItem,
    OrderHistory,
  },
};
</script>

<style>
.cart{
  background-color: #f4f5ed;
}
</style>./components/SearchItem.vue
