<template>
  <HeaderVue />

  <div class="container">
    <div class="container--bg">
      <div class="form" @submit.prevent="onSubmitLogin">
        <h1>Войти</h1>
        <input 
          type="email" 
          placeholder="Почта" 
          v-model="email"
          autocomplete="off" 
        />
        <input
          type="text"
          placeholder="Пароль"
          v-model="password"
          autocomplete="off"
        />
        <button type="submit">Войти</button>
      </div>
      <div class="login__link">
        У вас нет аккаунта? <router-link to="register">ЗАРЕГЕСТРИРОВАТЬСЯ</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderVue from "../components/app/Header.vue"

export default {
  name: 'loginPage',
  components: { HeaderVue },

  data: () => ({
    email: '',
    password: ''
  })
}
</script>