export default {
  transaction (state) {
    return (id) => {
      const index = state.transactions.findIndex(obj => obj && obj.vorgangskennungFachlich === id)
      return state.transactions[index]
    }
  },
  transactions (state) {
    return state.transactions
  },
  isLoading (state) {
    return state.loading
  }
}
