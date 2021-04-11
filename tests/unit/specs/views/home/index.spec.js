/**
 * @file It contains unit tests for home page.
 */
import { mount, createLocalVue } from "@vue/test-utils"
import Vuetify from "vuetify"
import Vuex from "vuex"
import VueRouter from "vue-router"
import HomePage from "@/views/home"

let wrapper

const state = {
  userAnswers: Array()
}

const getters = {
  "results/userAnswers": state => state.userAnswers,
}

const mutations = {
  "results/pushUserAnswer": (state, userAnswer) => {
    state.userAnswers.push(userAnswer)
  }
}

const router = new VueRouter()

const mountHomePage = () => {
  const localVue = createLocalVue()

  localVue.use(Vuex)
  localVue.use(Vuetify)
  localVue.use(VueRouter)

  localVue.prototype.$CONSTANTS = {
    LABELS: {
      NUMBER_OF_CARDS: "Number of cards",
      PLAY: "Play"
    },
    GAME_RESULTS: {
      CORRECT: "Correct",
      INCORRECT: "Incorrect"
    }
  }

  const vuetify = new Vuetify()

  const store = new Vuex.Store({
    state,
    getters,
    mutations
  })

  wrapper = mount(HomePage, {
    sync: false,
    localVue,
    store,
    router,
    vuetify
  })
}

const cardsRow = () => wrapper.findComponent({ ref: "row_random_values" })
const playGameButton = () => wrapper.findComponent({ ref: "button_play_game" })

describe("home page", () => {
  beforeEach(() => {
    VueRouter.prototype.replace = jest.fn()
    mountHomePage()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("renders the home page", () => {
    expect(wrapper).toBeTruthy()
  })

  it("renders elements correctly", async () => {
    expect(wrapper.findAll("#select_cards").at(0).exists()).toBeTruthy()
    expect(playGameButton().exists()).toBeTruthy()
  })

  it("generates random values same as the number of cards selected in dropdown", async () => {
    const numberOfCards = 4
    const input = wrapper.findAll("#select_cards").at(0)
    input.element.value = numberOfCards
    input.trigger("input")
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.randomValues.length).toBe(numberOfCards)
    expect(wrapper.vm.isGameStarted).toEqual(false)
  })

  it("shows random values generated on each of the card until user clicks play button", async () => {
    const numberOfCards = 4
    const input = wrapper.findAll("#select_cards").at(0)
    input.element.value = numberOfCards
    input.trigger("input")
    await wrapper.vm.$nextTick()
    const randomValues = wrapper.vm.randomValues
    const cardColumns = cardsRow().findAll(".col")
    for (var i = 0; i < cardColumns.length; i++) {
      expect(parseInt(cardColumns.at(i).find("span").text())).toEqual(randomValues[i].value)
    }
  })

  it("the cards should become blank, once user clicks on play button", async () => {
    const numberOfCards = 4
    const input = wrapper.findAll("#select_cards").at(0)
    input.element.value = numberOfCards
    input.trigger("input")
    await wrapper.vm.$nextTick()
    playGameButton().trigger("click")
    await wrapper.vm.$nextTick()
    const randomValues = wrapper.vm.randomValues
    const cardColumns = cardsRow().findAll(".col")
    expect(cardColumns.length).toEqual(randomValues.length)
    for (var i = 0; i < cardColumns.length; i++) {
      expect(cardColumns.at(i).find("span").exists()).toBe(false)
    }
  })

  it("as user clicks on each of the cards, need to validate, if the order followed is correct/incorrect and navigate to results", async () => {
    const numberOfCards = 4
    const input = wrapper.findAll("#select_cards").at(0)
    input.element.value = numberOfCards
    input.trigger("input")
    await wrapper.vm.$nextTick()
    playGameButton().trigger("click")
    await wrapper.vm.$nextTick()
    const sortedRandomValues = wrapper.vm.sortedRandomValues
    const cardColumns = cardsRow().findAll(".col")
    for (var i = 0; i < cardColumns.length; i++) {
      const card = cardColumns.at(i).find(".v-card")
      card.trigger("click")
      await wrapper.vm.$nextTick()
      if (sortedRandomValues[i] == cardColumns.at(i).find("span").text()) {
        expect(card.find(".validation-message").classes()).toContain("success--text")
      } else {
        expect(card.find(".validation-message").classes()).toContain("error--text")
      }
    }
    expect(router.replace).toBeCalledWith("results")
  })

  it("matches the default snapshot", async () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})