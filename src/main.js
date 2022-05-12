import { createApp } from 'vue'
import Vuex from 'vuex'
import router from './router'
import { initializeApp } from "firebase/app";

import App from './App.vue'
import store from './store'

const app = createApp(App)
app.use(Vuex)
app.use(store)
app.use(router)
app.use(initializeApp({
  apiKey: "AIzaSyB7KR_dMsYmI2FbFq6IZLsAaqUNGn93VYo",
  authDomain: "rentcar-42c83.firebaseapp.com",
  projectId: "rentcar-42c83",
  storageBucket: "rentcar-42c83.appspot.com",
  messagingSenderId: "730750177003",
  appId: "1:730750177003:web:08e40de99555f7b8e678ae",
  measurementId: "G-WV0QREQNPG"
}))

app.mount('#app')
