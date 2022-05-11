<template>
  <HeaderVue />
  <div :class="isOpenHistory && 'home--dark'" class="home--mt">
    <!-- Поиск машины -->
    <div class="search__wrap" >
      <form class="search__from" @submit.prevent="onSearch">
        <input 
          class="search__input"
          type="text" 
          @focus="isOpenHistory = true"
          @blur="blurSearch"
          v-model="searchText"
          placeholder='Поиск машины'
        >
        <button class="search__btn" type="submit"></button>
        <ul class="search__history" v-if="isOpenHistory">
          <li v-for="(item, id) in searchHistory" :key='id'>{{item[1]}}</li>
        </ul>
      </form>
    </div>

    <!-- Марки машин -->
    <div class="bar" >
      <div class="items">
        <SelectBrand 
          :name="'All'"
          :onActiveBrand="onActiveBrand"
          :active="selectBrand === 'All' ? true : false"  
        />
        <SelectBrand 
          v-for="(brand, id) in models"
          :key="id"
          :name="id"
          :onActiveBrand="onActiveBrand"
          :active="id === selectBrand ? true : false"
        />
      </div>
    </div>

    <!-- Машины -->
    <div class="gallery">
      <Car 
        v-for="car in availableСars"
        :key="car.imgCar"
        :openRentCar="openRentCar"
        :car="car"
        :fetchImagaCar='fetchImagaCar'
        :userRentCar='userRentCar'
      />
    </div>

    <!-- Окно аренды машины -->
    <div class="select-overlay" v-if="isShow">
      <span class="close" @click="isShow = false">&times;</span>
      <div class="info">
        <RentCar 
          :clearImgCarRent='clearImgCarRent' 
          :setRentCar='setRentCar'
          :isReadyRent='isReadyRent'
        />
      </div>
      <div class="pic">
        <img :src="imgUrlCarRent" alt="berline">
      </div>
    </div>
  </div>

  <div class="notification" :class="isReadyRent && 'notification--visible'">Машина успешна арнедована!</div>

  <Footer v-if="!isShow" />

</template>

<script>
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import HeaderVue from "../components/app/Header.vue";
import Footer from './../components/app/Footer.vue'
import SelectBrand from './../components/SelectBrand.vue';
import RentCar from './../components/RentCar.vue';
import Car from './../components/Car.vue'

export default {
  name: "rent",
  components: { HeaderVue, Footer, SelectBrand, RentCar, Car },


  data: () => ({
    selectBrand: 'All',
    searchText: '',
    isReadyRent: false,
    isOpenHistory: false,

    isShow: false,
    carRent: null,
    imgUrlCarRent: '',
  }),


  computed: {
    models() {
      return this.$store.getters.getModels
    },
    availableСars() {
      return this.$store.getters.getAvailableСars
    },
    userRentCar() {
      return this.$store.getters.getUserRentCar
    },
    searchHistory() {
      return this.$store.getters.getSearchHistory
    },
    authUser() {
      return !!this.$store.getters.getUserId
    }
  },


  methods: {
    // Выбрать марку машины
    onActiveBrand(name) {
      this.selectBrand = name
    },
    // Поиск машины по марке
    onSearch() {
      this.$store.dispatch('fetchSearchResults', this.searchText)
    },
    // Убрать историю поиска
    blurSearch() {
      setTimeout(() => {
        this.isOpenHistory = false
      }, 200);
    },
    // Установить значения для выбранного автомобиля
    openRentCar(imgUrl, car) {
      this.carRent = car
      this.imgUrlCarRent = imgUrl
      this.isShow = true
    },
    // Очистить картинку после заркытия окна аренды
    clearImgCarRent() {
      this.imgUrlCarRent = ''
      this.carRent = null
    },
    // После успешной аренды авто
    toggleRent() {
      this.isReadyRent = true
      setTimeout(() => {
        this.isReadyRent = false
        this.isShow = false
        this.$router.push('/rent')
      }, 3000);
    },
    // Арнедовать авто
    setRentCar(dateRent) {
      const payload = {
        carRent: this.carRent,
        dateRent,
        toggleRent: this.toggleRent, 
      }
      this.$store.dispatch('setRentCar', payload)
    },
    // Получить картинку авто
    async fetchImagaCar(imgId) {
      const storage = getStorage()
      const imgRef = ref(storage, `car/${imgId}`)
      const imageUrl = await getDownloadURL(imgRef)
      return imageUrl
    },

  },


  mounted() {
    this.$store.dispatch('fetchModels')
    this.$store.dispatch('fetchCars', 'All')
    this.authUser && this.$store.dispatch('fetchSearchHistory')
  },



  watch: {
    selectBrand() {
      this.$store.dispatch('fetchCars', this.selectBrand)
    },
    searchHistory() {
      console.log(this.searchHistory)
    },
    authUser() {
      this.authUser && this.$store.dispatch('fetchSearchHistory')
    }
  }
};
</script>