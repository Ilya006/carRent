<template>
  <HeaderVue />

  <div class="container">
    <div class="container--bg">
      <div class="form" @submit.prevent="onSubmitRegister">
        <h1>Регистрация</h1>
        <input
          type="text"
          placeholder="Имя"
          v-model="userName"
          autocomplete="off"
          autofocus
        />
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
        <button type="submit">Зарегестрироваться</button>
      </div>
      <div class="login__link">
        У вас есть аккаунт? <router-link to="login">ВОЙТИ</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderVue from "../components/app/Header.vue"

export default {
  name: 'registerPage',
  components: { HeaderVue },

  data: () => ({
    userNama: '',
    email: '',
    password: ''
  })
}
</script>