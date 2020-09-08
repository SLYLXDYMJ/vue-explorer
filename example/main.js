import Vue from 'vue'
import App from './App.vue'

import JsonVueExplorer from '../src'

Vue.config.productionTip = false

Vue.use(JsonVueExplorer)

new Vue({
  render: h => h(App)
}).$mount('#app')
