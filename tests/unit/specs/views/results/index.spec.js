/**
 * @file It contains unit tests for results overview page.
 */
import { mount, createLocalVue } from "@vue/test-utils"
import Vuetify from "vuetify"
import Vuex from "vuex"
import VueRouter from "vue-router"
import ResultsPage from "@/views/results"

let wrapper

const results = [{
  value: 23,
  date: new Date("2021-04-11T19:30:00"),
  valid: "Incorrect"
}, {
  value: 1,
  date: new Date("2021-04-11T19:30:01"),
  valid: "Incorrect"
}, {
  value: 44,
  date: new Date("2021-04-11T19:30:02"),
  valid: "Correct"
}, {
  value: 45,
  date: new Date("2021-04-11T19:30:03"),
  valid: "Correct"
}]

const state = {
  userAnswers: results
}

const getters = {
  "results/userAnswers": state => state.userAnswers,
}

const mutations = {
  setUserAnswers: (state, userAnswers) => {
    state.userAnswers = userAnswers
  }
}

const router = new VueRouter()
let store

const mountResultsPage = () => {
  const localVue = createLocalVue()

  localVue.prototype.$TABLES = {
    RESULTS: {
      headers: [{
        text: "Value",
        align: "left",
        value: "value",
        class: "subheading primary lighten-2 white--text subtitle-2 font-weight-bold"
      }, {
        text: "Time",
        align: "left",
        value: "selectedTime",
        class: "subheading primary lighten-2 white--text subtitle-2 font-weight-bold"
      }, {
        text: "Valid",
        align: "left",
        value: "valid",
        class: "subheading primary lighten-2 white--text subtitle-2 font-weight-bold"
      }],
      noDataText: "No data found.",
      itemsPerPage: 10,
      footer: {
        itemsPerPageOptions: [10, 20, 30],
        itemsPerPageText: "Items per page",
        showFirstLastPage: true,
        showCurrentPage: true
      }
    }
  }
  localVue.prototype.$CONSTANTS = {
    GAME_RESULTS: {
      CORRECT: "Correct",
      INCORRECT: "Incorrect"
    },
    LABELS: {
      PLAY_AGAIN: "Play again"
    }
  }
  localVue.use(Vuex)
  localVue.use(Vuetify)
  localVue.use(VueRouter)

  const vuetify = new Vuetify()

  store = new Vuex.Store({
    state,
    getters,
    mutations
  })

  wrapper = mount(ResultsPage, {
    sync: false,
    localVue,
    store,
    router,
    vuetify
  })
}

const resultsTable = () => wrapper.findComponent({ ref: "table_results" })
const playAgain = () => wrapper.findComponent({ ref: "button_play_again" })

describe("results page", () => {
  beforeEach(() => {
    mountResultsPage()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("renders the results page", () => {
    expect(wrapper).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("compute all computed properties correctly", () => {
    expect(wrapper.vm.resultsForTable).toEqual([{
      value: 23,
      selectedTime: new Date("2021-04-11T19:30:00").toLocaleString(),
      valid: "Incorrect"
    }, {
      value: 1,
      selectedTime: new Date("2021-04-11T19:30:01").toLocaleString(),
      valid: "Incorrect"
    }, {
      value: 44,
      selectedTime: new Date("2021-04-11T19:30:02").toLocaleString(),
      valid: "Correct"
    }, {
      value: 45,
      selectedTime: new Date("2021-04-11T19:30:03").toLocaleString(),
      valid: "Correct"
    }])

    expect(wrapper.vm.headersForTable).toEqual([{
      align: "left",
      class: "subheading primary lighten-2 white--text subtitle-2 font-weight-bold",
      text: "Value",
      value: "value"
    }, {
      align: "left",
      class: "subheading primary lighten-2 white--text subtitle-2 font-weight-bold",
      text: "Time",
      value: "selectedTime"
    }, {
      align: "left",
      class: "subheading primary lighten-2 white--text subtitle-2 font-weight-bold",
      text: "Valid",
      value: "valid"
    }])
    expect(wrapper.vm.footersForTable).toEqual({
      itemsPerPageOptions: [10, 20, 30],
      itemsPerPageText: "Items per page",
      showCurrentPage: true,
      showFirstLastPage: true
    })
    expect(wrapper.vm.resultMessage).toEqual("You've answered 50% of questions correctly! Review your response")

    store.commit("setUserAnswers", [{
      value: 1,
      date: Date("2021-04-11T19:30:00"),
      valid: "Correct"
    }, {
      value: 23,
      date: Date("2021-04-11T19:30:01"),
      valid: "Correct"
    }, {
      value: 44,
      date: Date("2021-04-11T19:30:02"),
      valid: "Correct"
    }, {
      value: 45,
      date: Date("2021-04-11T19:30:03"),
      valid: "Correct"
    }, {
      value: 46,
      date: Date("2021-04-11T19:30:02"),
      valid: "Correct"
    }, {
      value: 47,
      date: Date("2021-04-11T19:30:03"),
      valid: "Correct"
    }, {
      value: 50,
      date: Date("2021-04-11T19:30:03"),
      valid: "Incorrect"
    }, {
      value: 48,
      date: Date("2021-04-11T19:30:03"),
      valid: "Incorrect"
    }])
    expect(wrapper.vm.resultMessage).toEqual("Good attempt. You've answered 75% of questions correctly! Review your response")

    store.commit("setUserAnswers", [{
      value: 1,
      date: Date("2021-04-11T19:30:00"),
      valid: "Correct"
    }, {
      value: 23,
      date: Date("2021-04-11T19:30:01"),
      valid: "Correct"
    }, {
      value: 44,
      date: Date("2021-04-11T19:30:02"),
      valid: "Correct"
    }, {
      value: 45,
      date: Date("2021-04-11T19:30:03"),
      valid: "Correct"
    }])
    expect(wrapper.vm.resultMessage).toEqual("Congratulations. You've won the game!")
  })

  it("renders results table correctly", async () => {
    expect(resultsTable().exists()).toBeTruthy()

    const tableHeaders = resultsTable().findAll("thead tr th")

    expect(tableHeaders.at(0).exists()).toBeTruthy()
    expect(tableHeaders.at(0).text()).toContain("Value")
    expect(tableHeaders.at(1).exists()).toBeTruthy()
    expect(tableHeaders.at(1).text()).toContain("Time")
    expect(tableHeaders.at(2).exists()).toBeTruthy()
    expect(tableHeaders.at(2).text()).toContain("Valid")

    const tableRows = resultsTable().findAll("tbody tr")

    for (const iterator in results) {
      const row = tableRows.at(iterator)

      expect(row.exists()).toBeTruthy()

      const cells = row.findAll("td")

      expect(cells.at(0).exists()).toBeTruthy()
      expect(cells.at(0).text()).toContain(wrapper.vm.resultsForTable[iterator].value)
      expect(cells.at(1).exists()).toBeTruthy()
      expect(cells.at(1).text()).toContain(wrapper.vm.resultsForTable[iterator].selectedTime)
      expect(cells.at(2).exists()).toBeTruthy()
      expect(cells.at(2).text()).toContain(wrapper.vm.resultsForTable[iterator].valid)
    }
  })

  it("navigates to home page, on clicking play again button", async () => {
    VueRouter.prototype.replace = jest.fn()
    playAgain().trigger("click")
    await wrapper.vm.$nextTick()

    expect(router.replace).toBeCalledWith("/")
  })
})