<template>
  <AddProjectModal :hideModal="hideProjectModal" v-if="projectModal" />
  <AddTicketModal :hideModal="hideTicketModal" v-if="ticketModal" :onSuccess="loadData" />
  <h2 class="text-center mt-3">
    Ticketing
  </h2>
  <div class="text-center">
    <button type="button" class="btn btn-primary me-3" data-bs-toggle="modal" data-bs-target="#addProjectModal"
      @click="showProjectModal()">
      New Project
    </button>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addTicketModal"
      @click="showTicketModal()">
      New Ticket
    </button>
  </div>
  <div class="row">
    <div class="col-2"></div>
    <div class="col-8">
      <div class="row mt-5">
        <div class="col-6">
          <div class="mb-3">
            <button type="button" class="btn btn-primary">To Do</button>{{ todos.length }}
          </div>
          <TicketCard v-for="todo in todos" :key="todo.id" :title="todo.project.name + ' - ' + todo.title"
            :description="todo.description" :data="[
              {label: 'Type', value: todo.type},
              {label: 'Label', value: todo.label},
              {label: 'Assigned To', value: todo.assigned_to.map(item => item.name)}
            ]" />
        </div>
        <div class="col-6">
          <button type="button" class="btn btn-primary mb-3">Doing</button> {{ doings.length }}
          <TicketCard v-for="doing in doings" :key="doing.id" :title="doing.project.name + ' - ' + doing.title"
            :description="doing.description" :data="[
              { label: 'Type', value: doing.type },
              { label: 'Label', value: doing.label },
              { label: 'Assigned To', value: doing.assigned_to.map(item => item.name) }
            ]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import AddProjectModal from '@/components/AddProjectModal.vue'
import AddTicketModal from '@/components/AddTicketModal.vue'
import TicketCard from '@/components/TicketCard.vue'
import axios from 'axios'

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
      projectModal: false,
      ticketModal: false,
      todos: [],
      doings: [],
    }
  },
  components: {
    AddProjectModal,
    AddTicketModal,
    TicketCard,
  },
  mounted() {
    this.loadData()
  },
  methods: {
    showProjectModal() {
      this.projectModal = true
    },
    hideProjectModal() {
      this.projectModal = false
    },
    showTicketModal() {
      this.ticketModal = true
    },
    hideTicketModal() {
      this.ticketModal = false
    },
    loadData() {
      axios.get('http://103.163.161.18:8765/api/ticket-sort', { headers: { Authorization: this.token } }).then((res) => {
        res.data.data.forEach((item) => {
          if (item.label === 'To Do'){
            this.todos = item.tickets
          } else {
            this.doings = item.tickets
          }
          console.log(item.tickets[0]);
        })
      })
    },
  }
}
</script>