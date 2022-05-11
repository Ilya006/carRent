<template>
  <div class="picture" @click="openRentCar(imgUrl, car.imgCar)" >
    <img :src="imgUrl" alt="berline" />
    <div class="car">
      <div class="car__title"><span>Модель: </span>{{car.modelCar}}</div>
      <div class="car__title"><span>Мощность: </span>{{car.powerCar}} л.с.</div>
    </div>
    <span class="picture__viewed">Просмотрено</span>
  </div>
</template>

<script>
export default {
  name: 'carCom',
  props: ['openRentCar', 'car', 'fetchImagaCar', 'isRent'],

  data: () => ({
    imgUrl: '',
  }),

  async mounted() {
    const imgUrl = await this.fetchImagaCar(this.car.imgCar)
    this.imgUrl = imgUrl
  },
}
</script>