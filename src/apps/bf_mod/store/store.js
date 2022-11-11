import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		showRight: false,
		hasRight: true,
	},
	mutations: {
		toggleRight(state) {
			state.showRight = !state.showRight;
		},
		setRight(state, val) {
			state.hasRight = val
		}
	},
	actions: {},
	modules: {}
});
