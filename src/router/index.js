import { createRouter, createWebHistory } from 'vue-router'
import EventList from '@/views/events/EventList.vue'
import EventLayout from '@/views/events/EventLayout.vue'
import EventDetail from '@/views/events/EventDetail.vue'
import EventRegister from '@/views/events/EventRegister.vue'
import EventEdit from '@/views/events/EventEdit.vue'
import EventNew from '@/views/events/EventNew.vue'
import NotFound from '@/views/NotFound.vue'
import NetworkError from '@/views/NetworkError.vue'

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    props: route => ({ page: parseInt(route.query.page) || 1 })
  },
  {
    path: '/events/:id',
    name: 'EventLayout',
    component: EventLayout,
    props: true,
    meta: { requireAuth: true },
    children: [
      {
        path: '',
        name: 'EventDetail',
        component: EventDetail,
      },
      {
        path: 'register',
        name: 'EventRegister',
        component: EventRegister,
      },
      {
        path: 'edit',
        name: 'EventEdit',
        component: EventEdit,
      },
    ]
  },
  {
    path: '/events/new',
    name: 'EventNew',
    component: EventNew
  },
  // Alias Router
  {
    path: '/event/:afterEvent(.*)',
    redirect: to => {
      return { path: '/events/' + to.params.afterEvent }
    }
  },
  {
    path: '/about',
    name: 'AboutView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/AboutView.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFound,
    props: true
  },
  {
    path: '/network-error',
    name: 'NetworkError',
    component: NetworkError,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  // Dùng khi cuộn đến cuối trang, thì click trang tiếp theo thì nhảy lên đầu trang
  // savedPosition: Dùng khi back Browser thì sẽ về lại đúng vị trí trước đó
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})
export default router
