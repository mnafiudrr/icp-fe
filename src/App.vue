<template>
  <TheLoader v-if="showLoading" />
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div>
          <router-view>
          </router-view>
        </div>
      </div>
    </div>
  </div>
  <div>
  </div>
</template>

<script>
import TheLoader from '@/components/TheLoader.vue'
import { mapState } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapState({
      showLoading: state => state.showLoading
    }),
  },
  components: {
    TheLoader,
  }
}
</script>
