import '@/styles/reset.css'
import '@/styles/global.scss'
import 'uno.css'
// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './router'
import { setupStore } from './store'
import { setupNaiveDiscreteApi } from './utils'
import { setupDirectives } from './directives'



async function bootstrap() {
  const app = createApp(App)
  app.use(ElementPlus)
  setupStore(app)
  setupNaiveDiscreteApi()
  setupDirectives(app)
  await setupRouter(app)
  app.mount('#app')
}

bootstrap()
