<template>
	<div>
		<h1 v-if="showChat">Hi {{userName}} to #{{ room == '' ? 'Feeling' : room}} room</h1>
		<div class="chat">
			<div class="chat__list">
				<h1>Rooms</h1>
				<div v-bind:class='room == "general" ? "chat__user--active" : "chat__user"' @click="joinRoom('general')">
					<p>#general </p>
				</div>
			</div>
			<div class="chat__messages">
				<div class="chat__messages__user" v-for="message in messages">
					<p><strong>{{ message.user }}:</strong> {{ message.msg }}</p>
				</div>
			</div>
			<form v-if="!showChat" @submit.prevent="registUser()">
				<input type="text" v-model="userName" placeholder="Your Name">
				<button class="button" type="submit">Login</button>
			</form>
			<form v-if="showChat" @submit.prevent="sendMessage()">
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
			showChat: false,
			userName: '',
			messageText: '',
			messages: [],
			room: '',
			socket : io('localhost:3001')
		}
	},
	methods: {
		registUser: function () {
			this.showChat = true;
		},
		sendMessage: function () {
			this.socket.emit('newMessage', this.messageText, this.room, this.userName);
			this.messages.push({
	            user: this.userName,
	            msg: this.messageText,
	            room: this.room
        	});
			this.messageText = '';
		},
		joinRoom:function (roomName) {
			this.messages  = [];
			if(this.room != '') {
				this.socket.emit('leaveRoom', this.room, this.userName);
			}
			this.socket.emit('joinRoom', roomName, this.userName);
			this.room = roomName;
		}
	},
	mounted() {
		this.joinRoom('general');
		this.socket.on('clientMessage' , function(data) {
			console.log(data);
			this.messages.push({
	            user: data[0].user,
	            msg: data[0].msg,
	            room: data[0].room
        	});
		}.bind(this));
	}
}
</script>

