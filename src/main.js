import Vue from 'vue'

import Manager from './Manager.vue'
import StatusWidget from './StatusWidget.vue'

import store from './store/index'
import i18n from './de_DE.js'

import './assets/css/main.scss'

// (optional) 'Custom elements polyfill'
import 'document-register-element/build/document-register-element'
import vueCustomElement from 'vue-custom-element'

// import fetch polyfill
import 'whatwg-fetch'

Vue.use(vueCustomElement)

Vue.config.productionTip = false
Vue.config.performance = true

var eventHub = new Vue()
Vue.prototype.$eventHub = eventHub
Vue.prototype.i18n = i18n

var addTransactionTimeout = null
var transactions = []
eventHub.$on('add-transaction', (id) => {
  transactions.push(id)

  clearTimeout(addTransactionTimeout)
  addTransactionTimeout = setTimeout(() => {
    store.dispatch('loadTransactions', transactions)
  }, 100)
})

Manager.store = store
Manager.i18n = i18n

Vue.customElement('easycredit-tx-manager', Manager)

StatusWidget.store = store
StatusWidget.i18n = i18n

Vue.customElement('easycredit-tx-status', StatusWidget)
