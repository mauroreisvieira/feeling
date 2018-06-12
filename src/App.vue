<template>
	<div>
		<header class="header"></header>
		<main class="main">
			<chat></chat>
		</main>
	</div>
</template>

<script>
import Login from './components/Login.vue'
import Rooms from './components/Rooms.vue'
import Chat from './components/Chat.vue'
export default {
	name: 'app',
	components: { Login, Rooms, Chat }
}
</script>

<style lang="scss">
	@import "./styles/app.scss";
</style>
