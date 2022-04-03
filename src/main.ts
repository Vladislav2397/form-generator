import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import DatePicker from 'vue2-datepicker'
Vue.component('date-picker', DatePicker)

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Cleave from 'vue-cleave-component'
Vue.use(Cleave)

import './directives'
import DeviceProvider from "@/mixins/device"

Vue.config.productionTip = false

new Vue({
  mixins: [DeviceProvider],
  router,
  store,
  provide: vm => ({
    '$device': vm.device
  }),
  render: h => h(App)
}).$mount('#app')
