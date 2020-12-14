import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {store} from './store'
import firebase from "firebase";
require("firebase/firestore");

import moment from 'moment';

Vue.filter('formatDate', function(value) {
    if (value) {
        return moment(String(value)).format('MM/DD/YYYY hh:mm')
    }
});

import Datepicker from 'vuejs-datepicker';
Vue.use(Datepicker)

var VueSlugify = require('vue-slugify')
Vue.use(VueSlugify)

import VModal from 'vue-js-modal'
Vue.use(VModal)

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
Vue.use(Loading);

Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyA_jK_dE92Reu_xV2QjyxmR3wqQi3o5V0M",
  authDomain: "manager---todos.firebaseapp.com",
  projectId: "manager---todos",
  storageBucket: "manager---todos.appspot.com",
  messagingSenderId: "314412264925",
  appId: "1:314412264925:web:a45688942114b0d0601a34"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

let app = '';

firebaseApp.auth().onAuthStateChanged(() =>{
  if(!app){
    app = new Vue({
      store,
      router,
      render: h => h(App)
    }).$mount("#app");
  }
});
