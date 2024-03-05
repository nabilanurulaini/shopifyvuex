import { createRouter, createWebHistory } from 'vue-router'; 
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/DetailItem', 
      name: 'DetailItem',
      mode: 'history',
      base: process.env.BASE_URL,
      component:()=> import('../components/DetailItem.vue')
    },
    {

    }
  ],
});

export default router;
