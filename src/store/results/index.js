/**
 * @file It exports a vuex module for game results.
 */
 import state from "./state"
 import getters from "./getters"
 import mutations from "./mutations"
 import actions from "./actions"
 
 export default {
   namespaced: true,
   state,
   getters,
   mutations,
   actions
 }
 