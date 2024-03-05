import Vue from 'vue';
import Router from 'vue-router';
import DetailItem from '../components/DetailItem.vue';

Vue.use(Router);
export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/products/:id',
            name: 'detail',
            component: DetailItem,
            props: true,
        },
    ],
});