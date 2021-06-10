<template>
  <div :class="(isLoading) ? 'easycredit-tx-status-widget loading' : 'easycredit-tx-status-widget'">
    <span class="logo" />
    <span>{{ statusLabel }}</span>
  </div>
</template>

<script>
import daysSinceOrder from './mixins/dateHelper'
import store from './store'
import i18n from './de_DE.js'

export default {
  mixins: [daysSinceOrder],
  props: [
    'id',
    'date'
  ],
  data () {
    return {
      statusMapping: {
        LIEFERUNG_MELDEN: this.$t('Report Shipping'),
        IN_ABRECHNUNG: this.$t('In Clearing'),
        ABGERECHNET: this.$t('Cleared')
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
        if (this.daysSinceOrder() > 1) {
          label = this.$t('n/a')
        }
        return label
      }

      if (this.statusMapping[this.tx.haendlerstatusV2] !== 'undefined') {
        label = this.statusMapping[this.tx.haendlerstatusV2]
      }

      if (this.tx.bestellwertUrspruenglich > this.tx.bestellwertAktuell) {
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
