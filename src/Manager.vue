<template>
  <div :class="(isLoading) ? 'easycredit-tx-manager loading' : 'easycredit-tx-manager'">
    <div class="spinner" />

    <Progress 
      v-if="tx"
      :tx="tx" 
    />
    <Actions 
      v-if="tx" 
      :tx="tx"
    />

    <span v-if="!tx && daysSinceOrder() >= 1">
      Die Transaktion <strong>{{ id }}</strong> ist nicht vorhanden. Bitte loggen Sie sich im <a href="https://partner.easycredit-ratenkauf.de/portal/">Partnerportal</a> ein oder kontaktieren Sie unseren Partnerservice.
    </span>
    <span v-else-if="!tx">
      Die Transaktion <strong>{{ id }}</strong> ist noch nicht verfügbar. Es kann bis zu einem Tag dauern bis die Transaktion angezeigt wird.
    </span>
  </div>
</template>

<script>
import Progress from './components/manager/Progress'
import Actions from './components/manager/Actions'

import daysSinceOrder from './mixins/dateHelper'
import store from './store'

export default {
  components: {
    Progress,
    Actions
  },
  mixins: [daysSinceOrder],
  props: {
    id: String,
    date: String
  },
  computed: {
    isLoading () {
      return store.getters.isLoading
    },
    transaction () {
      return store.getters.transaction
    },
    tx () {
      return this.transaction(this.id)
    }
  },
  beforeMount () {
    store.dispatch('loadTransactions')
  }
}
</script>

<style lang="scss">
@import 'assets/css/main.scss'
</style>
