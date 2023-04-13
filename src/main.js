import { createApp } from 'vue'
import App from './App.vue'
import router from '../router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.js"

loadFonts()

// createApp(App).use(router).mount('#app')

createApp(App)
  .use(vuetify)
  .use(router)
  .mount('#app')
