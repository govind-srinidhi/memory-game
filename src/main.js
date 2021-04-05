/**
 * @file This is the entry file for memory game application.
 * All the plugins should be loaded here before the new vue instance is created and mounted.
 */
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './plugins/router';

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
