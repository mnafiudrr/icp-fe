import { SET_USER_TOKEN_DATA_MUTATION } from "@/store/storeconstants";

export default {
  [SET_USER_TOKEN_DATA_MUTATION](state, payload) {
    state.token = payload.token
    state.id = payload.id
    state.name = payload.name
    state.email = payload.email
  }
}