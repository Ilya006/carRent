<template>
  <div class="picture" @click="openRentCar" >
    <img src="./../pictures/berline-1.jpg" alt="berline" />
    <div class="car">
      <div class="car__title"><span>Модель: </span>Mazda</div>
      <div class="car__title"><span>Мощность: </span>123 л.с.</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'carCom',
  props: ['openRentCar', 'isRent']
}
</script>