import { createRouter, createWebHistory } from 'vue-router'
import CategoryView from '../views/CategoryView.vue'
import DataView from '../views/DataView.vue'
import GraphView from '../views/GraphView.vue'
import TagView from '../views/TagView.vue'
import StatisticView from '@/views/StatisticView.vue'

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
      path: '/category',
      name: 'category',
      component: CategoryView
    },
    {
      path: '/tag',
      name: 'tag',
      component: TagView
    },
    {
      path: '/statistic',
      name: 'statistic',
      component: StatisticView
    }
  ]
})

export default router
