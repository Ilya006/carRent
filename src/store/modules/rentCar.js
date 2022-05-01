import { getDatabase, ref, onValue } from "@firebase/database"

export default {
  state: {
    models: null,
    laodingCars: false,
  },


  mutations: {
    setLoadCars(state, isLoad) {
      state.laodingCars = isLoad
    },
    setModels(state, models) {
      state.models = models
    }
  },


  getters: {
    getLoadingCar(state) {
      return state.laodingCars
    },
    getModels(state) {
      return state.models
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



  }
}