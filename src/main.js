import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from '@/components/App'
import router from '@/routes'
import '@/filters/'
import store from './vuex/store';

Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  name: 'team-work',
  el: '#app',
  store,
  router,
  render: h => h(App)
})
