<template>
  <HeaderVue />

  <div class="container">
    <div class="container--bg">
      <form class="form form__auth" @submit.prevent="onSubmitLogin">
        <h1>Войти</h1>
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
        <button type="submit" :disabled='loadingAuth'>Войти</button>
      </form>
      <div class="login__link">
        У вас нет аккаунта? <router-link to="register">ЗАРЕГЕСТРИРОВАТЬСЯ</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderVue from "../components/app/Header.vue"
import ErrorCodes from './../common/errorCodes'

export default {
  name: 'loginPage',
  components: { HeaderVue },

  data: () => ({
    email: '',
    password: ''
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
    onSubmitLogin() {
      this.$store.commit('clearError')
      this.$store.dispatch('login', {
        email: this.email, 
        password: this.password
      })
    }
  }
}
</script>