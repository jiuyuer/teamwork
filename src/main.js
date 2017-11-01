import Vue from 'vue'
import Vuex from 'vuex'
import App from '@/components/App'
import router from '@/routes'
import '../static/global.less'

Vue.use(Vuex)

Vue.config.productionTip = false

const store = new Vuex.Store({
  state:{
    message:'cao'
  },
  mutations: {
    increment(state) {
      state.message = 'fuck'
    }
  }
})

/* eslint-disable no-new */
new Vue({
  name:'team-work',
  el: '#app',
  store,
  router,
  render: h => h(App)
})
