<template>
  <HeaderVue />
  <div :class="isOpenHistory && 'home--dark'" class="home--mt">
    <div class="search__wrap" v-if="!isShow">
      <form class="search__from" @submit.prevent="onSearch">
        <input 
          class="search__input"
          type="text" 
          @focus="isOpenHistory = true"
          @blur="blurSearch"
          v-model="searchText"
        >
        <button class="search__btn"></button>
        <ul class="search__history" v-if="isOpenHistory">
          <li>Дарк</li>
          <li>мерст</li>
          <li>танк</li>
        </ul>
      </form>
    </div>

    <div class="bar" v-if="!isShow">
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

    <div class="gallery" v-if="!isShow">
      <Car :openRentCar="openRentCar" isRent />
      <Car :openRentCar="openRentCar" />
      <Car :openRentCar="openRentCar" />
      <Car :openRentCar="openRentCar" />
      <Car :openRentCar="openRentCar" />
    </div>

    <div class="select-overlay" v-if="isShow">
      <span class="close" @click="isShow = false">&times;</span>
      <div class="info">
        <RentCar />
      </div>
      <div class="pic">
        <img src="https://www.bugatti.com/fileadmin/_processed_/9/5/csm_HEADER_22de7ed3a8.jpg" alt="berline">
      </div>
    </div>
  </div>

  <Footer v-if="!isShow"/>

</template>

<script>
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
    isOpenHistory: false,
  }),


  computed: {
    models() {
      return this.$store.getters.getModels
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
    openRentCar() {
      this.isShow = true
    }
  },


  mounted() {
    this.$store.dispatch('fetchModels')
  },



};
</script>