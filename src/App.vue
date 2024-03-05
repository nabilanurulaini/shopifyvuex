<template>
  <v-app>
    <SideBar />
    <v-main>
      <div class="menu-item">
       
        <v-row>
          <v-col cols="8" class="bg-light-yellow"><MenuItem /></v-col>
          <v-col cols="2" class="bg-light-yellow"><CartItem /></v-col>
          <v-col cols="2" class="bg-light-yellow"> <OrderHistory /></v-col>
        </v-row>
      </div>
    </v-main>
    
  </router-view> />
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
.bg-light-yellow{
  background-color: #f4f5ed;
}
.menu-item{
  margin: 20px;
}
</style>./components/SearchItem.vue
