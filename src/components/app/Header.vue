<template>
  <header>
    <router-link class="logo" to="/">
      <div class="circle"></div>
      Car<span>rental</span>
    </router-link>
    <nav>
      <router-link class="haeder__nav" to="/">Главная</router-link> 
      <router-link class="haeder__nav" to="rent">Аренда</router-link>
      <router-link class="haeder__nav" to="/">Информация</router-link>
    </nav>
    <div>
      <router-link class="header__name" to="profile">{{userName}}</router-link>
      <router-link 
        @click="userName ? onLogout : null"
        to="login" 
        class="contact" 
      >
        {{userName ? 'Выйти' : 'Войти'}}
      </router-link>
    </div>
    <div class="hamburger">
      <div></div>
      <div></div>
    </div>
  </header>
</template>


<script>
export default {
  name: 'headerCom',

  computed: {
    userName() {
      return this.$store.getters.getUserName
    }
  },

  methods: {
    onLogout() {
      this.$store.dispatch('logout')
    }
  },

  watch: {
    userName() {
      console.log(this.userName)
    }
  }
}
</script>

