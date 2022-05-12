import { child, get, getDatabase, push, ref, remove, update } from "@firebase/database"
import { getStorage, ref as refStorage, uploadBytes } from "firebase/storage"

export default {
  state: {
    loadingAddCar: false,
  },

  mutations: {
    setAddNewCar(state, isLoad) {
      state.loadingAddCar = isLoad
    }
  },

  getters: {
    getLoadingAddCar(state) {
      return state.loadingAddCar
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
    async cancelRent({ rootState }, idCar) {
      const db = getDatabase()
      const userId = rootState.auth.userId
      const rentCarRef = ref(db, `users/${userId}/rent/${idCar}`)
      await remove(rentCarRef)
      console.log('remove')
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
    }



  }
}