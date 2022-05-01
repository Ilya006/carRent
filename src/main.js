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
  apiKey: "AIzaSyADxx984vK2Cn43hxYu7UiqYYjShCNUHPM",
  authDomain: "carrent-47f0e.firebaseapp.com",
  projectId: "carrent-47f0e",
  storageBucket: "carrent-47f0e.appspot.com",
  messagingSenderId: "321015275826",
  appId: "1:321015275826:web:0aad2fb5c36ddd830d372b",
  measurementId: "G-FCM9EHJMZP"
}))

app.mount('#app')
