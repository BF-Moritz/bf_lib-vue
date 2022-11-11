<template>
	<div class="container">
		<div id="main" :class="{ 'show-right': showRight }" ref="main">
			<bf-chat id="chat-window" />
			<!-- <bf-activity /> -->
		</div>
		<sidebar :isHidden="showRight" />
	</div>
</template>

<script>
import sidebar from './components/Sidebar';
import BfChat from '@/components/bf-chat';
import BfActivity from '@/components/bf-activity';

export default {
	data() {
		return {
			hideSidebar: false
		};
	},

	mounted() {
		this.$store.commit('setRight', true);
	},

	components: {
		sidebar,
		BfChat,
		BfActivity
	},

	computed: {
		showRight() {
			return this.$store.state.showRight;
		}
	}
};
</script>

<style lang="stylus" scoped>
.container
	height 100%

#main
	display: grid
	grid-template-rows: auto 150px
	grid-template-columns: 1fr
	grid-template-areas:'chat' 'activity'
	height: 100%
	transition: 0.3s
	transition-timing-function: cubic-bezier(0.25, 0, 0.75, 1)
	width: calc(100% - 2px)

#main.show-right
	width: calc(100vw - 300px)

#chat-window
	grid-area chat
	height 100%
	overflow hidden
</style>
