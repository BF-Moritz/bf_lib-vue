<template>
	<div
		class="chat-card"
		:style="{
			'--font-family': fontFamily,
			'--background-color': message.deleted ? bgColorDeleted : bgColor,
			'--color': color,
			'--border-radius': borderRadius
		}"
	>
		<bf-avatar :imgSrc="message.user.twitch.logo" class="avatar" />
		<div class="left">
			<bf-userinfo
				:name="message.user.twitch.displayName || user.name"
				:badges="message.message.parsedBadges"
				class="header"
				:countryCode="message.user.country ? message.user.country.code : ''"
				:team="message.user.team"
				:showPin="showPin"
				:showDelete="showDelete"
				:color="color"
				:time="parsedTime"
				:id="message.user._id"
				@pin="pinMsg"
				@delete="deleteMsg"
			/>
			<div class="content">
				{{ message.message.message }}
			</div>
		</div>
	</div>
</template>

<script>
import BfAvatar from '@/components/bf-avatar';
import BfUserinfo from '@/components/bf-userinfo';
import { convertTimestampToString } from '@/utils/timeParser';

export default {
	name: 'bf-chat-card',
	props: {
		message: {
			type: Object
		},
		showPin: {
			type: Boolean
		},
		showDelete: {
			type: Boolean
		},
		color: {
			type: String,
			default: 'white'
		},
		fontFamily: {
			type: String,
			default: 'Lato'
		},
		bgColor: {
			type: String,
			default: 'rgba(11, 16, 19, 0.8)'
		},
		bgColorDeleted: {
			type: String,
			default: 'rgba(22, 16, 19, 0.8)'
		},
		color: {
			type: String,
			default: 'white'
		},
		borderRadius: {
			type: String,
			default: '15px'
		}
	},
	components: {
		BfAvatar,
		BfUserinfo
	},
	computed: {
		parsedTime() {
			return convertTimestampToString(this.$props.message.date);
		}
	},
	methods: {
		pinMsg(msg) {
			this.$emit('pin', { message: this.message });
		},
		deleteMsg(msg) {
			this.$emit('del', { message: this.message });
		}
	}
};
</script>

<style lang="stylus" scoped>
.chat-card {
    --font-family: Lato;
    --background-color: rgba(11, 16, 19, 0.8);
    --color: white;
    --border-radius: 15px;

    font-family: var(--font-family);
    background-color: var(--background-color);
    color: var(--color);
    display: grid;
	// width: 100%;
	border-radius: var(--border-radius);
	min-height: 10px;
	grid-template-columns: 70px 1fr;
	min-width: 410px;
	-webkit-app-region: no-drag;
	overflow: hidden;

    .avatar {
        margin: 10px;
    }

    .header {
        margin: 6px 10px 5px 5px;
    }

	.content {
		margin: 0 10px 5px 5px;
	}
}
</style>

<docs>

## Examples

```jsx
<bf-chat-card
    :message="{
        channel: '#bf_moritz',
        date: '2020-12-28T20:59:23.695Z',
        deleted: false,
        index: 52,
        message: {
            badgeInfo: {subscriber: '40'},
            badges: {broadcaster: '1', subscriber: '3012'},
            clientNonce: '7e9c284c24a0d767b8ae2a5c414b8f64',
            emotes: null,
            flags: null,
            id: '96039687-33fc-47d2-b77f-45eb2be94088',
            message: 'test',
            parsedBadges: [
                {name: 'broadcaster', version: '1'},
                {name: 'subscriber', version: '3012'}
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
                logo: 'https://static-cdn.jtvnw.net/jtv_user_pictures/dbac0a38-dc12-4004-aa16-437b65797e83-profile_image-300x300.png',
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
```

</docs>
