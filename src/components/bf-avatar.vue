<template>
	<div class="avatar" :style="{ '--size': size, '--borderColor': borderColor }">
		<img :src="imgSrc" :alt="imgAlt" />
	</div>
</template>

<script>
export default {
	name: 'bf-avatar',
	props: {
		imgSrc: {
			type: String,
			required: true
		},
		imgAlt: {
			type: String,
			default: ''
		},
		borderColor: {
			type: String,
			default: '#0193de'
		},
		size: {
			type: String,
			default: '50px'
		}
	}
};
</script>

<style lang="stylus" scoped mo>
.avatar {
    img {
        width: var(--size);
        height: var(--size);
        border-radius: 50%;
        border: solid 2px var(--borderColor);
    }
}
</style>

<docs>
## Expamle

```jsx
<bf-avatar imgSrc="https://static-cdn.jtvnw.net/jtv_user_pictures/dbac0a38-dc12-4004-aa16-437b65797e83-profile_image-300x300.png" />
```
</docs>
