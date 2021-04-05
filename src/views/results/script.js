/**
 * @file It contains scripts for results page.
 */

 import { mapGetters } from "vuex"
 export default {
  name: "Results",
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters({
      userAnswers: "results/userAnswers"
    }),
    resultMessage() {
      let numberOfCorrectEntries = 0
      this.userAnswers.forEach((element) => {
        if (element.valid === this.$CONSTANTS.GAME_RESULTS.CORRECT) numberOfCorrectEntries++ 
      })
      let averageRightAnswers = Math.round(numberOfCorrectEntries * 100 / this.userAnswers.length)
      if (averageRightAnswers <= 60) {
        return "You've answered " + averageRightAnswers + "% of questions correctly! Review your response"
      } else if (averageRightAnswers <= 99) {
        return "Good attempt. You've answered " + averageRightAnswers + "% of questions correctly! Review your response"
      } else {
        return "Congratulations. You've won the game!"
      }
    },
    resultsForTable() {
      return this.userAnswers.map(userAnswer => {
        return {
          value       : userAnswer.value,
          selectedTime: userAnswer.date.toLocaleString(),
          valid       : userAnswer.valid
        }
      })
    },
    headersForTable() {   
      return this.$TABLES.RESULTS.headers.map(header => {
        return {
          ...header, ...{
            text: header.text
          }
        }
      })
    },
    footersForTable() {
      return {
        ...this.$TABLES.RESULTS.footer, ...{
          itemsPerPageText: this.$TABLES.RESULTS.footer.itemsPerPageText
        }
      }
    }
  }
}