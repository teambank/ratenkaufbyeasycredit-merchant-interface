export default {
  fetchList (state, data) {
    state.transactions = data
  },
  fetchSingle (state, { data, id }) {
    state.transactions = state.transactions.filter((t) => t !== null).map((transaction) => {
      return (transaction.vorgangskennungFachlich === id) ? data : transaction
    })
  },
  loading (state, loading) {
    state.loading = loading
  }
}
