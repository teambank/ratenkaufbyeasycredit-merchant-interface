<template>
  <div
    v-if="canShip || canRefund"
    :class="loading ? 'loading' : ''"
  >
    <div class="spinner" />
    <input
      :value="tx.vorgangskennungFachlich"
      type="hidden"
      name="easycredit-merchant[transaction_id]"
    >
    <p>
      <label for="easycredit-merchant-status">Status</label><br>
      <select
        id="easycredit-merchant-status"
        v-model="status"
        name="easycredit-merchant[status]"
      >
        <option value="">
          {{ $t('Please select ...') }}
        </option>
        <option
          v-if="canShip"
          value="CAPTURE"
        >
          {{ $t('Shipping') }}
        </option>
        <option
          v-if="canRefund"
          value="REFUND"
        >
          {{ $t('Refund') }}
        </option>
      </select>
    </p>

    <p
      v-if="status === 'CAPTURE'"
      class="tracking-number"
    >
      <label for="easycredit-merchant-tracking-number">Trackingnummer (Versanddienstleister)</label><br>
      <input
        id="easycredit-merchant-tracking-number"
        v-model="trackingNumber"
        name="easycredit-merchant[trackingNumber]"
        type="text"
        maxlength="50"
      >
    </p>

    <p
      v-if="status === 'REFUND'"
      class="refund"
    >
      <select
        id="easycredit-merchant-refund-reason"
        v-model="refundReason"
        name="easycredit-merchant[refund-reason]"
      >
        <option value="">
          {{ $t('Please select ...') }}
        </option>
        <option
          v-for="(name, value) in refundReasons"
          :key="value"
          :value="value"
        >
          {{ $t(name) }}
        </option>
      </select>

      <span
        v-if="canShowAmount"
        class="amount"
      >
        <label for="easycredit-merchant-amount">{{ $t('Reduction by') }} </label><br>
        <input
          id="easycredit-merchant-amount"
          v-model="amount"
          name="easycredit-merchant[amount]"
          type="number"
          min="0.01"
          :max="tx.orderDetails.currentOrderValue"
          value="0"
        > € / {{ $helpers.formatCurrency(tx.orderDetails.currentOrderValue) }}
      </span>
    </p>

    <p>
      <button
        type="button"
        class="set_merchant_status"
        :disabled="loading || !status"
        @click="updateTransaction"
      >
        Senden
      </button>
    </p>
  </div>
</template>

<script>
import config from '../../config.js'
import store from '../../store'
import i18n from '../../de_DE.js'

export default {
  props: {
    tx: Object
  },
  data () {
    return {
      id: this.tx.transactionId,
      status: this.tx.bookings.filter(b => b.type === 'CAPTURE').length ? 'CAPTURE' : '',
      date: new Date(Date.now()).toLocaleString().split(',')[0].split('/').reverse().join('-'),
      amount: 0.01,
      loading: false,
      trackingNumber: '',
      refundReason: ''
    }
  },
  computed: {
    canShowAmount () {
      return ['REVOCATION_PARTIAL', 'REDUCTION_GUARANTEE_WARRANTY'].includes(this.refundReason)
    },
    canShip () {
      return !this.tx.bookings.filter(b => b.type === 'CAPTURE').length
    },
    canRefund () {
      return this.tx.orderDetails.currentOrderValue > 0
    },
    refundReasons () {
      return {
        REVOCATION_FULL: this.$t('Revocation'),
        REVOCATION_PARTIAL: this.$t('Partial Revocation'),
        REFUND_GUARANTEE_WARRANTY: this.$t('Refund (Guarantee / Warranty)'),
        REDUCTION_GUARANTEE_WARRANTY: this.$t('Reduction (Guarantee / Warranty)')
      }
    },
  },
  methods: {
    $t (key) {
      return i18n.get(key)
    },
    async updateTransaction () {
      this.loading = true
      try {
        await fetch(config.getEndpoints().post, {
          ...config.getRequestConfig(),
          ...{
            method: 'POST',
            body: JSON.stringify(this.$data)
          }
        })

        await store.dispatch('loadTransaction', this.tx.transactionId)
        this.loading = false
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
      }
    }
  }
}
</script>
