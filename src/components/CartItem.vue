<template>
  <v-card class="cart">
    <v-card-title v-if="!cart.length">Cart</v-card-title>
    <v-card-title v-else>Total items: {{ totalQty }} </v-card-title>

    <v-divider></v-divider>
    <v-card-text v-if="!cart.length">No Product in cart!</v-card-text>
    <v-list>
      <v-list-item v-for="item in cart" :key="item.id">
        <v-list-item-content>
          <v-img
            :src="item.thumbnail"
            class="white--text align-end"
            height="100"
          ></v-img>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
          <v-list-item-subtitle>Rp {{ item.price }}</v-list-item-subtitle>
          <v-list-item-subtitle class="cart-item">
            <v-btn class="btn" icon @click="reduceQty(item.id)">-</v-btn>
            <v-text class="quantity">{{ item.qty }}</v-text>
            <v-btn icon @click="addQty(item.id)">+</v-btn>
          </v-list-item-subtitle>
         
          <v-divider></v-divider>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-btn
      v-if="cart.length"
      @click="confirmCheckoutDialog = true"
      color="error"
      block
    >
      <span v-if="isProcessing">
        <v-progress-circular indeterminate color="white"></v-progress-circular>
      </span>
      <span v-else>Checkout (Rp {{ totalPrice.toLocaleString() }})</span>
    </v-btn>
    <v-dialog v-model="confirmCheckoutDialog" max-width="400">
      <v-card>
        <v-card-title class="headline"
          >Are you sure you want to checkout?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="cancelCheckout">Cancel</v-btn>
          <v-btn color="primary" text @click="placeOrder">Checkout</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CartItem",
  data() {
    return {
      confirmCheckoutDialog: false,
    };
  },
  computed: {
    //map getter ini utk get all data (kaya spread element di js biasa)
    ...mapGetters(["cart", "orderHistory"]),

    totalPrice() {
      return this.cart.reduce((a, b) => a + b.qty * b.price, 0);
    },
    totalQty() {
      return this.cart.reduce((a, b) => a + b.qty, 0);
    },
  },
  methods: {
    //kumpulan action yg diaftarkan di store/index.js seperti dipanggil disisni
    ...mapActions([
      "removeItemFromCart",
      "addQty",
      "reduceQty",
      "emptyCart",
      "placeOrder",
    ]),
    placeOrder() {
      this.confirmCheckoutDialog = false;
      //kalo this.placeorder nanti loop infinity
      this.$store.dispatch("placeOrder");
    },
    cancelCheckout() {
      this.confirmCheckoutDialog = false; // Jika pengguna cancel checkout,  dialog false
    },
  },
};
</script>

<style scoped>
.cart {
  text-align: center;
}
.cart-item {
  margin-bottom: 10px;
}
.quantity {
 margin: 0 10px 0 10px;
}
.btn{
  margin: 2px;
}
</style>
