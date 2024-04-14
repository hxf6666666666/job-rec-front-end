import '@/styles/reset.css'
import '@/styles/global.scss'
import 'uno.css'
// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'

import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './router'
import { setupStore } from './store'
import { setupNaiveDiscreteApi } from './utils'
import { setupDirectives } from './directives'
import PDFObjectPlugin from 'pdfobject-vue'
import print from 'vue3-print-nb'
import CanvasPainter from 'zrender/lib/canvas/Painter' // 引入 Canvas 绘制器
import * as zrender from 'zrender' // 引入 zrender 绘制器
zrender.registerPainter('canvas', CanvasPainter) // 注册绘制器


async function bootstrap() {
  const app = createApp(App)
  setupStore(app)
  setupNaiveDiscreteApi()
  setupDirectives(app)
  await setupRouter(app)
  app.use(PDFObjectPlugin)
  app.use(print)
  app.mount('#app')
}

bootstrap()

