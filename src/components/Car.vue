<template>
  <div 
    v-if="!isRent"
    class="picture" 
    @click="openRentCar(imgUrl, car.imgCar)" 
  >
    <img v-if="imgUrl" :src="imgUrl" alt="berline" />
    <div class="car">
      <div class="car__title"><span>Модель: </span>{{car.modelCar}}</div>
      <div class="car__title"><span>Мощность: </span>{{car.powerCar}} л.с.</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'carCom',
  props: ['openRentCar', 'car', 'fetchImagaCar', 'userRentCar'],

  computed: {
    isRent() {
      const arrRentCar = this.userRentCar 
        && this.userRentCar.filter(carUserRent => carUserRent.carRent === this.car.imgCar)

      return arrRentCar ? (arrRentCar.length === 0 ? false : true) : false
    }
  },

  data: () => ({
    imgUrl: '',
  }),

  async mounted() {
    const imgUrl = await this.fetchImagaCar(this.car.imgCar)
    this.imgUrl = imgUrl

    console.log(this.isRent)
  },


  watch: {
    isRent() {
      console.log(this.isRent)
    }
  }
}
</script>