import { createApp } from 'vue'
import App from './App.vue'

import router from './router'

import store from './store'

// elementUI plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 全局引入图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// css样式库
import 'virtual:windi.css'

// 全局前置守卫
import './permission'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router)
  .use(store)
  .use(ElementPlus)
  .mount('#app')
