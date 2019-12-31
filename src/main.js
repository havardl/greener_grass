import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faWalking, faCar, faBiking, faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faWalking, faCar, faBiking, faUserSecret)

Vue.component('font-awesome-icon', FontAwesomeIcon)

import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);

/* vendor stuff */
import "../node_modules/mapbox-gl/dist/mapbox-gl.css";
import "../node_modules/@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
