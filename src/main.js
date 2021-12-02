// following lines are stripped from auto-generated entry-wc.js file
import '@vue/cli-service/lib/commands/build/setPublicPath'
import Vue from 'vue'
import wrap from '@vue/web-component-wrapper'

// runtime shared by every component chunk
import 'css-loader/dist/runtime/api.js'
import 'vue-style-loader/lib/addStylesShadow'
import 'vue-loader/lib/runtime/componentNormalizer'

import store from './store/index'
import i18n from './de_DE.js'

import helpers from './helpers';

if (process.env.NODE_ENV === "development") {
  const server = require('./server');
  server.default();
}

Vue.use({
    install() {
        Vue.helpers = helpers;
        Vue.prototype.$helpers = helpers;
    }
});

Vue.config.productionTip = false
Vue.config.performance = true

Vue.prototype.i18n = i18n

import Manager from './Manager.vue?shadow'
Manager.store = store
Manager.i18n = i18n
window.customElements.define('easycredit-merchant-manager', wrap(Vue, Manager))

import StatusWidget from './StatusWidget.vue?shadow'
StatusWidget.store = store
StatusWidget.i18n = i18n
window.customElements.define('easycredit-merchant-status-widget', wrap(Vue, StatusWidget))
