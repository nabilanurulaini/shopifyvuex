// router.js
import { createRouter, createWebHistory } from 'vue-router'; 
import DetailItem from '../components/DetailItem.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../App.vue'),
    },
    {
      path: '/DetailItem', 
      name: 'DetailItem',
      component: DetailItem
    },
    // Definisi rute lainnya jika diperlukan
  ],
});

export default router;
