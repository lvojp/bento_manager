import Vue from 'vue';
import Router from 'vue-router';
import App from '@/App';
import IngredientManager from "@/components/IngredientManager";

Vue.use(Router);

new Router({
   routes: [{path: '/', component:App},{path: '/editor', component: IngredientManager}]
});