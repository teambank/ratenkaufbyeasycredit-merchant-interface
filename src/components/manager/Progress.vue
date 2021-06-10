<template>
  <div class="transaction-info">
    <p>
      <strong>{{ $t('Customer') }}:</strong> {{ tx.kundeVorname }} {{ tx.kundeNachname }}<br>
      <strong>{{ $t('Customer No') }}:</strong> {{ tx.kundennummer }}<br>
      <strong>{{ $t('Credit Account No') }}:</strong> {{ tx.kreditkontonummer }}<br>
      <strong>{{ $t('Transaction Id') }}:</strong> {{ tx.vorgangskennungFachlich }}<br>
      <strong>{{ $t('Order Amount') }}:</strong> {{ tx.bestellwertAktuell }} / {{ tx.bestellwertUrspruenglich }}<br>
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
  props: ['tx'],
  computed: {
    progressFields () {
      return [{
        label: this.$t('Order'),
        value: this.tx.bestelldatum
      }, {
        label: this.$t('Shipping'),
        value: this.tx.lieferdatum
      }, {
        label: this.$t('Clearing'),
        value: this.tx.abrechnungsdatum
      }, {
        label: this.$t('Reversal'),
        value: this.tx.rueckabwicklungsdatum
      }]
    }
  },
  methods: {
    $t (key) {
      return i18n.get(key)
    }
  }
}
</script>
