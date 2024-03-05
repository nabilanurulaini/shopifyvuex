<template>
  <v-navigation-drawer expand-on-hover rail>
    <VList>
      <div class="pt-5">
        <VListItem
          prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
          title="Nabila Nurul Aini"
          subtitle="nabilaaini18@gmail.com"
        >
        </VListItem>
      </div>
    </VList>
    <v-divider></v-divider>
    <VList density="compact" nav>
      <VListItem prepend-icon="mdi-home" title="Home" value="home" to="/"></VListItem>
      <!-- Navigasi DetailItem -->
      <VListItem to="/DetailItem">Detail</VListItem>

      <VListItem prepend-icon="mdi-cart" title="Cart" value="cart">
        {{ totalQty }}</VListItem>
      <VListItem
        prepend-icon="mdi-history"
        title="Order History"
        value="history"
        href="#order-history-section"
      ></VListItem>
    </VList>
  </v-navigation-drawer>
</template>

<script setup>
import { mapGetters } from "vuex";
</script>

<script>
export default {
  name: "SideBar",
  computed: {
    ...mapGetters(["totalQty"]),
    totalQty() {
      return this.$store.getters.totalQty;
    },
  },
};
</script>
