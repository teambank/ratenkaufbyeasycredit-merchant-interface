<template>
  <div class="easycredit-tx-status-widget">
    <span>{{ statusLabel }}</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import daysSinceOrder from './mixins/dateHelper'

export default {
  props: [
    'id',
    'date'
  ],
  mixins: [daysSinceOrder],
  data () {
    return {
      statusMapping: {
        LIEFERUNG_MELDEN: this.$t('Report Shipping'),
        IN_ABRECHNUNG: this.$t('In Clearing'),
        ABGERECHNET: this.$t('Cleared')
      }
    }
  },
  beforeMount () {
    this.$eventHub.$emit('add-transaction', this.id)
  },
  computed: {
    ...mapGetters(['transaction']),
    tx () {
      return this.transaction(this.id)
    },
    statusLabel () {
      let label = this.$t('Waiting')

      if (!this.tx) {
        if (this.daysSinceOrder(this.date) > 1) {
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
  methods: {
    $t (key) {
      return this.i18n.get(key)
    }
  }
}
</script>
