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
        <optgroup
          v-if="canShip"
          :label="$t('Shipping')"
        >
          <option value="LIEFERUNG">
            {{ $t('Shipping') }}
          </option>
        </optgroup>
        <optgroup
          v-if="canRefund"
          :label="$t('Reversal')"
        >
          <option value="WIDERRUF_VOLLSTAENDIG">
            {{ $t('Cancelled (completely)') }}
          </option>
          <option value="WIDERRUF_TEILWEISE">
            {{ $t('Cancelled (partially)') }}
          </option>
          <option value="RUECKGABE_GARANTIE_GEWAEHRLEISTUNG">
            {{ $t('Return (Warranty)') }}
          </option>
          <option value="MINDERUNG_GARANTIE_GEWAEHRLEISTUNG">
            {{ $t('Abatement (Warranty)') }}
          </option>
        </optgroup>
      </select>
    </p>

    <p
      v-if="canShowAmount"
      class="amount"
    >
      <label for="easycredit-merchant-amount">Minderung um </label><br>
      <input
        id="easycredit-merchant-amount"
        v-model="amount"
        name="easycredit-merchant[amount]"
        type="number"
        min="0.01"
        :max="tx.bestellwertAktuell"
        value="0"
      > EUR
    </p>

    <p class="date">
      <input
        v-model="date"
        for="easycredit-merchant-date"
        name="easycredit-merchant[date]"
        type="date"
        class="date"
        :disabled="!canEditDate"
      >
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
      id: this.tx.vorgangskennungFachlich,
      status: this.tx.lieferdatum === null ? 'LIEFERUNG' : '',
      date: new Date(Date.now()).toLocaleString().split(',')[0].split('/').reverse().join('-'),
      amount: 0.01,
      loading: false
    }
  },
  computed: {
    canShowAmount () {
      return this.status === 'WIDERRUF_TEILWEISE' ||
        this.status === 'MINDERUNG_GARANTIE_GEWAEHRLEISTUNG'
    },
    canEditDate () {
      return this.status !== 'LIEFERUNG'
    },
    canShip () {
      return this.tx.lieferdatum === null
    },
    canRefund () {
      return this.tx.bestellwertAktuell > 0
    }
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
        await store.dispatch('loadTransaction', this.tx.vorgangskennungFachlich)
        this.loading = false
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
      }
    }
  }
}
</script>
