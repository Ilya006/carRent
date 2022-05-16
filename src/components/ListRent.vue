<template>
  <div class="menu" @click="onCloseList">
    <div class="menu__wapper">
      <h2 class="menu__title">Машину арендовали:</h2>

      <ul class="menu__list">
        <li class="menu__item" v-for="(user, id) in users" :key="id">
          <div>
            <span>Имя:</span>
            {{user.userName}}
          </div>
          <div>
            <span>Аренда до:</span>
            {{user.dateRent}} г.
          </div>
          <button class="contact contact__list" @click="onClearRentUser(id)">&#10006;</button>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
export default {
  name: 'ListRentUser',
  props: ['usersList', 'onClearRentUser', 'onCloseShowListRent'],

  computed: {
    users() {
      return this.usersList.users
    }
  },

  methods: {
    onCloseList(e) {
      if(e.target.classList[0] === 'menu') {
        this.onCloseShowListRent()
      }
    },
  },
  

}</script>