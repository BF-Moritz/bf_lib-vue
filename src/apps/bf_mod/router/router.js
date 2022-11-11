import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/home/Home.vue';
import Dashboard from '../views/dashboard/Dashboard.vue';
import Popup from '../views/popup/Popup.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home
	},
	{
		path: '/dashboard',
		name: 'dashboard',
		component: Dashboard
	},
	{
		path: '/popup',
		name: 'popup',
		component: Popup
	}
	// {
	// 	path: '*',
	// 	component: () => import('pages/Error404.vue')
	// }
];

const router = new VueRouter({
	routes
});

export default router;
