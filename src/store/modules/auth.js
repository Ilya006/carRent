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
    userId: null,
    errorAuth: null,
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
    }
  },

  actions: {
    // Регистраци
    async register({commit}, { name, email, password }) {
      try {
        const auth = getAuth()
        const db = getDatabase()
        await createUserWithEmailAndPassword(auth, email, password)
        const userId = auth.currentUser.uid
        // Создать Имя
        set(ref(db, `users/${userId}/data`), {
          name
        })
        router.push('/')
      }
      catch (error) { 
        commit('setErrorCode', error.code) 
      }
    },


    // Залогиниться
    async login({commit}, { email, password }) {
      try {
        const auth = getAuth()
        await signInWithEmailAndPassword(auth, email, password)
        router.push('/')
      } 
      catch (error) { 
        commit('setErrorCode', error.code) 
      }
    },


    // Выйти из учетной записи
    async logout({ commit }) {
      try {
        const auth = getAuth()
        await signOut(auth)
        commit('setUserName', null)
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
      // const rentCarRef = ref(db, `users/${userId}/rent`)

        onValue(profileRef, (snapshot) => { 
          const data = snapshot.val()
          commit('setUserInfo', data)
        })

        // onValue(rentCarRef, (snapshot) => {
        //   const data = snapshot.val()
        //   commit('setRentCar', data)
        // })
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