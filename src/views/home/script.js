/**
 * @file It contains the script for home page.
 */
export default {
  name: "Home",
  data() {
    return {
      numberOfCards: -1,
      possibleNumberOfCards: [4, 8, 12, 16],
      randomValues: Array(),
      sortedRandomValues: Array(),
      selectedValues: Array(),
      isGameStarted: false,
      isGameOver: false
    }
  },
  methods: {
    generateRandomValues() {
      this.reset();
      for (let i = 0; i < this.numberOfCards; i++) {
        this.randomValues.push({ value: Math.floor(Math.random() * 100) });
      }
    },
    startGame() {
      this.sortedRandomValues = this.randomValues.flatMap(element => element.value).sort((element1, element2) => (element1 - element2));
      this.isGameStarted = true;
    },
    validateOrder(element, index) {
      let isValid, textColor;
      if (this.sortedRandomValues[0] == element.value) {
        isValid = "Correct";
        textColor = "success--text";
      } else {
        isValid = "Incorrect";
        textColor = "error--text";
      }
      this.sortedRandomValues.shift(1);
      this.randomValues.splice(index, 1, { ...this.randomValues[index], selected: true, isValid, color: textColor });
      this.selectedValues.push({ value: element.value, date: new Date() });
      if (this.sortedRandomValues.length == 0) this.isGameOver = true;
    },
    reset() {
      this.randomValues = [];
      this.sortedRandomValues = [];
      this.isGameStarted = false;
    }
  }
}