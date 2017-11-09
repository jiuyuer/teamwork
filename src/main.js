import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from '@/components/App'
import router from '@/routes'
import '@/filters/'

Vue.use(Vuex)
Vue.use(ElementUI)

Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    projectList: []
  },
  mutations: {
    loadProject(state, projects) {
      state.projectList = projects;
    }
  }
})

/* eslint-disable no-new */
new Vue({
  name: 'team-work',
  el: '#app',
  store,
  router,
  render: h => h(App)
})
