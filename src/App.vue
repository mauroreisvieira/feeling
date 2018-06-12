<template>
	<div>
		<header class="header">
		</header>
		<main class="main">
			<chat></chat>
		</main>
	</div>
</template>

<script>
import Chat from './components/Chat.vue'
export default {
	name: 'app',
	components: { Chat }
}
</script>

<style lang="scss">
	@import "./styles/app.scss";
</style>
