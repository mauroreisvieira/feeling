<template>
	<div>
		<h1>Hi {{userName}} to #{{ room == '' ? 'Feeling' : room}} room</h1>
		<div class="chat">
			<div class="chat__list">
				<h1>Rooms</h1>
				<div v-bind:class='room == "general" ? "chat__user--active" : "chat__user"' @click="joinRoom('general')">
					<p>#general </p>
				</div>
			</div>
			<div class="chat__messages">
				<div class="chat__messages__user" v-for="message in messages" :class="userEmail === message.userEmail ? '' : 'is-guess'">
					<img :src="message.userPhoto" :alt="message.userName" :title="message.userName">
					<a :href="message.userEmail" :title="message.userEmail">{{ message.userEmail }}</a>
					<p><strong>{{ message.userName }}:</strong> {{ message.msg }}</p>
				</div>
			</div>
			<form @submit.prevent="sendMessage()">
				<input type="text" v-model="messageText" placeholder="Type Message">
				<button class="button" type="submit">Send</button>
			</form>
		</div>
	</div>
</template>

<script>
import io from 'socket.io-client';
export default {
	name: 'chat',
	props: {},
	data() {
		return {
			userName: '',
			userEmail: '',
			userPhoto: '',
			messageText: '',
			messages: [],
			room: '',
			socket : io('localhost:3001')
		}
	},
	methods: {
		init () {
            this.userName = localStorage.getItem('userName');
            this.userEmail = localStorage.getItem('userEmail');
            this.userPhoto = localStorage.getItem('userPhoto');
			this.joinRoom('general');
			console.log('Init');
			this.socket.on('clientMessage' , function(data) {
				console.log(data);
				this.messages.push({
					userName: data[0].userName,
					userEmail: data[0].userEmail,
					userPhoto: data[0].userPhoto,
					msg: data[0].msg,
					room: data[0].room
				});
			}.bind(this));
		},
		sendMessage () {
			this.socket.emit('newMessage', this.messageText, this.room, this.userName, this.userEmail, this.userPhoto);
			this.messages.push({
	            userName: this.userName,
	            userEmail: this.userEmail,
	            userPhoto: this.userPhoto,
	            msg: this.messageText,
	            room: this.room
        	});
			this.messageText = '';
		},
		joinRoom (roomName) {
			this.messages  = [];
			if(this.room != '') {
				this.socket.emit('leaveRoom', this.room, this.userName, this.userEmail, this.userPhoto);
			}
			this.socket.emit('joinRoom', roomName, this.userName, this.userEmail, this.userPhoto);
			this.room = roomName;
		}
	},
	mounted() {
		this.init();
	}
}
</script>

