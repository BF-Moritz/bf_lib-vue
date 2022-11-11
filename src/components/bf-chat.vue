<template>
	<div class="chat-container">
		<div class="chat-wrapper" ref="chatWrapper">
			<div class="chat-card-container" v-for="message in messages" :key="message._id">
				<bf-chat-card
					v-if="showDeleted || !message.deleted"
					class="chat"
					:message="message"
					showPin
					showDelete
					@pin="pin(message)"
					@del="del(message)"
				/>
			</div>
		</div>
		<div class="chat-input-container">
			<form @submit="submitChat">
				<div id="select-current-account">
					<div id="selector">{{ selectedAccount }}</div>
					<div id="selector-content">
						<div
							class="possible-twitch-accounts"
							:class="{ active: account === selectedAccount }"
							v-for="account in accounts"
							:key="account"
							@click.prevent="selectAccount(account)"
						>
							{{ account }}
						</div>
					</div>
				</div>
				<input id="input-field" type="text" placeholder="Chat..." autocomplete="off" v-model="chatTextVal" />
			</form>
		</div>
	</div>
</template>

<script>
import BfChatCard from '@/components/bf-chat-card';
import Vue from 'vue';

export default {
	name: 'bf-chat',
	data() {
		return {
			messages: [],
			ws: null,
			settings: {},
			observer: null,
			accounts: [],
			selectedAccount: '',
			chatTextVal: '',
			popup: null,
			showDeleted: true
		};
	},
	props: {},
	components: {
		BfChatCard
	},
	computed: {},
	methods: {
		send(data) {
			this.ws.send(JSON.stringify(data));
			console.log('hi', data);
		},

		addMessages(messages) {
			const height = getComputedStyle(this.$refs.chatWrapper, null).height;
			const isOnBottom =
				this.$refs.chatWrapper.scrollTop + +height.slice(0, -2) + 10 >= this.$refs.chatWrapper.scrollHeight;
			this.messages = [...this.messages, ...messages.messages].sort((a, b) => a.index - b.index);
			if (isOnBottom) {
				Vue.nextTick(() => {
					this.$refs.chatWrapper.lastElementChild.scrollIntoView(true);
				});
				this.unloadOldMessages();
			}
		},

		async handleIntersect(entries) {
			if (entries[0].isIntersecting) {
				const id = this.messages[0].index;
				if (id > 0) {
					this.send({
						method: 'GET',
						type: 'messages',
						params: {
							count: 10,
							index: id - 1
						}
					});
				}
			}
		},

		unloadOldMessages() {
			if (this.messages.length > 100) {
				this.observer.unobserve(this.$refs.chatWrapper.firstElementChild);
				this.messages = this.messages.slice(-100);
				Vue.nextTick(() => {
					this.observer.observe(this.$refs.chatWrapper.firstElementChild);
				});
			}
		},

		selectAccount(account) {
			this.selectedAccount = account;
		},

		submitChat() {
			this.send({
				method: 'POST',
				type: 'message',
				params: {
					author: this.selectedAccount,
					message: this.chatTextVal
				}
			});
			this.chatTextVal = '';
		},

		pin(message) {
			if (this.popup) this.popup.close();
			const url = `${location.origin}/#/popup?message=${encodeURIComponent(JSON.stringify(message))}`;
			this.popup = window.open(
				url,
				'pop-up',
				'width=600,height=100,status=no,scrollbars=no,resizable=off,location=off'
			);
			this.popup.focus;
		},

		del(message) {
			this.send({
				method: 'POST',
				type: 'action',
				params: {
					action: 'deletemessage',
					id: message._id,
					platform: 'twitch'
				}
			});
			if (message.message.id && message.message.id !== null) {
				message.deleted = true;
			}
		}
	},
	mounted() {
		const options = {
			root: null,
			rootMargins: '0px',
			threshold: 0.0001
		};

		this.observer = new IntersectionObserver(this.handleIntersect, options);

		const serverPort = 5000;
		this.ws = new WebSocket(`ws://${location.hostname}:${serverPort}/ws`);
		this.ws.onopen = () => {
			this.send({
				method: 'CONNECT',
				params: {
					client: 'bf-chat'
				}
			});
		};

		this.ws.onmessage = async (event) => {
			try {
				if (typeof event.data !== 'string') return;

				const data = JSON.parse(event.data);

				if (!data.method) return;

				switch (data.method) {
					case 'CONNECT':
						this.settings = data.params.settings;
						this.accounts = data.params.settings.twitchAccounts;
						this.selectedAccount = data.params.settings.twitchAccounts[0];
						this.send({
							method: 'GET',
							type: 'messages',
							params: {}
						});
						break;

					case 'POST':
						switch (data.type) {
							case 'messages':
								if (this.messages.length > 0) {
									this.observer.unobserve(this.$refs.chatWrapper.firstElementChild);
								}
								this.addMessages(data.params);
								Vue.nextTick(() => {
									this.observer.observe(this.$refs.chatWrapper.firstElementChild);
								});
								break;
						}
						break;

					default:
						console.log(data.method);

						break;
				}
			} catch (err) {
				console.error(err);
			}
		};

		this.ws.onclose = () => {
			location.reload();
		};

		Vue.nextTick(() => {
			this.$refs.chatWrapper.addEventListener('scroll', () => {
				if (this.$refs.chatWrapper) {
					const height = getComputedStyle(this.$refs.chatWrapper, null).height;
					const isOnBottom =
						this.$refs.chatWrapper.scrollTop + +height.slice(0, -2) + 10 >=
						this.$refs.chatWrapper.scrollHeight;
					if (isOnBottom) {
						this.unloadOldMessages();
					}
				}
			});
		});
	}
};
</script>

<style lang="stylus" scoped>
.chat-container
	overflow: hidden

	.chat-wrapper
		height calc(100% - 36px)
		width calc(100% - 4px)
		overflow-y scroll
		background-color: #18202b
		margin: 2px

		.chat
			margin 4px

	.chat-input-container
		height 32px
		background-color: #18202b
		margin 0 2px

		form
			margin: 0
			width: 100%
			color: white
			height 100%

			*:focus
				outline: none

			#select-current-account
				position: fixed
				font-size: 24px
				line-height: 26px
				transition: 0.3s
				transition-timing-function: cubic-bezier(0.25, 0, 0.75, 1)
				width: 150px
				height: 32px
				opacity: 1
				cursor: pointer
				display: inline-block

				#selector
					width: 140px
					margin: 0
					padding: 0 0 0 10px
					border: none
					height: 100%
					background-color: rgba(11, 16, 19, 0.8)

				#selector-content
					display: none
					position: fixed
					z-index: 1
					width: 150px

					div
						padding: 5px 10px
						display: block
						background-color: rgba(11, 16, 19, 0.8)

					div.active
						color: #0193de

			#select-current-account:hover #selector-content
				display: block;

			#select-current-account:hover #selector
				color: #5bc6f4;

			#input-field
				width: calc(100% - 175px)
				margin: 0 0 0 155px
				padding: 0 10px
				border: none
				height: 100%
				background-color: rgba(11, 16, 19, 0.8)
				color: white
				font-size: 24px



#selector-content div:hover {
	color: #5bc6f4;
	background-color: rgb(11, 16, 19);
}
</style>
