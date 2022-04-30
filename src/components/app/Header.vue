<template>
  <header>
    <router-link class="logo" to="/">
      <div class="circle"></div>
      Car<span>rental</span>
    </router-link>
    <nav>
      <router-link class="haeder__nav" to="home">Home</router-link> 
      <router-link class="haeder__nav" to="gallery">Gallery</router-link>
      <router-link class="haeder__nav" to="reservation">Reservation</router-link>
    </nav>
    <div>
      <span class="header__name">name</span>
      <router-link class="contact" to="login" >Войти</router-link>
    </div>
    <div class="hamburger">
      <div></div>
      <div></div>
    </div>
  </header>
</template>

