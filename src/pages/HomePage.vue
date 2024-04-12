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
            <button type="button" class="btn btn-primary">To Do</button> {{ todos.length }}
          </div>
          <draggable :list="todos" group="tickets" :disabled="false" item-key="name" class="list-group pb-5"
            ghost-class="ghost" @start="true" @end="false" @change="log">
            <template #item="{ element }">
              <div>
                <TicketCard :title="element.project.name + ' - ' + element.title" :description="element.description"
                  :data="[
                { label: 'Type', value: element.type },
                { label: 'Label', value: element.label },
                { label: 'Assigned To', value: element.assigned_to.map(item => item.name) }
              ]" />
              </div>
            </template>
          </draggable>
        </div>
        <div class="col-6">
          <div class="mb-3">
            <button type="button" class="btn btn-primary">Doing</button> {{ doings.length }}
          </div>
            <draggable :list="doings" group="tickets" :disabled="false" item-key="name" class="list-group pb-5"
              ghost-class="ghost" @start="true" @end="false" @change="log">
              <template #item="{ element }">
                <div>
                  <TicketCard :title="element.project.name + ' - ' + element.title" :description="element.description"
                    :data="[
                    { label: 'Type', value: element.type },
                    { label: 'Label', value: element.label },
                    { label: 'Assigned To', value: element.assigned_to.map(item => item.name) }
                  ]" />
                </div>
              </template>
            </draggable>
          </div>
        </div>
        <rawDisplayer class="col-3" :value="todos" title="List 1" />
        <rawDisplayer class="col-3" :value="doings" title="List 2" />
      </div>
    </div>
</template>

<script>

import AddProjectModal from '@/components/AddProjectModal.vue'
import AddTicketModal from '@/components/AddTicketModal.vue'
import draggable from 'vuedraggable'
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
    draggable,
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
      if (!this.token){
        this.$router.push('/login');
        return
      }
      axios.get('http://103.163.161.18:8765/api/ticket-sort', { headers: { Authorization: this.token } }).then((res) => {
        res.data.data.forEach((item) => {
          var tickets = Object.keys(item.tickets).map((key) => item.tickets[key]);
          if (item.label === 'To Do'){
            this.todos = tickets
          } else {
            this.doings = tickets
          }
        })
      })
    },
    log: function (evt) {
      window.console.log(evt);


      let label = 'Doing';
      let tickets = this.doings.map(item => item.id)

      if (this.doings.length === 0) {
        label = 'To Do';
        tickets = this.todos.map(item => item.id)
      }
      try {
        axios.post(
            'http://103.163.161.18:8765/api/ticket-sort', 
            { 
              label,
              tickets
            },
            { headers: { Authorization: this.token } })
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>