import Vue from 'vue'
import Vuex from 'vuex'

import orderModule from './modules/order'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    order: orderModule
  }
})
