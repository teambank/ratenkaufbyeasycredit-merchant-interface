import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import mutations from './mutations'

import config from '../config.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    transactions: [],
    loading: true
  },
  getters,
  mutations,
  actions: {
    async loadTransactions (context) {
      context.commit('loading', true)

      const result = await fetch(config.getEndpoints().list, config.getRequestConfig())
      const json = await result.json()
      if (json && Array.isArray(json)) {
        context.commit('fetchList', json)
        context.commit('loading', false)
      }
    },
    async loadTransaction (context, id) {
      const url = new URL(config.getEndpoints().get, window.location.origin)
      url.search = new URLSearchParams({ id: id }).toString()
      const result = await fetch(url, config.getRequestConfig())
      let json = await result.json()

      if (json) {
        if (Array.isArray(json)) {
          json = json[0]
        }

        context.commit('fetchSingle', { data: json, id: id })
      }
    }
  }
})
