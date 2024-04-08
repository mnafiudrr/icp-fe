import actions from "./actions"
import getters from "./getters"
import mutations from "./mutations"

export default {
  namespaced: true,
  state() {
    return {
      name: 'State Nafiu',
    }
  },
  actions,
  getters,
  mutations,
}