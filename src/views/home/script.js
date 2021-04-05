/**
 * @file It contains the script for home page.
 */

 import { mapGetters, mapMutations } from "vuex"

export default {
  name: "Home",
  data() {
    return {
      numberOfCards: -1,
      possibleNumberOfCards: [4, 8, 12, 16],
      randomValues: Array(),
      sortedRandomValues: Array(),
      isGameStarted: false,
      numberOfItemsProcessed: 0
    }
  },
  computed: {
    ...mapGetters({
      userAnswers: "results/userAnswers"
    })
  },
  methods: {
    ...mapMutations({
      pushUserAnswer: "results/pushUserAnswer"
    }),
    generateRandomValues() {
      this.reset()
      for (let i = 0; i < this.numberOfCards; i++) {
        this.randomValues.push({ value: Math.floor(Math.random() * 100) })
      }
    },
    startGame() {
      this.sortedRandomValues = this.randomValues.flatMap(element => element.value).sort((element1, element2) => (element1 - element2))
      this.isGameStarted = true
    },
    validateOrder(element, index) {
      let valid, color
      if (this.sortedRandomValues[this.numberOfItemsProcessed++] == element.value) {
        valid = this.$CONSTANTS.GAME_RESULTS.CORRECT
        color = "success--text"
      } else {
        valid = this.$CONSTANTS.GAME_RESULTS.INCORRECT
        color = "error--text"
      }
      this.randomValues.splice(index, 1, { ...this.randomValues[index], selected: true, valid, color })
      this.pushUserAnswer({ value: element.value, date: new Date(), valid })
    },
    reset() {
      this.randomValues = []
      this.sortedRandomValues = []
      this.isGameStarted = false
    }
  },

  watch: {
    userAnswers: {
      handler: function(value) {
        if (value.length === this.randomValues.length) {
          this.$router.replace("results")
        }
      }
    }
  }

}