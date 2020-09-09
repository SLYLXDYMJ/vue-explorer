import Vue from 'vue'
import App from './App.vue'

import jsonVueExplorer from '../src'

import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(Element)
Vue.use(jsonVueExplorer)

new Vue({
  render: h => h(App)
}).$mount('#app')
