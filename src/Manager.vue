<template>
  <div :class="(isLoading) ? 'easycredit-tx-manager loading' : 'easycredit-tx-manager'">
    <Progress :tx="tx" v-if="tx" />
    <Actions :tx="tx" v-if="tx" />

    <span v-if="!tx && daysSinceOrder(date) >= 1">
      Die Transaktion <strong>{{ id }}</strong> ist nicht vorhanden. Bitte loggen Sie sich im <a href="https://app.easycredit.de">Händlerinterface</a> ein oder kontaktieren Sie unseren Support.
    </span>
    <span v-else-if="!tx">
      Die Transaktion <strong>{{ id }}</strong> ist noch nicht verfügbar. Es kann bis zu einem Tag dauern bis die Transaktion angezeigt wird.
    </span>
  </div>
</template>

<script>
import Progress from './components/manager/Progress'
import Actions from './components/manager/Actions'

import { mapGetters } from 'vuex'
import daysSinceOrder from './mixins/dateHelper'

export default {
  props: ['id', 'date'],
  mixins: [daysSinceOrder],
  components: {
    Progress,
    Actions
  },
  beforeMount () {
    this.$eventHub.$emit('add-transaction', this.id)
  },
  computed: {
    ...mapGetters(['transaction', 'isLoading']),
    tx () {
      return this.transaction(this.id)
    }
  }
}
</script>
