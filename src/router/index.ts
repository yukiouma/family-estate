import { createRouter, createWebHistory } from 'vue-router'
import ClassView from '../views/ClassView.vue'
import DataView from '../views/DataView.vue'
import GraphView from '../views/GraphView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    {
      path: '/data',
      name: 'data',
      component: DataView
    },
    {
      path: '/graph',
      name: 'graph',
      component: GraphView
    },
    {
      path: '/class',
      name: 'class',
      component: ClassView
    }
  ]
})

export default router
