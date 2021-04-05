/**
 * @file It exports a vuex store instance used by this application.
 */
 import Vue from "vue"
 import Vuex from "vuex"
 import results from "@/store/results"
 
 Vue.use(Vuex)
 
 export default new Vuex.Store({
   modules: {
     results
   }
 })