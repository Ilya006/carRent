<template>
  <HeaderVue />
  
  <div class="profile">
    <div class="prifle--bg">
      <div class="profile__create">
        <CreateCar />
      </div>
    </div>
  </div>
</template>


<script>
import HeaderVue from './../components/app/Header.vue'
import CreateCar from './../components/CreateCar.vue'

export default {
  name: 'profile',
  components: { HeaderVue, CreateCar }
}
</script>