import Vue from 'vue';
import VueAnalytics from "vue-analytics";
import Router from 'vue-router';
import Home from '@/views/Home';
import Edit from '@/views/Edit';
import IO from '@/views/IO';

Vue.use(VueAnalytics,{
  id: 'UA-66236933-2'
});

Vue.use(Router);

export default new Router({
   // mode: "history",
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
   }, {
      path: '/io',
      name: 'io',
      component: IO,
      props: true
   }]
});