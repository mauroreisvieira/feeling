<template>
    <div v-show="!isLogged">
        <h1>Login</h1>
        <form>
            <input type="text" v-model="userName" placeholder="Your Name">
            <input type="text" v-model="userEmail" placeholder="Your Email">
            <button class="button" type="submit" v-on:click="login">Login</button>
        </form>
    </div>
</template>

<script>
import Md5 from './../utils/md5.js'
export default {
    name: 'login',
    data() {
        return {
            isLogged : false,
            userName: '',
            userEmail: '',
            userPhoto: '',
            hash: new Md5()
        }
    },
    methods: {
        init() {
            this.isLogged = localStorage.getItem('isLogged');
        },
        login (event) {
            event.preventDefault();
            if (this.userName !== '' & this.userEmail !== '') {
                this.userPhoto = this.getPhoto();
                this.isLogged = true;
                this.setStorage();
            }
        },
        getPhoto(size = 200) {
            return 'http://www.gravatar.com/avatar/' + this.hash.md5(this.userEmail, false, false) + '.jpg?s=' + size;
        },
        setStorage() {
            localStorage.setItem('userName', this.userName);
            localStorage.setItem('userEmail', this.userEmail);
            localStorage.setItem('userPhoto', this.userPhoto);
            localStorage.setItem('isLogged', this.isLogged);
        }
    },
    mounted() {
        this.init();
    }
}
</script>

