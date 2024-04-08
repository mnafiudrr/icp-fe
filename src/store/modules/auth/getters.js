import { GET_USER_TOKEN_DATA_GETTER } from "@/store/storeconstants";

export default {
  [GET_USER_TOKEN_DATA_GETTER](state) {
    return state.token
  }
}