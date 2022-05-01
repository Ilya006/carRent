<template>
  <router-view/>
</template>

<style>
@import url('./assets');
</style>

<script>

export default {
  name: 'appCom',

  computed: {
    userId() {
      return this.$store.getters.getUserId
    },
  },

  watch: {
    userId() {
      this.userId && this.$store.dispatch('fetchInfo')
    },
  },

  mounted() {
    this.$store.dispatch('authStateChanged')
  },
}
</script>
