<template>
    <v-card  class="search-item">
        <v-card-title>Search Item</v-card-title>
    </v-card>
    <v-row>
      <v-col
        v-for="item in products"
        :key="item.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card class="mx-auto " max-width="250" max-height="350" to="/detail">
          <v-img :src="item.thumbnail" class="white--text align-end" width="250" height="150"></v-img>
          <v-card-title>{{ item.title }}</v-card-title>
          <v-card-subtitle>
            
              <v-icon color="yellow">mdi-star</v-icon>
         
            {{ item.rating }}
          </v-card-subtitle>
          <v-card-text> Rp {{ item.price }}</v-card-text>
          <v-card-actions>
            <v-btn @click="addItemToCart(item)"><v-icon color="green">mdi-cart</v-icon> Add to cart </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    
  </template>
  
  <script>
  import { mapActions, mapGetters } from "vuex";
  
  export default {
    name: "MenuItem",
    mounted() {
      this.getProducts();
    },
    computed: {
      ...mapGetters(["products"]),
      
    },
    methods: {
      ...mapActions(["addItemToCart", "getProducts"]),
    },
  };
  </script>
  
  <style scoped>
  .bg-light-yellow {
    background-color: #f4f5ED;
  }
  .search-item {
    margin-bottom: 20px;
  }
  </style>
  