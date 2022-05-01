<template>
  <HeaderVue />
  
  <div class="profile">
    <div class="prifle--bg">
      <div class="profile__create">
        <AddingMachines v-if="isAdmin"/>
      </div>
    </div>
  </div>
</template>


<script>
import HeaderVue from './../components/app/Header.vue'
import AddingMachines from './../components/AddingMachines.vue'

export default {
  name: 'profile',
  components: { HeaderVue, AddingMachines },

  computed: {
    isAdmin() {
      return this.$store.getters.isAdmin
    }
  }
}
</script>