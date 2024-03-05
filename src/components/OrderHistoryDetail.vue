<template>
<div>
    <v-card>
        <v-card-title>{{item.title}}</v-card-title>
        <v-card-text>
            <v-text-field
                
                label="Search"
                append-icon="mdi-magnify"
               
            ></v-text-field>
        </v-card-text>
    </v-card>
</div>
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
  