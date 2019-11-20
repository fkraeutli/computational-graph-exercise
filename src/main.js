import Vue from 'vue'
import App from './App.vue'
import { MdCard, MdContent, MdTable, MdLayout } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(MdCard)
Vue.use(MdContent)
Vue.use(MdLayout)
Vue.use(MdTable)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
