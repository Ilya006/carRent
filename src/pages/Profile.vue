<template>
  <HeaderVue />
  
  <div class="profile">
    <div class="prifle--bg">
      <div class="profile__rent">
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

      <div class="profile__create" v-if="isAdmin">
        <AddingMachines v-if="isAdmin"/>
      </div> 
    </div>
  </div>
</template>


<script>
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import {get, getDatabase, ref as refDb } from "@firebase/database"

import HeaderVue from './../components/app/Header.vue'
import AddingMachines from './../components/AddingMachines.vue'
import CarProfile from './../components/CarProfile.vue'

export default {
  name: 'profile',
  components: { HeaderVue, AddingMachines, CarProfile },

  computed: {
    isAdmin() {
      return this.$store.getters.isAdmin
    },
    isCarRent() {
      const arrCars = this.$store.getters.getUserRentCar
      return arrCars && Object.assign({}, arrCars)
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
    }
  },

  watch: {
    isCarRent() {
      console.log(Object.assign({}, this.isCarRent))
    }
  }
}
</script>