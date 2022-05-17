<template>
  <div class="picture" :class="isRemove && 'picture--remove'">
    <img v-if="imgUrl" :src="imgUrl" alt="berline" />
    <div class="car">
      <div class="car__title"><span>Модель: </span>{{infoCar && infoCar.modelCar}}</div>
      <div class="car__title"><span>Мощность: </span>{{infoCar && infoCar.powerCar}} л.с.</div>
      <button 
        class="car__title car__title--card contact" 
        @click="onShowList"
      >
        Показать список
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'carCom',
  props: ['car', 'fetchImagaCar', 'fetchInfoCar', 'users', 'onShowListRent', 'setShowData', 'onCloseShowListRent'],

  data: () => ({
    imgUrl: '',
    infoCar: null,
    isRemove: false,
  }),

  methods: {
    onShowList() {
      this.onShowListRent()
      this.setShowData(this.users, this.car)
    }
  },

  async mounted() {
    const infoCar = await this.fetchInfoCar(this.car)
    this.infoCar = infoCar

    const imgUrl = await this.fetchImagaCar(this.car)
    this.imgUrl = imgUrl
  },

  unmounted() {
    this.onCloseShowListRent()
  },

  // watch: {
  //   users() {
  //     this.setShowData(this.users, this.car)
  //   },
  // }
}
</script>