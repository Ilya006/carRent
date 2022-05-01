<template>
  <HeaderVue />

  <div class="container">
    <div class="container--bg">
      <form class="form form__auth" @submit.prevent="onSubmitRegister">
        <h1>Регистрация</h1>
        <input
          type="text"
          placeholder="Имя"
          v-model="userName"
          required
          autocomplete="off"
          autofocus
        />
        <input 
          type="email" 
          placeholder="Почта" 
          v-model="email"
          required
          autocomplete="off" 
        />
        <input
          type="password"
          placeholder="Пароль"
          v-model="password"
          required
          autocomplete="off"
        />
        <strong class="form__error" v-if="errorMessage">{{errorMessage}}</strong>
        <button type="submit" :disabled='loadingAuth'>Зарегестрироваться</button>
      </form>
      <div class="login__link">
        У вас есть аккаунт? <router-link to="login">ВОЙТИ</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderVue from "../components/app/Header.vue"
import ErrorCodes from './../common/errorCodes'

export default {
  name: 'registerPage',
  components: { HeaderVue },

  data: () => ({
    userName: '',
    email: '',
    password: '',
    disabled: false
  }),

  computed: {
    loadingAuth() {
      return this.$store.getters.getLoadingAuth
    },
    errorMessage() {
      const errorCode = this.$store.getters.getErrorAuth
      return errorCode ? (ErrorCodes[errorCode] || 'Ошибка сервера') : ''
    }
  },

  methods: {
    onSubmitRegister() {
      this.$store.dispatch('register', {
        name: this.userName, 
        email: this.email, 
        password: this.password
      })
    },
  },
}
</script>