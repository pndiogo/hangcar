import Vue from 'vue';
import VueRouter from 'vue-router';
import Game from '../views/Game.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Game',
    component: Game,
  },
  {
    path: '/settings',
    name: 'Settings',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Settings.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'is-active',
  linkExactActiveClass: 'exact-is-active',
});

export default router;
