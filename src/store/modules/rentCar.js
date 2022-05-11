import { getDatabase, ref, onValue, query, orderByChild, equalTo, get, update, remove, startAt } from "@firebase/database"

export default {
  state: {
    models: null,
    availableСars: null,
    laodingCars: false,
    searchHistory: null
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
    },
    setSearchHistory(state, history) {
      state.searchHistory = history && Object
      .keys(history)
      .map(date => [date, history[date]])
      .reverse()
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
    },
    getSearchHistory(state) {
      return state.searchHistory
    },
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


    // Получить историю поиска
    fetchSearchHistory({ commit, rootState }) {
      const db = getDatabase()
      const userId = rootState.auth.userId
      const searchRef = ref(db, `users/${userId}/searchHistory`)

      onValue(searchRef, (snapshot) => {
        const history = snapshot.val() 
        commit('setSearchHistory', history)
      })
    },


    // Установить историю поиска
    async setSearchResults({ commit, rootState }, searchText) {
      console.log(`search Text: ${searchText}`)

      const db = getDatabase()
      const userId = rootState.auth.userId
      const searchHistoryRef = ref(db, `users/${userId}/searchHistory`)

      if(userId) {
        // Текщее дата в время
        const date = new Date()
        const dateDay = date.toISOString().split('T')[0]
        const time = date.toLocaleTimeString()
        
        // Добавить историю поиска
        const searchHistoryUpdate = {}
        searchHistoryUpdate[`${dateDay} ${time}`] = searchText
        await update(searchHistoryRef, searchHistoryUpdate)

        // Очистить старую историю поиска
        const history = rootState.rentCar.searchHistory
        const removeRecord = history && history.length > 5 && history[5][0]
        if(removeRecord) {
          const recordRef = ref(db, `users/${userId}/searchHistory/${removeRecord}`)
          remove(recordRef)
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