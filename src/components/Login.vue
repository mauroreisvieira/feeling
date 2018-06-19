<template>
    <div class="login">
        <div class="login__header">
            <h1 class="login__heading">Login</h1>
        </div>
        <div class="login__body" v-if="userPhoto !== ''">
            <img :src="userPhoto" title="{userName}" alt="{userName}">
        </div>
        <div class="login__body">
            <form class="form form--login" @submit.prevent="login()">
                <div class="form__field">
                    <input type="text" v-model="userName":class="'form__input ' + [nameValid ? '' : 'is-invalid']" placeholder="Your Name">
                </div>
                <div class="form__field">
                    <input type="email" v-model="userEmail" :class="'form__input ' + [emailValid ? '' : 'is-invalid']" placeholder="Your Email">
                </div>
                <button class="btn btn--login" type="submit">Login</button>
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
            nameValid: true,
            emailValid: true,
            hash: new Md5()
        }
    },
    methods: {
        login () {
            if (this.checkEmail()) {
                this.userPhoto = this.getPhoto();
                this.isLogged = true;
                this.emailValid = true;
                this.nameValid = true;
                this.dispatchLoginState();
                this.setStorage();
            } else {
                this.emailValid = false;
                this.nameValid = this.userName !== '' ? true : false;
            }
        },
        checkEmail() {
            return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.userEmail));
        },
        getPhoto(size = 200) {
            return 'http://www.gravatar.com/avatar/' + this.hash.md5(this.userEmail, false, false) + '.jpg?s=' + size;
        },
        dispatchLoginState() {
            this.$store.dispatch('login', this.isLogged);
        },
        setStorage() {
            localStorage.setItem('userName', this.userName);
            localStorage.setItem('userEmail', this.userEmail);
            localStorage.setItem('userPhoto', this.userPhoto);
            localStorage.setItem('isLogged', this.isLogged);
        }
    },
    mounted() {}
}
</script>

