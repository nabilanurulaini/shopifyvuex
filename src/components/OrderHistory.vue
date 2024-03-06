<template>
  <div>
    <v-card id="order-history-section">
      <div class="order-history">
        <v-card-title>Order History</v-card-title>
        <v-divider></v-divider>
        <!-- <v-card-text v-if="paginatedOrders.length === 0">No Order History Yet!</v-card-text> -->
      </div>
      <v-card-text>
        <v-list v-if="orderHistory">
          <v-list-item-group v-if="orderHistory.length > 0 ">
            <v-list-item v-for="order in paginatedOrders" :key="order.orderNumber" to="/order-history">
              <v-list-item-content>
              <v-list-item-action  >
                <v-btn icon @click="deleteOrder(order.orderNumber)" >
                  <v-icon color="red">mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            
               
                <v-list-item-title >Order Number: {{ order.orderNumber }}</v-list-item-title>
                <v-list-item-subtitle>
                  <v-list-item v-for="item in order.items" :key="item.id">
                    {{ item.title }} <br/> Quantity: {{ item.qty }} : {{ item.price * item.qty }}
                  </v-list-item>
                  <v-list-item class="font-weight-bold">Total: Rp {{ order.totalPrice }}</v-list-item>
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-divider></v-divider>
            </v-list-item>
          </v-list-item-group>
          <v-list-item v-else>
            <v-list-item-content v-if="!orderHistory.length">
              <v-list-item-title>No Order Yet! Start Ordern Now</v-list-item-title>
            </v-list-item-content>
            
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-pagination
        v-model="currentPage"
        :length="numberOfPages"
        @input="changePage"
      ></v-pagination>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['orderHistory']),
    numberOfPages() {
      return Math.ceil(this.orderHistory.length / 4); 
    },
    paginatedOrders() {
      const startIndex = (this.currentPage - 1) * 4; 
      const endIndex = startIndex + 4;
      return this.orderHistory.slice(startIndex, endIndex);
    },
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  methods: {
    ...mapActions(['deleteOrder', 'emptyOrderHistory']),
    changePage(page) {
      this.currentPage = page;
    },
    deleteOrder(orderNumber) {
      this.$store.dispatch('deleteOrder', orderNumber);
      
    },
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
