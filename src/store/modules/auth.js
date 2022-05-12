import router from "@/router"
import { 
  getAuth, signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, signOut, 
  onAuthStateChanged
} from "firebase/auth"
import { getDatabase, ref, set, onValue } from 'firebase/database'

export default {

  state: {
    userInfo: null,
    userRentCar: null,
    userId: null,
    errorAuth: null,
    loadingAuth: false
  },

  mutations: {
    setErrorCode(state, errorCode) {
      state.errorAuth = errorCode
    },
    clearError(state) {
      state.errorAuth = null
    },
    setUserId(state, userId) {
      state.userId = userId
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    setLoadingAuth(state, isReady) {
      state.loadingAuth = isReady
    },
    setRentCar(state, rentCar) {
      state.userRentCar = rentCar && Object.values(rentCar)
    }
  },

  getters: {
    getErrorAuth(state) {
      return state.errorAuth
    },
    getUserName(state) {
      return state.userInfo ? state.userInfo.name : null
    },
    isAdmin(state) {
      return state.userInfo ? state.userInfo.isAdmin : false
    },
    getUserId(state) {
      return state.userId
    },
    getLoadingAuth(state) {
      return state.loadingAuth
    },
    getUserRentCar(state) {
      return state.userRentCar
    }
  },

  actions: {
    // Регистраци
    async register({commit}, { name, email, password }) {
      try {
        const auth = getAuth()
        const db = getDatabase()

        commit('setLoadingAuth', true)
        await createUserWithEmailAndPassword(auth, email, password)
        const userId = auth.currentUser.uid
        // Создать Имя
        await set(ref(db, `users/${userId}/data`), {
          name
        })

        commit('setLoadingAuth', false)
        router.push('/')
      }
      catch (error) { 
        commit('setLoadingAuth', false)
        commit('setErrorCode', error.code) 
      }
    },


    // Залогиниться
    async login({commit}, { email, password }) {
      try {
        const auth = getAuth()

        commit('setLoadingAuth', true)
        await signInWithEmailAndPassword(auth, email, password)

        commit('setLoadingAuth', false)
        router.push('/')
      } 
      catch (error) {
        commit('setLoadingAuth', false) 
        commit('setErrorCode', error.code) 
      }
    },


    // Выйти из учетной записи
    async logout({ commit }) {
      try {
        const auth = getAuth()
        await signOut(auth)
        commit('clearSearchHistory')
        commit('setUserInfo', null)
      } 
      catch(error) { 
        commit('setErrorCode', error.code) 
      }
    },


    // Получить иформацию об аккаунте
    fetchInfo({commit, rootState}) {
      const db = getDatabase()
      const userId = rootState.auth.userId
      const profileRef = ref(db, `users/${userId}/data`)
      const rentCarRef = ref(db, `users/${userId}/rent`)

        onValue(profileRef, (snapshot) => { 
          const data = snapshot.val()
          commit('setUserInfo', data)
        })

        onValue(rentCarRef, (snapshot) => {
          const data = snapshot.val()
          console.log(data)
          commit('setRentCar', data)
        })
    },


    // Сесия
    authStateChanged({ commit }) {
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
        const userId = user && user.uid
        commit('setUserId', userId)
      })
    },







  },
}