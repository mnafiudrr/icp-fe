import { createStore } from "vuex";
import auth from "./modules/auth";
import { SET_LOADING_MUTATION } from "@/store/storeconstants";

const store = createStore({
  modules: {
    auth,
  },
  state() {
    return {
      showLoading: false,
    }
  },
  mutations: {
    [SET_LOADING_MUTATION](state, payload) {
      state.showLoading = payload
    }
  }
})

export default store;