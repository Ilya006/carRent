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
        <button class="search__btn"></button>
        <ul class="search__history" v-if="isOpenHistory">
          <li>Дарк</li>
          <li>мерст</li>
          <li>танк</li>
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
    isShow: false,
    selectBrand: 'All',
    searchText: '',
    imgUrlCarRent: '',
    carRent: null,
    isReadyRent: false,
    isOpenHistory: false,
  }),


  computed: {
    models() {
      return this.$store.getters.getModels
    },
    availableСars() {
      return this.$store.getters.getAvailableСars
    }
  },


  methods: {
    onActiveBrand(name) {
      this.selectBrand = name
    },
    onSearch() {
      console.log(this.searchText)
    },
    blurSearch() {
      setTimeout(() => {
        this.isOpenHistory = false
      }, 200);
    },
    openRentCar(imgUrl, car) {
      this.carRent = car
      this.imgUrlCarRent = imgUrl
      this.isShow = true
    },
    clearImgCarRent() {
      this.imgUrlCarRent = ''
      this.carRent = null
    },
    toggleRent() {
      this.isReadyRent = true
      setTimeout(() => {
        this.isReadyRent = false
        this.isShow = false
        this.$router.push('/rent')
      }, 3000);
    },
    setRentCar(dateRent) {
      const payload = {
        carRent: this.carRent,
        dateRent,
        toggleRent: this.toggleRent, 
      }
      this.$store.dispatch('setRentCar', payload)
    },
    async fetchImagaCar(imgId) {
      const storage = getStorage()
      const imgRef = ref(storage, `car/${imgId}`)
      const imageUrl = await getDownloadURL(imgRef)
      return imageUrl
    }
  },


  mounted() {
    this.$store.dispatch('fetchModels')
    this.$store.dispatch('fetchCars')
  },
};
</script>