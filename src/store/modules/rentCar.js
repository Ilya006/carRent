import { getDatabase, ref, onValue, query, orderByChild, equalTo, get, update } from "@firebase/database"

export default {
  state: {
    models: null,
    availableСars: null,
    laodingCars: false,
  },


  mutations: {
    setLoadCars(state, isLoad) {
      state.laodingCars = isLoad
    },
    setModels(state, models) {
      state.models = models
    },
    setAvailableСars(state, cars) {
      state.availableСars = cars
    },
    clearCars(state) {
      state.availableСars = null
    }
  },


  getters: {
    getLoadingCar(state) {
      return state.laodingCars
    },
    getModels(state) {
      return state.models
    },
    getAvailableСars(state) {
      return state.availableСars
    }
  },


  actions: {
    // Получить все добавленные марки авто
    fetchModels({ commit }) {
      const db = getDatabase()
      const modelsRef = ref(db, 'models')
      
      onValue(modelsRef, (snapshot) => {
        const models = snapshot.val()
        commit('setModels', models)
      })
    },


    // Получить доступные машины
    async fetchCars({ commit }, model) {
      const db = getDatabase()

      if(model === 'All') {
        const carsRef = ref(db, 'cars')
        commit('setLoadCars', true)

        try {
          const data = await get(carsRef)
          commit('setAvailableСars', data.val())
          commit('setLoadCars', false)
          return 
        } catch (error) {
          console.log(error)
          commit('setLoadCars', false)
        }
      } else if(model) {
        const que = query(ref(db, 'cars'), orderByChild('modelCar'), equalTo(model))
        commit('setLoadCars', true)

        try {
          const data = await get(que)
          commit('setAvailableСars', data.val())
          commit('setLoadCars', false)
        } catch (error) {
          console.log(error)
          commit('setLoadCars', false)
        }
      }
    },


    // Аренда машины
    async setRentCar({ commit, rootState }, { carRent, dateRent, toggleRent }) {
      const db = getDatabase()
      const userId = rootState.auth.userId
      const rentCarRef = ref(db, `users/${userId}/rent/`)
      const rentCarUpdate = {}
      rentCarUpdate[carRent] = {carRent, dateRent}

      try {
        await update(rentCarRef, rentCarUpdate)
        toggleRent()
      } catch (error) {
        console.log(error)
      }
    }



  }
}