<template>
  <v-app>
    
    <v-main class="bg-light-yellow">
      
    <SideBar/>
    <router-view/>  
      
    </v-main>
    
  </v-app>
</template>

<script>
import SideBar from "./components/SideBar.vue";
export default {
  name: "App",
  components: {
    SideBar
  },

};
</script>

<style>
.bg-light-yellow{
  background-color: #ECECEC;
}
.menu-item{
  margin: 20px;
}
</style>