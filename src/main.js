import Vue from 'vue';
import App from './apps/bf_chat-window/App';

Vue.config.productionTip = false;

new Vue({
	render: (h) => h(App)
}).$mount('#app');
