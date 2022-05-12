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
  apiKey: "AIzaSyD_V1UdMHqg7nwb-ZFqJ1tqELA4cK_iEFM",
  authDomain: "rentcars-5e719.firebaseapp.com",
  projectId: "rentcars-5e719",
  storageBucket: "rentcars-5e719.appspot.com",
  messagingSenderId: "60082243157",
  appId: "1:60082243157:web:0470188a40d789f3f236dc"
}))

app.mount('#app')
