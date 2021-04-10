/**
 * @file It exports a method that should be executed before changing routes.
 */
 import store from "@/plugins/vuex"

export default async (to, from, next) => {
  console.log(to.name)
  let newRoute
  if (to.name === "home") {
    newRoute = beforeHome()
  } else if (to.name === "results") {
    newRoute = beforeResults(from)
  }
  newRoute ? next(newRoute) : next()
}

/**
 * This method will be called before navigating to home page.
 */
const beforeHome = () => {
  store.commit("results/setUserAnswers", [])
}

/**
 * This method will be called before navigating to results page.
 * @param {*} from route from where navigation was triggered.
 */
 const beforeResults = (from) => {
   const userAnswers = store.getters["results/userAnswers"]
   if (from.name === "home" && userAnswers?.length > 0) {
     return
   } else {
     return {
       name: "home"
     }
   }
}

