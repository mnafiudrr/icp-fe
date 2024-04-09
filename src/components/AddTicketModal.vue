<template>
  <!-- Modal -->
  <div class="modal fade show" id="addTicketModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
    style="display: block;">
    <div class="modal-dialog">
      <div class="modal-content">
        <form @submit.prevent="onSubmit()" class="needs-validation">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Add New Ticket</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <input type="text" class="form-control" placeholder="title" v-model="title"
                v-bind:class="(errors.title) ? 'is-invalid' : ''">
            </div>
            <div class="mb-3">
              <select class="form-select form-select-sm" aria-label="Small select example" v-model="type"
                v-bind:class="(errors.type) ? 'is-invalid' : ''">
                <option selected>Select Type</option>
                <option value="task">task</option>
                <option value="bug">bug</option>
              </select>
            </div>
            <div class="mb-3">
              <select class="form-select form-select-sm" aria-label="Small select example" v-model="assigned_to"
                v-bind:class="(errors.assigned_to) ? 'is-invalid' : ''">
                <option selected>Select User</option>
                <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
              </select>
            </div>
            <div class="mb-3">
              <textarea class="form-control" placeholder="description" v-model="description"
                v-bind:class="(errors.description) ? 'is-invalid' : ''"></textarea>
            </div>
            <div class="mb-3">
              <select class="form-select form-select-sm" aria-label="Small select example" v-model="label"
                v-bind:class="(errors.label) ? 'is-invalid' : ''">
                <option selected>Select label</option>
                <option value="To Do">To Do</option>
                <option value="Doing">Doing</option>
              </select>
            </div>
            <div class="mb-3">
              <select class="form-select form-select-sm" aria-label="Small select example" v-model="project_id"
                v-bind:class="(errors.project_id) ? 'is-invalid' : ''">
                <option selected>Select project</option>
                <option v-for="project in projects" :key="project.id" :value="project.id">{{ project.name }}</option>
              </select>
            </div>
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
  name: 'AddTicketModal',
  data() {
    return {
      title:'',
      type:'',
      description:'',
      label:'',
      project_id:'',
      assigned_to: [],
      errors: [],
      users: [],
      projects: [],
    }
  },
  computed: {
    ...mapGetters('auth', {
      token: GET_USER_TOKEN_DATA_GETTER
    }),
  },
  mounted() {
    axios.get('http://103.163.161.18:8765/api/reference-data?type=user', { headers: { Authorization: this.token } }).then((res) => {
      this.users = res.data.data;
    })
    axios.get('http://103.163.161.18:8765/api/reference-data?type=project', { headers: { Authorization: this.token } }).then((res) => {
      this.projects = res.data.data;
    })
  },
  props: {
    showModal: Boolean,
    hideModal: Function,
    onSuccess: Function,
  },
  methods: {
    async onSubmit() {
      const project = {
        title: this.title,
        type: this.type,
        description: this.description,
        label: this.label,
        project_id: this.project_id,
        assigned_to: [this.assigned_to]
      }
      try {
        await axios.post('http://103.163.161.18:8765/api/ticket', project, { headers: { Authorization: this.token } })
        this.hideModal()
        this.onSuccess()
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