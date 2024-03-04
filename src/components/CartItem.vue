<template>
  <v-card class="cart">
    <v-card-title>Cart {{ totalQty }}</v-card-title>
    <v-divider></v-divider>
    <v-card-text v-if="!cart.length">No Product in cart!</v-card-text>
    <v-list>
      <!-- Daftar item dalam keranjang -->
      <v-list-item v-for="item in cart" :key="item.id">
        <!-- Konten item dalam keranjang -->
        <v-list-item-content>
          <v-img :src="item.thumbnail" class="white--text align-end" height="100"></v-img>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
          <v-list-item-subtitle>Rp {{ item.price }}</v-list-item-subtitle>
          <v-list-item-subtitle>
            <v-btn icon @click="reduceQty(item.id)">-</v-btn>
            <v-text>{{ item.qty }}</v-text>
            <v-btn icon @click="addQty(item.id)">+</v-btn>
          </v-list-item-subtitle>
          <v-spacer></v-spacer>
          <v-divider></v-divider>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <!-- Tombol "Place Order" -->
    <v-btn v-if="cart.length" @click="placeOrder" color="error" block>
      <span v-if="isProcessing">
        <v-progress-circular indeterminate color="white"></v-progress-circular>
      </span>
      <span v-else>Checkout (Rp {{ totalPrice.toLocaleString() }})</span>
    </v-btn>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CartItem",
  data() {
    return {
      isProcessing: false,
      orderPlaced: false,
    };
  },
  computed: {
    ...mapGetters(["cart", "orderHistory"]),

    totalPrice() {
      return this.cart.reduce((a, b) => a + b.qty * b.price, 0);
    },
    totalQty() {
      return this.cart.reduce((a, b) => a + b.qty, 0);
    },
  },
  methods: {
    ...mapActions([
      "removeItemFromCart",
      "addQty",
      "reduceQty",
      "emptyCart",
      "placeOrder",
    ]),
    async placeOrder() {
      this.isProcessing = true;
      try {
        await this.$store.dispatch("placeOrder");
        this.orderPlaced = true;
        this.$router.push("/order-history");
      } catch (err) {
        console.error(err);
      } finally {
        this.isProcessing = false;
      }
    },
  },
};
</script>

<style scoped>
.cart {
  text-align: center;
}
</style>
