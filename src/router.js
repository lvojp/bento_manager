import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';
import Edit from '@/views/Edit';

Vue.use(Router);

export default new Router({
   mode: "history",
   routes: [{
      path: '/',
      name: 'home',
      component: Home,
      props: true
   }, {
      path: '/edit',
      name: 'edit',
      component: Edit,
      props: true
   }]
});