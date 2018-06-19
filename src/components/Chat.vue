<template>
	<div class="wrapper">
		<header-layout :room="room" :profilePhoto="userPhoto" :profileName="userName"></header-layout>
		<main class="main">
			<rooms @click="joinRoom('general')" name="HTML"></rooms>
			<div class="chat">
				<div class="chat__messages">
					<div class="chat__messages__user" v-for="message in messages" :class="userEmail === message.userEmail ? 'chat__messages__user--myself' : ''">
						<div class="chat__messages__photo">
							<img class="chat__messages__picture" :src="message.userPhoto" :alt="message.userName" :title="message.userName">
						</div>
						<div class="chat__messages__content">
							<div class="chat__messages__name">
								{{ message.userName }}
							</div>
							<div class="chat__messages__time">
								1:20pm
							</div>
							<div class="chat__messages__text">
								{{ message.msg }}
							</div>
						</div>
					</div>
				</div>
				<div class="chat__actions">
					<form class="form" @submit.prevent="sendMessage()">
						<div class="form__field">
							<input v-model="messageText" class="form__message" placeholder="Type Message">
						</div>
						<button :disabled="messageText === ''" class="btn btn--send" type="submit">Send</button>
					</form>
				</div>
			</div>
		</main>
	</div>
</template>

<script>
import io from 'socket.io-client';
import Header from './../layout/Header.vue'
import Rooms from './Rooms.vue'
export default {
	name: 'chat',
	components: {
		'header-layout': Header,
		'rooms': Rooms
	},
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

