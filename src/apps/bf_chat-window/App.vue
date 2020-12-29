<template>
	<div id="app">
		<h1>BF_Chat-Window</h1>
		<bf-chat-card
			:message="{
				channel: '#bf_moritz',
				date: '2020-12-28T20:59:23.695Z',
				deleted: false,
				index: 52,
				message: {
					badgeInfo: { subscriber: '40' },
					badges: { broadcaster: '1', subscriber: '3012' },
					clientNonce: '7e9c284c24a0d767b8ae2a5c414b8f64',
					emotes: null,
					flags: null,
					id: '96039687-33fc-47d2-b77f-45eb2be94088',
					message: 'test',
					parsedBadges: [
						{ name: 'broadcaster', version: '1' },
						{ name: 'subscriber', version: '3012' }
					],
					reply: null,
					roomID: '118863395',
					timestampTMI: '1609189163230',
					twitchID: '118863395',
					type: 'chat'
				},
				type: 'chat',
				user: {
					twitch: {
						banned: false,
						broadcaster: true,
						color: '#5FA2D1',
						createdAt: '2016-03-16T06:08:47.879781Z',
						displayName: 'BF_Moritz',
						id: '118863395',
						logo:
							'https://static-cdn.jtvnw.net/jtv_user_pictures/dbac0a38-dc12-4004-aa16-437b65797e83-profile_image-300x300.png',
						mod: false,
						name: 'bf_moritz',
						sub: true,
						subCount: '40',
						subTier: 3,
						timeoutTime: 1609189163642,
						timeouted: false,
						vip: false
					},
					country: {
						name: 'Deutschland',
						code: 'de'
					},
					team: 'node-js',
					_id: '5fb5775361a94f2cc2169d9a'
				},
				_id: '5fea472b604e835a20bfe534'
			}"
			showPin
			showDelete
		/>
	</div>
</template>

<style lang="stylus"></style>

<script>
import { BfChatCard } from '@/components/bf-chat-card';

export default {};
</script>
