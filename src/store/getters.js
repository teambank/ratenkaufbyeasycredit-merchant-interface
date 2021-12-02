export default {
  transaction (state) {
    return (id) => {
      return state.transactions.find(obj => obj && obj.transactionId === id)
    }
  },
  transactions (state) {
    return state.transactions
  },
  isLoading (state) {
    return state.loading
  }
}
