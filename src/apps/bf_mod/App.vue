<template>
	<div id="app">
		<div id="nav" v-if="showNav">
			<router-link :to="{ name: 'home' }">
				<div class="header-btns">Home</div>
			</router-link>
			<div class="seperator" />
			<router-link :to="{ name: 'dashboard' }">
				<div class="header-btns">Dashboard</div>
			</router-link>
			<div class="seperator" />
			<span
				id="open-close-btn"
				:class="{ mdi: true, 'mdi-chevron-double-left': true, 'show-right-btn': showRight }"
				v-if="hasRight"
				@click="toggleRight"
			/>
			<span class="mdi mdi-cog-outline" id="settings-btn" />
		</div>
		<div id="content" :class="{ 'full-height': !showNav, 'part-height': showNav }">
			<router-view />
		</div>
	</div>
</template>

<style lang="stylus">
*
	font-family 'Lato'

body
	margin: 0;
	padding: 0;
	width: 100vw;
	height: 100vh;
	background-color: #0193de
	overflow hidden

#app
	width: 100%;
	height: 100%;
	overflow hidden

	#nav
		height 32px
		background-color rgb(11, 16, 19)
		color rgb(220, 220, 220)

		a
			color inherit
			text-decoration none

		span
			cursor pointer

		.seperator
			width 1px
			background-color rgb(220, 220, 220)
			height 30px
			margin 1px
			float left

		.header-btns
			float left
			margin 2px
			padding 0 15px
			height 28px
			text-align center
			font-size 20px
			cursor pointer

		.header-btns:hover
			color #5bc6f4
			background-color rgba(91, 198, 244, 0.1)

		#open-close-btn
			font-size 32px
			margin-right 0
			float right
			transition margin-right 0.3s, transform 0.3s
			transition-timing-function cubic-bezier(0.25, 0, 0.75, 1)
			line-height 32px

		#open-close-btn:hover
			color #5bc6f4

		#open-close-btn.show-right-btn
			margin-right 240px
			transition margin-right 0.3s, transform 0.3s
			transition-timing-function cubic-bezier(0.25, 0, 0.75, 1)
			transform rotate(180deg)

		#settings-btn
			font-size 22px
			padding 5px
			float right
			line-height 22px

		#settings-btn:hover
			color #5bc6f4

	#content
		overflow hidden
		width 100%

	.part-height
		height calc(100% - 32px)

	.full-height
		height 100%






::-webkit-scrollbar
	width: 4px;

/* Track */
::-webkit-scrollbar-track
	background: none;

/* Handle */
::-webkit-scrollbar-thumb
	background: #888;

/* Handle on hover */
::-webkit-scrollbar-thumb:hover
	background: #555
</style>

<script>
export default {
	data() {
		return {};
	},

	methods: {
		toggleRight() {
			this.$store.commit('toggleRight');
		}
	},

	computed: {
		hasRight() {
			return this.$store.state.hasRight;
		},

		showRight() {
			return this.$store.state.showRight;
		},

		showNav() {
			return this.$route.name !== 'popup';
		}
	}
};
</script>
