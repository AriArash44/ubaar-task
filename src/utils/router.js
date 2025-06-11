import { createRouter, createWebHistory } from 'vue-router';
import NewAddress from '../views/NewAddress.vue';
import ViewAddresses from '../views/ViewAddresses.vue';

const routes = [
    { path: '/new-address', component: NewAddress },
    { path: '/view-addresses', component: ViewAddresses }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;