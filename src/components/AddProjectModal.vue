<template>
  <!-- Modal -->
  <div class="modal fade show" id="addProjectModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
    style="display: block;">
    <div class="modal-dialog">
      <div class="modal-content">
        <form @submit.prevent="onSubmit()" class="needs-validation">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Add New Project</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <input type="text" class="form-control" placeholder="name" v-model="name" v-bind:class="(errors.name)?'is-invalid':''">
              </div>
              <div class="mb-3">
                <textarea class="form-control" placeholder="description" v-model="description" v-bind:class="(errors.description)?'is-invalid':''"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="hideModal">Close</button>
            <button type="submit" class="btn btn-primary">Create</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex';
import { GET_USER_TOKEN_DATA_GETTER } from "@/store/storeconstants";

export default {
  name: 'AddProjectModal',
  data() {
    return {
      name: '',
      description: '', 
      errors: {
        name: '',
        description: '',
      },
    }
  },
  computed: {
    ...mapGetters('auth', {
      token: GET_USER_TOKEN_DATA_GETTER
    }),
  },
  props: {
    showModal: Boolean,
    hideModal: Function,
  },
  methods: {
    async onSubmit() {
      const project = {
        name: this.name,
        description: this.description,
      }
      try {
        let response = await axios.post('http://103.163.161.18:8765/api/project', project, { headers: { Authorization: this.token } })

        if (response.data.status == 'success')
          this.hideModal()

      } catch (error) {
        if (error.response.data) {
          for (let key in error.response.data.errors) {
            this.errors[key] = error.response.data.errors[key][0];
          }
        }
      }
    } 
  }
}
</script>