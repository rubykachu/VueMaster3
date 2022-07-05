import { createApp, reactive } from 'vue'
import App from './App.vue'
import router from './router'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import store from './store'

const GStore = reactive({ flashMessage: '' })

createApp(App)
  .use(store)
  .use(router)
  .provide('GStore', GStore)
  .mount('#app')

router.beforeEach((to, _from) => { // eslint-disable-line
  NProgress.start()

  const notAuthorized = true
  // nếu Resource có yêu cầu Authorize
  // và giả sử như set authorize = false thì thông báo xác thực
  if (to.meta.requireAuth && notAuthorized) {
    GStore.flashMessage = 'Sorry, you are not authorized to view this page'

    setTimeout(() => {
      GStore.flashMessage = ''
    }, 3000)

    return false
  }
})

router.afterEach(() => {
  NProgress.done()
})
