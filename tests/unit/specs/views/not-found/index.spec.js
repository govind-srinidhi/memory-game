/**
 * @file It contains unit tests for not found.
 */
import { mount, createLocalVue } from "@vue/test-utils"
import Vuetify from "vuetify"
import NotFoundPage from "@/views/not-found"

let wrapper

const mountNotFoundPage = () => {
  const localVue = createLocalVue()

  localVue.use(Vuetify)

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

  wrapper = mount(NotFoundPage, {
    sync: false,
    localVue,
    vuetify
  })
}

const notFoundImage = () => wrapper.findComponent({ ref: "image_not_found" })
const notFoundHeader = () => wrapper.find(".not-found-header")

describe("home page", () => {
  beforeEach(() => {
    mountNotFoundPage()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("renders the not found page", () => {
    expect(wrapper).toBeTruthy()
  })

  it("renders elements correctly", async () => {
    expect(notFoundImage().exists()).toBeTruthy()
    expect(notFoundHeader().exists()).toBeTruthy()
  })

  it("matches the default snapshot", async () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})