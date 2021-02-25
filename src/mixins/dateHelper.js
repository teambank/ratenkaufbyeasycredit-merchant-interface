module.exports = {
  methods: {
    daysSinceOrder (date) {
      const ymd = this.date.split('-')

      const dateOrder = new Date(ymd[0], ymd[1] - 1, ymd[2])
      const dateNow = new Date()

      const diff = Math.floor((dateNow - dateOrder) / (1000 * 60 * 60 * 24))
      return diff
    }
  }
}
