import Vue from 'vue'
import socketio from 'socket.io';
import VueSocketIO from 'vue-socket.io';
import App from './src/App.vue'

export const SocketInstance = socketio('http://localhost:8080');
Vue.use(VueSocketIO, SocketInstance)

new Vue({
	el: '#app',
	render: h => h(App)
});
