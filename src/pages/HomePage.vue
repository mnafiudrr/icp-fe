<template>
  <div class="text-center">
    Home Screen
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import { GET_USER_TOKEN_DATA_GETTER } from "@/store/storeconstants";

export default {
  name: 'HomePage',
  computed: {
    ...mapGetters('auth', {
      token: GET_USER_TOKEN_DATA_GETTER
    }),
  },
  data() {
    return {
    }
  },
  mounted() {
    axios.get('http://103.163.161.18:8765/api/project', { headers: { Authorization: this.token } }).then((res) => {
      console.log(res)
    })
  }
}
</script>