import Vue from 'vue'
import Router from 'vue-router'
import Portal from '@/components'
import Test from '@/components/test/index.vue'
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
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/project/:id',
      name: 'Detail',
      component: Detail,
      children: [
        {
          path: 'task/:taskId',
          name: 'TaskDetail',
          component: TaskDetail
        }
      ]
    }
  ]
})
