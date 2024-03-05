<template>
  <div>
    <v-text-field
      v-model="searchQuery"
      class="search-item"
      label="Search"
      @input="handleSearch"
    ></v-text-field>
    <v-row>
      <v-col
        v-for="(item, index) in paginatedItems"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card class="mx-auto" max-width="250" max-height="320" to="/detail">
          <v-img
            :src="item.thumbnail"
            class="white--text align-end"
            width="250"
            height="120"
          ></v-img>
          <v-card-title>{{ item.title }}</v-card-title>
          <v-card-subtitle>
            <v-icon color="yellow">mdi-star</v-icon>
            {{ item.rating }}
          </v-card-subtitle>
          <v-card-text> Rp {{ item.price }}</v-card-text>
          <v-card-actions>
            <v-btn @click="addItemToCart(item)"
              ><v-icon color="green">mdi-cart</v-icon> Add to cart
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <!-- Tambahkan komponen pagination di sini -->
    <v-pagination
      v-model="currentPage"
      :length="numberOfPages"
      @input="changePage"
    ></v-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "MenuItem",
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 8,
      searchQuery: "",
    };
  },
   // mounted buat manggil semua getproduct yg mana getproduct itu buat get data dari api
  // mounted adalah yg diload paling awal
  mounted() {
    this.getProducts();
  },
  computed: {
    ...mapGetters(["products"]),
    // ini buat itung jumlah halaman menurut jumlah item dan item per halaman disini dibuat max 8 
    numberOfPages() {
      return Math.ceil(this.products.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.products.slice(startIndex, endIndex);
    },
  },
  methods: {
    ...mapActions(["addItemToCart", "getProducts"]),
    // Fungsi untuk mengubah halaman saat pengguna mengklik pagination
    changePage(page) {
      this.currentPage = page;
    },
    handleSearch() {
      //kl ga dikasih dispatch dia panggil dirinya sendiri jadi maximum
      this.$store.dispatch("searchProducts", this.searchQuery);
    },
  },
};
</script>

<style scoped>
.bg-light-yellow {
  background-color: #f4f5ed;
}
.search-item {
  margin-bottom: 20px;
}
</style>
