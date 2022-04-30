import { createApp } from 'vue'
import Vuex from 'vuex'
import router from './router' 

import App from './App.vue'
import store from './store'

const app = createApp(App)
app.use(Vuex)
app.use(store) 
app.use(router) 

app.mount('#app')
