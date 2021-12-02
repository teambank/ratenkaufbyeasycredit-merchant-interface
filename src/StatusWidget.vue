<template>
  <div :class="(isLoading) ? 'easycredit-tx-status-widget loading' : 'easycredit-tx-status-widget'">
    <span class="logo" />
    <span>{{ statusLabel }}</span>
  </div>
</template>

<script>
import store from './store'
import i18n from './de_DE.js'

export default {
  props: {
    id: {
      type: String
    },
    date: {
      type: String
    }
  },
  data () {
    return {
      statusMapping: {
        REPORT_CAPTURE: this.$t('Report Shipping'),
        REPORT_CAPTURE_EXPIRING: this.$t('Report Shipping (expiring)'),
        IN_BILLING: this.$t('In Clearing'),
        BILLED: this.$t('Cleared'),
        EXPIRED: this.$t('Expired')
      }
    }
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
    },
    statusLabel () {
      let label = this.$t('Waiting')

      if (!this.tx) {
        if (this.$helpers.daysSinceOrder(this.date) > 1) {
          label = this.$t('n/a')
        }
        return label
      }

      if (this.statusMapping[this.tx.status] !== 'undefined') {
        label = this.statusMapping[this.tx.status]
      }

      if (this.tx.orderDetails.originalOrderValue > this.tx.orderDetails.currentOrderValue) {
        label = this.$t('Refunded')
      }
      return label
    }
  },
  beforeMount () {
    store.dispatch('loadTransactions')
  },
  methods: {
    $t (key) {
      return i18n.get(key)
    }
  }
}
</script>

<style lang="scss">
@import 'assets/css/main.scss'
</style>
