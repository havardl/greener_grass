import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

Vue.config.productionTip = false

import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);

/* vendor stuff */
import "../node_modules/mapbox-gl/dist/mapbox-gl.css";
import "../node_modules/@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
