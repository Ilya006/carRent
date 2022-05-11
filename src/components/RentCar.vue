<template>
  <div class="rent">
    <div class="rent--dark">
      <form class="form rent__form" @submit.prevent="onRentCar">
        <h1>Арендовать</h1>
        <label for="rentDate">Взять на прокат до:</label>
        <input 
          id="rentDate"
          type="date"
          :min="currentDate"
          v-model="dateRent"
        >
        <router-link to="login" v-if="!isUserLogin">
          <button>Авторизоваться!</button>
        </router-link>
        <button 
          v-if="isUserLogin" 
          :disabled='isReadyRent || !dateRent'
          type="submit" 
          :class="isReadyRent && 'btn--ready'"
        >
          {{isReadyRent ? 'Готова' : 'Арендовать!'}}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RentCar',
  props: ['clearImgCarRent', 'setRentCar', 'isReadyRent'],


  data: () => ({
    dateRent: ''
  }),


  computed: {
    isUserLogin() {
      return !!this.$store.getters.getUserName
    },
    currentDate() {
      const today = new Date();
      return today.toISOString().split("T")[0];
    }
  },


  methods: {
    onRentCar() {
      this.setRentCar(this.dateRent)
    },
  },


  unmounted() {
    this.clearImgCarRent()
  }
}
</script>