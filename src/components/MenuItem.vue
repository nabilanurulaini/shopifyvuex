<template>
  <div>
    <v-text-field
      v-model="searchQuery"
      class="search-item"
      label="Search"
      @input="handleSearch"
      append-icon="mdi-magnify"
      @click:append="handleSearch"
    ></v-text-field>
    <v-select
      v-model="selectedCategory"
      :items="categories"
      label="Category"
      @change="handleCategory"
    ></v-select>
    <v-row>
      <v-col
        v-for="(item, index) in paginatedItems"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card class="mx-auto" max-width="250" max-height="320">
          <v-img
            :src="item.thumbnail"
            class="white--text align-end"
            width="250"
            height="120"
          ></v-img>
          <!-- Gunakan v-if untuk menampilkan v-text-field saat produk dalam mode edit -->
          <v-text-field
            v-if="item.editMode"
            v-model="item.title"
            label="Product Title"
            outlined
            dense
            @keyup.enter="saveProductChanges(item)"
          ></v-text-field>
          <!-- Gunakan v-else untuk menampilkan judul produk saat ini -->
          <v-card-title v-else @click="toggleEditMode(item)">
            {{ item.title }}
          </v-card-title>
          <v-card-subtitle>
            <v-icon color="yellow">mdi-star</v-icon>
            {{ item.rating }}
          </v-card-subtitle>
          <v-card-text> Rp {{ item.price }}</v-card-text>
          <v-card-actions>
            <v-btn @click="addItemToCart(item)"
              ><v-icon color="green">mdi-cart</v-icon> Add to cart
            </v-btn>
            <!-- Tombol Edit -->
            <v-btn @click="toggleEditMode(item)"
              ><v-icon color="blue">mdi-pencil</v-icon> Edit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
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
      selectedCategory: "",
    };
  },
  // mounted buat manggil semua getproduct yg mana getproduct itu buat get data dari api
  // mounted adalah yg diload paling awal
  mounted() {
    this.getProducts();
    this.getCategories();
  },
  computed: {
    ...mapGetters(["products", "categories"]),
    // ini buat itung jumlah halaman menurut jumlah item dan item per halaman disini dibuat max 8 
    numberOfPages() {
      return Math.ceil(this.filteredItems.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
       //kl mau ga show product sesuai product tinggal diganti jadi this.products
      
      return this.filteredItems.slice(startIndex, endIndex);
    },
    filteredItems() {
      if (this.selectedCategory) {
        return this.products.filter(
          (product) => product.category === this.selectedCategory
        );
      } else {
        return this.products;
      }
    },
  },
  methods: {
    ...mapActions(["addItemToCart", "getProducts", "getCategories"]),
    changePage(page) {
      this.currentPage = page;
    },
    handleSearch() {
      this.$store.dispatch("searchProducts", this.searchQuery);
    },
    handleCategory() {
      this.currentPage = 1;
    },
    toggleEditMode(item) {
      // Mengaktifkan atau menonaktifkan mode edit untuk produk tertentu
      item.editMode = !item.editMode;
    },
    saveProductChanges(item) {
      // Simpan perubahan judul produk ke server atau penyimpanan lainnya
      // Di sini, Anda akan menyimpannya ke server menggunakan Vuex action atau menggunakan Axios langsung
      // Anda dapat menambahkan logika penyimpanan perubahan di sini
      console.log("Saved changes for product:", item);
      // Matikan mode edit setelah menyimpan perubahan
      item.editMode = false;
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
