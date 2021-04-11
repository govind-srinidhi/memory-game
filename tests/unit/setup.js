/**
 * @file This is the entry file for jest unit tests.
 * All the pre-requisites for the tests should be loaded/mocked here.
 */
 import Vue from "vue"
 import Vuetify from "vuetify"
 
 Vue.use(Vuetify)
 
 Vue.config.productionTip = false
 const app = document.createElement("div")
 app.setAttribute("data-app", true)
 document.body.append(app)
 