import { child, get, getDatabase, onValue, push, ref, remove, update } from "@firebase/database"
import { getStorage, ref as refStorage, uploadBytes } from "firebase/storage"

export default {
  state: {
    allRent: null,
    loadingAddCar: false,
  },

  mutations: {
    setAddNewCar(state, isLoad) {
      state.loadingAddCar = isLoad
    },
    setAllRent(state, rent) {
      state.allRent = rent
    }
  },

  getters: {
    getLoadingAddCar(state) {
      return state.loadingAddCar
    },
    getAllRent(state) {
      return state.allRent && state.allRent
    }
  },

  actions: {
    // Добавить новую машину
    async addNewCar({commit, dispatch}, { modelCar, powerCar, imgCar }) {
      const db = getDatabase()
      const newKeyCar = push(child(ref(db), 'cars')).key
      const carRef = ref(db, `cars/${newKeyCar}`)

      try {
        commit('setAddNewCar', true)
        await update(carRef, { modelCar, powerCar, imgCar: newKeyCar })
        await dispatch('setImgNewCar', { imgCar, keyImg: newKeyCar })
        await dispatch('setModelCount', { modelCar, action: 'add' })

        commit('setAddNewCar', false)
      } catch (error) {
        commit('setAddNewCar', false)
        console.log(error)
      }
    },



    //Отменить Аренду авто
    async cancelRent({ rootState, dispatch }, idCar) {
      const db = getDatabase()
      const userId = rootState.auth.userId
      const rentCarRef = ref(db, `users/${userId}/rent/${idCar}`)

      await remove(rentCarRef)
      await dispatch('setAdminRentCar', {carRent: idCar, action: 'remove'})
    },  
  


    // Добавить картинку на сервер
    async setImgNewCar(ctx, { imgCar, keyImg }) {
      const storage = getStorage()
      const imgRef = refStorage(storage, `car/${keyImg}`)

      try { imgCar && await uploadBytes(imgRef, imgCar) } 
      catch (error) {console.log(error)}
    },



    // Добавить количества марок авто
    async setModelCount(ctx,  { modelCar, action }) {
      const db = getDatabase()
      const data = await get(ref(db, `models/${modelCar}`))
      const countModel = data.val()

      const count = {
        add: (a) => a + 1,
        remove: (a) => a - 1,
      }

      const updateModelCount = {}
      updateModelCount[modelCar] = countModel ? count[action](countModel) : 1

      const modelRef = ref(db, `models`)
      await update(modelRef, updateModelCount)
    },



    async fetchAllRent({commit}) {
      const db = getDatabase()
      const allRentRef = ref(db, 'adminRent')

      onValue(allRentRef, (snapshot) => {
        const rent = snapshot.val()
        commit('setAllRent', rent)
      })
    }



  }
}