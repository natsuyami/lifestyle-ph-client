import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/pages/HomePage';
import FilmList from './components/pages/FilmList';
import FilmRender from './components/pages/FilmRender';
import FilmSubscribe from './components/pages/FilmSubscribe';
import { tokenPropertyVal } from './components/utils/CookieUtils.js';
import { USER_DATA } from './components/constant/DefaultValue.js';

const routes = [
  {
    path: '/',
    component: HomePage,
    meta: { isLogin: true }
  },
  {
    path: '/film/list',
    component: FilmList,
    meta: { requiresSubs: true }
  },
  {
    path: '/film/video/:id',
    component: FilmRender,
    meta: { requiresSubs: true },
    props:true
  },
  {
    path: '/subscribe',
    component: FilmSubscribe,
    props:true,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  // Check if the route requires authentication
  const accessToken = tokenPropertyVal(USER_DATA, "accessToken");
  if (to.meta.isLogin) {

    if (null === accessToken) {
      next();
    } else {
      next("/subscribe");
    }
  } else if (to.meta.requiresAuth) {
    // Check if the user is google authenticated
    if (accessToken !== null) {
      next();
    } else {
      next("/");
    }
  } else if (to.meta.requiresSubs) {
    const keyOne = tokenPropertyVal(USER_DATA, process.env.VUE_APP_PAYMENT_KEY_ONE);
    const keyTwo = tokenPropertyVal(USER_DATA, process.env.VUE_APP_PAYMENT_KEY_TWO);
    if (accessToken !== null && keyOne && keyTwo) {
      next();
    } else {
      next('/subscribe');
    }
  } else {
    // Proceed to the route
    next();
  }
});
export default router;