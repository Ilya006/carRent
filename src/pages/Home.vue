<template>
  <Header />

  <main>
    <div class="banner">
      <div class="banner--dark">
        <p>Арендуй автомобиль у нас!</p>
        <span>Большой выбор автомобиля по доступным ценам!</span
        >
        <svg width="48px" viewBox="0 0 24 24">
          <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path>
        </svg>
      </div>
    </div>

    <div class="collb">
      <p>С нами сотрудничают</p>
      <div class="loges">
        <img src="./../pictures/ford-logo.png" alt="ford-logo" />
        <img src="./../pictures/Daimler-logo.png" alt="Daimler-logo" />
        <img src="./../pictures/toyota-logo.png" alt="toyota-logo" />
      </div>
    </div>


    <div class="work">
      <p>Как это работает?</p>

      <div class="info">
        <div>
          <img src="https://img.icons8.com/dusk/48/000000/key-not-in-vehicle--v2.png" alt="vehicle" />
          <p>Выберите свой автомобиль</p>
          <span>Выберите автомобиль по вашему вкусу</span>
        </div>

        <div>
          <img src="https://img.icons8.com/color/48/000000/choose.png" alt="choose" />
          <p>Бронируйте в несколько кликов</p>
          <span>Без очередей и бюрократии</span>
        </div>

        <div>
          <img src="https://img.icons8.com/dusk/48/000000/speed.png" alt="speed" />
          <p>Садись за руль и вперед</p>
          <span>Получить ключи очень быстро!</span>
        </div>
      </div>
    </div>
  </main>

  <Footer />
</template>

<script>
import Header from "./../components/app/Header.vue";
import Footer from './../components/app/Footer.vue'

export default {
  name: "homePage",
  components: { Header, Footer },
};
</script>