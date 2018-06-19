<template>
    <header class="header">
        <div class="header__logo">
            <p>{{room}}</p>
        </div>
        <div class="header__user">
            <div class="header__user__name">
                {{profileName}}
            </div>
            <div class="header__user__photo" @click="logout">
                <img class="header__user__picture" :src="profilePhoto" :alt="profileName" :title="profileName">
            </div>
        </div>
    </header>
</template>

<script>
    import io from 'socket.io-client';
    export default {
        name: 'header',
        props: {
            room: {
              type: String,
              required: true
            },
            profilePhoto: {
              type: String,
              required: true
            },
            profileName: {
              type: String,
              required: true
            },
      },
      data() {
        return {}
    },
    methods: {
        logout() {
            this.$store.dispatch('login', false);
            localStorage.removeItem('isLogged');
        }
    },
    mounted() {

    }
}
</script>

