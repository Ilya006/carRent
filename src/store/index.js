import { createStore } from 'vuex'

import auth from './modules/auth'
import profile from './modules/profile'
import rentCar from './modules/rentCar'

export default createStore({
  state: {
    
  },
  mutations: {},
  actions: {},
  getters: {},

  modules: {
    auth,
    profile,
    rentCar,
  },
})
