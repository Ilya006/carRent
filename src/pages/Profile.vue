<template>
  <HeaderVue />
  
  <div class="profile">
    <div class="prifle--bg">
      <div class="profile__rent">
        <div class="prifle--bg">
          <h2 class="profile__title">Арнедованные машины:</h2>
          <h2 v-if="!isCarRent" class="profile__title profile__title--small">У вас нет арендованных машин 😵</h2>
          <div class="gallery">
            <CarProfile 
              v-for="car in isCarRent"
              :key="car.dateRent"
              :car="car"
              :fetchImagaCar="fetchImagaCar"
              :fetchInfoCar="fetchInfoCar"
            />
          </div>
        </div>
      </div>

      <div class="profile__create" v-if="isAdmin">
        <div class="prifle--bg">
          <AddingMachines v-if="isAdmin"/>
        </div>
      </div> 

      <div class="profile__rent">
        <div class="prifle--bg">
          <h1 class="profile__title">Арендованные машины:</h1>
          <div class="gallery">
            <CarRentProfile 
              v-for="(users, id) in allRent"
              :key="id"
              :car="id"
              :users="users"
              :fetchImagaCar="fetchImagaCar"
              :fetchInfoCar="fetchInfoCar"
              :onShowListRent="onShowListRent"
            />
          </div>
        </div>
      </div>

    </div>
  </div>

  <ListRent 
    v-if="isShowListRent && userList" 
    :userList="userList.users" 
    :onClearRentUser="onClearRentUser" 
  />
</template>


<script>
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import {get, getDatabase, ref as refDb } from "@firebase/database"

import HeaderVue from './../components/app/Header.vue'
import AddingMachines from './../components/AddingMachines.vue'
import CarProfile from './../components/CarProfile.vue'
import CarRentProfile from './../components/CarRentProfile.vue'
import ListRent from './../components/ListRent.vue'

export default {
  name: 'profile',
  components: { HeaderVue, AddingMachines, CarProfile, CarRentProfile, ListRent },

  data: () => ({
    isShowListRent: false, 
    userList: null,
    userRentCar: null
  }),

  computed: {
    isAdmin() {
      return this.$store.getters.isAdmin
    },
    isCarRent() {
      const arrCars = this.$store.getters.getUserRentCar
      return arrCars && Object.assign({}, arrCars)
    },
    allRent() {
      return this.$store.getters.getAllRent
    }
  },

  methods: {
    // Получить картинку авто
    async fetchImagaCar(imgId) {
      const storage = getStorage()
      const imgRef = ref(storage, `car/${imgId}`)
      const imageUrl = await getDownloadURL(imgRef)
      return imageUrl
    },
    // Получить информацию о машине
    async fetchInfoCar(idCar) {
      const db = getDatabase()
      const carRef = refDb(db, `cars/${idCar}`)
      const car = await get(carRef)
      return car.val()
    },
    onShowListRent(users, car) {
      this.isShowListRent = true
      this.userList = users
      this.userRentCar = car
    },
    onClearRentUser(userId) {
      const payload = {
        carRent: this.userRentCar,
        action: 'remove',
        dateRent: 'face',
        anotherUserId: userId
      }
      this.$store.dispatch('setAdminRentCar', payload)
    }
  },

  mounted() {
    if(this.isAdmin) {
      this.$store.dispatch('fetchAllRent')
    }
  },

  watch: {
    isAdmin() {
      if(this.isAdmin) {
        this.$store.dispatch('fetchAllRent')
      }
    },
    allRent() {
      console.log(this.allRent)
    },
  }
}
</script>