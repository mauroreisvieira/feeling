<template>
	<div>
		<h1>{{ room == '' ? 'Feeling' : room}}</h1>
		<div class="chat">
			<div class="chat__list">
				<h1>Rooms</h1>
				<div v-bind:class='room == "General" ? "chat__user--active" : "chat__user"' @click="joinRoom('General')">
					<p>General </p>
				</div>
			</div>
			<div class="chat__messages">
				<div class="chat__messages__user" v-for="message in messages">
					<p>{{ message }}</p>
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
			messageText: '',
			messages: [],
			room: '',
			socket : io('localhost:3001')
		}
	},
	methods: {
		sendMessage: function () {
			console.log(this.messageText);
			this.socket.emit('newMessage' , this.messageText , this.room);
			this.messages.push(this.messageText);
			this.messageText = '';
		},
		joinRoom:function (roomName) {
			this.messages  = [];
			if(this.room != '') {
				this.socket.emit('leaveRoom' , this.room);
			}
			this.socket.emit('joinRoom' , roomName);
			this.room = roomName;
		}
	},
	mounted() {
		this.joinRoom('General');
		this.socket.on('clientMessage' , function(data) {
			this.messages.push(data);
		}.bind(this));
	}
}
</script>

