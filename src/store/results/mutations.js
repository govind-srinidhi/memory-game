/**
 * @file It contains vuex game-results module mutations to mutate the state variables.
 */
 export default {
  pushUserAnswer: (state, userAnswer) => {
    state.userAnswers.push(userAnswer)
  },
  setUserAnswers: (state, userAnswers) => {
    state.userAnswers = userAnswers
  }
}