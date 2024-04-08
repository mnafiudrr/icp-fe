import { REGISTER_ACTION, LOGIN_ACTION, SET_USER_TOKEN_DATA_MUTATION, SET_LOADING_MUTATION } from "@/store/storeconstants";
import axios from 'axios';

export default {
  async [REGISTER_ACTION](context, payload) {
    let postData = {
      name: payload.name,
      email: payload.email,
      password: payload.password,
      password_confirmation: payload.password_confirmation
    }
    context.commit(SET_LOADING_MUTATION, true, { root: true });
    try {
      let response = await axios.post('http://103.163.161.18:8765/api/auth/register', postData);
      let data = response.data.data;

      context.commit(SET_USER_TOKEN_DATA_MUTATION, {
        token: response.data.token,
        id: data.id,
        name: data.name,
        email: data.email
      });
      context.commit(SET_LOADING_MUTATION, false, { root: true });
      return [data, false];
    } catch (error) {
      context.commit(SET_LOADING_MUTATION, false, { root: true });

      if (error.response.data) {
        return [error.response.data, true];
      }

    }

  },
  async [LOGIN_ACTION](context, payload) {
    let postData = {
      email: payload.email,
      password: payload.password,
    }
    context.commit(SET_LOADING_MUTATION, true, { root: true });
    try {
      let response = await axios.post('http://103.163.161.18:8765/api/auth/login', postData);
      let data = response.data.data;
      console.log(response);
      console.log(response.data);
      data = {
        token: `${response.data.token_type} ${response.data.access_token}`,
        id: data.id,
        name: data.name,
        email: data.email
      };
      console.log(data);
      context.commit(SET_USER_TOKEN_DATA_MUTATION, data);
      context.commit(SET_LOADING_MUTATION, false, { root: true });
      return [data, false];
    } catch (error) {
      context.commit(SET_LOADING_MUTATION, false, { root: true });
      if (error.response.data) {
        return [error.response.data, true];
      }
    }
  }
}