<template>
    <div>
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
      </ul>
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
  