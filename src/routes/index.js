import Vue from 'vue'
import Router from 'vue-router'
import Portal from '@/components'
import Detail from '@/views'
import TaskDetail from '@/views/taskList/detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/projects'
    },
    {
      path: '/projects',
      name: 'Portal',
      component: Portal
    },
    {
      path: '/project/:id',
      component: Detail,
      children: [
        {
          path: 'task/:taskId',
          component: TaskDetail
        }
      ]
    }
  ]
})