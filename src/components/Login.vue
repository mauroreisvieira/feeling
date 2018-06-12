<template>
    <div>
        <h1>Login</h1>
        <form>
            <input type="text" v-model="userName" placeholder="Your Name">
            <input type="text" v-model="userEmail" placeholder="Your Email">
            <button class="button" type="submit">Login</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            showChat: false,
            userName: '',
            userEmail: '',
        }
    },
    methods: {},
    mounted() {}
}
</script>

