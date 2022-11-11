!<template>
	<div :class="{ 'container-right': true, show: isHidden }"></div>
</template>

<script>
export default {
	name: 'sidebar',
	props: {
		isHidden: {
			type: Boolean,
			default: true
		}
	}
};
</script>

<style lang="stylus" scoped>
.container-right
	background-color #003c94
	width 300px
	height calc(100vh - 32px)
	position absolute
	top 32px
	right 0
	margin-right -298px
	transition 0.3s
	transition-timing-function cubic-bezier(0.25, 0, 0.75, 1)
	z-index -1

.show
	margin-right 0
</style>
