<template>
	<div id="app" style="-webkit-app-region: drag;">
		<!-- <h1>BF_Chat-Window</h1> -->
		<bf-chat-card
			v-for="message in messages"
			:key="message._id"
			class="chat"
			:message="message"
			showPin
			showDelete
		/>
	</div>
</template>

<style lang="stylus">
body {
	margin: 0;
	padding: 0;
	width: 100vw;
}

.chat {
	margin: 5px;
	width: calc(100% - 10px);
}

body::-webkit-scrollbar {
	display: none;
}
</style>

<script>
import BfChatCard from '@/components/bf-chat-card';
import client from '@/utils/client';
import send from '@/utils/sendWS';

export default {
	components: {
		BfChatCard
	},
	data() {
		return {
			settings: null,
			messages: []
		};
	},
	created() {
		client.onopen = () => {
			send({
				method: 'CONNECT',
				params: {
					client: 'bf_chat-window'
				}
			});
		};

		client.onmessage = async (event) => {
			try {
				if (typeof event.data != 'string') {
					return;
				}
				const data = JSON.parse(event.data);
				switch (data.method) {
					case 'CONNECT':
						switch (data.type) {
							case 'CONNECT':
								this.settings = data.params.settings;
								console.log('settings', this.settings);
								break;
						}
						break;
					case 'GET':
						switch (data.type) {
						}
						break;
					case 'POST':
						switch (data.type) {
							case 'messages':
								this.messages.unshift(data.params.messages[0]);
								break;
						}
						break;
					default:
						console.log(data.method, data);
						break;
				}
			} catch (err) {
				console.error(err);
			}
		};
	}
};
</script>
