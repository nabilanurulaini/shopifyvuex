<template>
  <div>
    <v-card id="order-history-section">
      <div class="order-history">
        <v-card-title>Order History</v-card-title>
        <v-divider></v-divider>
        <v-card-text v-if="orderHistory.length === 0">No Order History Yet!</v-card-text>
      </div>
      <v-card-text>
        <v-list>
          <v-list-item-group>
            <v-list-item v-for="order in orderHistory" :key="order.orderNumber" to="/order-history">
              <v-list-item-content>
                <v-list-item-title>Order Number: {{ order.orderNumber }}</v-list-item-title>
                <v-list-item-subtitle>
                  <v-list-item v-for="item in order.items" :key="item.id">
                    {{ item.title }} - Quantity: {{ item.qty }} : Rp {{ item.qty * item.price.toLocaleString()}}
                  </v-list-item>
                  <v-list-item class="font-weight-bold">Total: Rp {{ order.totalPrice.toLocaleString() }}</v-list-item>
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-divider></v-divider>
            </v-list-item>

          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
    <!--   
      <h2>Order History</h2>
      <div v-if="orderHistory.length === 0">
        <p>No order history</p>
      </div>
      <ul v-else>
        <li v-for="order in orderHistory" :key="order.orderNumber">
          <h3>Order Number: {{ order.orderNumber }}</h3>
          <ul>
            <li v-for="item in order.items" :key="item.id">

              {{ item.title }} - Quantity: {{ item.qty }}
            </li>
            <li>
                Total: Rp {{ order.totalPrice.toLocaleString() }}
            </li>
          </ul>
        </li>
      </ul> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['orderHistory']),
  },
};
</script>

<style scoped>
.order-history {
  text-align: center;
}
.item {
  padding: 0px 0px;
}
</style>
