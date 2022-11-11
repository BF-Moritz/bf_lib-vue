<template>
	<bf-chat-card v-if="message" :message="message" />
</template>

<script>
import BfChatCard from '@/components/bf-chat-card.vue';

export default {
	data() {
		return {
			message: null
		};
	},

	mounted() {
		this.$store.commit('setRight', false);
		if (this.$route.query.message) {
			this.message = JSON.parse(this.$route.query.message);
		}
	},

	components: {
		BfChatCard
	}
};
</script>

<style></style>
