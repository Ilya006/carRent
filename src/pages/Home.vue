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
          v-for="brand in faceBrand"
          :key="brand"
          :name="brand"
          :onActiveBrand="onActiveBrand"
          :active="brand === selectBrand ? true : false"
        />
      </div>
    </div>

    <div class="gallery" v-if="!isShow">
      <div 
        class="picture" 
        data-name="berline"
        @click="isShow = true"
      >
        <img src="./../pictures/berline-1.jpg" alt="berline">
      </div>
      <div 
        class="picture" 
        data-name="berline"
        @click="isShow = true"
      >
        <img src="./../pictures/berline-2.jpg" alt="berline">
      </div>
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

</template>

<script>
import HeaderVue from "../components/app/Header.vue";
import SelectBrand from './../components/SelectBrand.vue';
import RentCar from './../components/RentCar.vue';

export default {
  name: "home",
  components: { HeaderVue, SelectBrand, RentCar },

  data: () => ({
    isShow: false,
    selectBrand: 'All',
    searchText: '',
    isOpenHistory: false,
    faceBrand: ['All', 'Bmw', 'Mazda', 'Toyota', 'mers', 'chiry', 'taxi']
  }),

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
    }
  },
};
</script>