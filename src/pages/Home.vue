<template>
  <HeaderVue />

  <div class="bar" v-if="!isShow">
    <div class="items">
      <SelectBrand 
        v-for="brand in faceBrand"
        :key="brand"
        :name="brand"
        :onActiveBrand="onActiveBrand"
        :active="brand === selectBrand ? true : false"
      />
      <div class="" id="search">
        <img
          src="https://img.icons8.com/ios/96/000000/search--v1.png"
          alt="search-logo"
        />
      </div>
    </div>
  </div>

  <div class="gallery" v-if="!isShow">
    <div 
      class="picture" 
      data-name="berline"
      @click="onOpenShow"
    >
      <img src="./../pictures/berline-1.jpg" alt="berline">
    </div>
    <div 
      class="picture" 
      data-name="berline"
      @click="onOpenShow"
    >
      <img src="./../pictures/berline-2.jpg" alt="berline">
    </div>
  </div>

  <div class="select-overlay" v-if="isShow">
    <span class="close" @click="onCloseShow">&times;</span>
    <div class="info">
      <RentCar />
    </div>
    <div class="pic">
      <img src="https://www.bugatti.com/fileadmin/_processed_/9/5/csm_HEADER_22de7ed3a8.jpg" alt="berline">
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
    faceBrand: ['All', 'Bmw', 'Mazda', 'Toyota']
  }),

  methods: {
    onOpenShow() {
      this.isShow = true
    },
    onCloseShow() {
      this.isShow = false
    },
    onActiveBrand(name) {
      this.selectBrand = name
    }
  },
};
</script>