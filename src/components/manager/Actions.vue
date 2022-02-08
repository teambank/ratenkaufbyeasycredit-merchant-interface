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

    <div 
      v-if="error" 
      class="easycredit-tx-alert error"
    >
      {{ error }}  
    </div>
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
      id: this.tx.vorgangskennungFachlich,
      status: this.tx.lieferdatum === null ? 'LIEFERUNG' : '',
      amount: 0.01,
      loading: false,
      error: null
    }
  },
  computed: {
    canShowAmount () {
      return this.status === 'WIDERRUF_TEILWEISE' ||
        this.status === 'MINDERUNG_GARANTIE_GEWAEHRLEISTUNG'
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
      this.error = null

      try {
        await fetch(config.getEndpoints().post, {
          ...config.getRequestConfig(),
          ...{
            method: 'POST',
            body: JSON.stringify(this.$data)
          }
        }).then((response) => {
          if (!response.ok) {
            return response.text().then((error) => {
              throw Error(error);
            })
          }
          return response;
        })
        await store.dispatch('loadTransaction', this.tx.vorgangskennungFachlich)
      } catch (error) {
        this.error = error.message
      }
      this.loading = false
    }
  }
}
</script>
