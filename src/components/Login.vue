<template>
    <div v-show="!isLogged" class="login">
        <div class="login__header">
            <h1 class="login__heading">Login</h1>
        </div>
        <div class="login__body" v-if="userPhoto !== ''">
            <img :src="userPhoto" title="{userName}" alt="{userName}">
        </div>
        <div class="login__body">
            <form class="form" @submit.prevent="login()">
                <input type="text" v-model="userName" class="form__input" placeholder="Your Name">
                <input type="text" v-model="userEmail" class="form__input" placeholder="Your Email">
                <button class="button btn--login" type="submit">Login</button>
            </form>
        </div>
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
            this.isLogged = localStorage.getItem('isLogged') ? localStorage.getItem('isLogged') : false;
            this.$emit('isLogged', this.isLogged);
        },
        login () {
            console.log('Loin');
            event.preventDefault();
            if (this.checkEmail()) {
                this.userPhoto = this.getPhoto();
                // this.isLogged = true;
                this.setStorage();
                this.$emit('isLogged', this.isLogged);
            }
        },
        checkEmail() {
            return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.userEmail));
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

