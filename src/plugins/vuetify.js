import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

export default new Vuetify({
  themes: {
    light: {
      primary: {
        base    : "#1565C0",
        darken1 : "#014EA3",
        darken2 : "#03378A",
        darken4 : "#04005C",
        lighten1: "#437EDB",
        lighten3: "#57aff5",
        lighten5: "#BFEAFF"
      }
    }
  }
})
