import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import {store} from './store/index'
import AlertCmp from './components/Shared/Alert.vue'
import Edit from './components//Post//Edit/Edit.vue'
Vue.component('app-alert', AlertCmp)
Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.component('app-edit', Edit)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyDb7_fUcSjV1bpUjRDLS8Iy3rc484Jle1Y',
      authDomain: 'bloogy-blog.firebaseapp.com',
      databaseURL: 'https://bloogy-blog.firebaseio.com',
      projectId: 'bloogy-blog',
      storageBucket: 'bloogy-blog.appspot.com'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadPosts')
  }
})
