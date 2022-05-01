<template>
  <div class="rent">
    <div class="rent--dark">
      <form class="form rent__form">
        <h1>Арендовать</h1>
        <label for="rentDate">Взять на прокат до:</label>
        <input 
          id="rentDate"
          type="date"
          :min="currentDate"
        >
        <router-link to="login" v-if="!isUserLogin">
          <button>Авторизоваться!</button>
        </router-link>
        <button type="submit" v-if="isUserLogin">Аренда!</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RentCar',

  computed: {
    isUserLogin() {
      return !!this.$store.getters.getUserName
    },
    currentDate() {
      const today = new Date();
      return today.toISOString().split("T")[0];
    }
  },
}
</script>