<template>
  <div class="picture" :class="isRemove && 'picture--remove'">
    <img v-if="imgUrl" :src="imgUrl" alt="berline" />
    <div class="car">
      <div class="car__title"><span>Модель: </span>{{infoCar && infoCar.modelCar}}</div>
      <div class="car__title"><span>Мощность: </span>{{infoCar && infoCar.powerCar}} л.с.</div>
      <div class="car__title"><span>Аренда до: </span>{{infoCar && car.dateRent}}</div>
    </div>

    <span class="profile__btn" @click="onCancelRent">&#10006;</span>
  </div>
</template>

<script>
export default {
  name: 'carCom',
  props: ['car', 'fetchImagaCar', 'fetchInfoCar'],


  data: () => ({
    imgUrl: '',
    infoCar: null,
    isRemove: false
  }),

  methods: {
    onCancelRent() {
      if(window.confirm('Вы действительно хотите отменить аренду машины?')) {
        this.isRemove = true
        setTimeout(() => {
          this.$store.dispatch('cancelRent', this.car.carRent)
        }, 300);
      }
    }
  },

  async mounted() {
    const infoCar = await this.fetchInfoCar(this.car.carRent)
    this.infoCar = infoCar

    const imgUrl = await this.fetchImagaCar(this.car.carRent)
    this.imgUrl = imgUrl
  },

  unmounted() {
    this.isRemove = false
    this.imgUrl = '',
    this.infoCar = null
  }
}
</script>