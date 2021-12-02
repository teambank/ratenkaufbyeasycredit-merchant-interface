<template>
  <div class="transaction-info">
    <p>
      <strong>{{ $t('Customer') }}:</strong> {{ tx.customer.firstName }} {{ tx.customer.lastName }}<br>
      <strong>{{ $t('Customer No') }}:</strong> {{ tx.customer.customerNumber }}<br>
      <strong>{{ $t('Credit Account No') }}:</strong> {{ tx.creditAccountNumber }}<br>
      <strong>{{ $t('Transaction Id') }}:</strong> {{ tx.transactionId }}<br>
      <strong>{{ $t('Order Amount') }}:</strong> {{ orderAmount }}<br>
    </p>

    <div class="progress-bar">
      <div
        v-for="(field, index) in progressFields"
        :key="field.label"
        class="progress"
      >
        <strong>{{ field.label }}</strong><br>
        <span>{{ field.value ? field.value : 'n/a' }}</span><br>

        <span v-if="index != Object.keys(progressFields).length - 1">|</span>
      </div>
    </div>
  </div>
</template>

<script>
import i18n from '../../de_DE.js'

export default {
  props: {
    tx: Object
  },
  computed: {
    progressFields () {
      return [{
        label: this.$t('Order'),
        value: this.tx.orderDetails.orderDate
      }, {
        label: this.$t('Shipping'),
        value: this.tx.bookings.filter(b => b.type === 'CAPTURE').created
      }, {
        label: this.$t('Clearing'),
        value: this.tx.bookings.filter(b => b.type === 'NOTIFY').created
      }, {
        label: this.$t('Refund'),
        value: this.tx.bookings.filter(b => b.type === 'REFUND').created
      }]
    },
    orderAmount () {
      return this.$helpers.formatCurrency(this.tx.orderDetails.currentOrderValue)
      + ' / ' + this.$helpers.formatCurrency(this.tx.orderDetails.originalOrderValue)
    }
  },
  methods: {
    $t (key) {
      return i18n.get(key)
    }
  }
}
</script>
