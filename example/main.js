import Vue from 'vue'
import App from './App.vue'

import vueExplorer from '../src'

import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(Element)
Vue.use(vueExplorer)

new Vue({
  render: h => h(App)
}).$mount('#app')
