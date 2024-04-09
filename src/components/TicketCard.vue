<template>
  <div class="row mb-1">
    <div class="col-md-12">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">{{ title }}</h5>
          <p class="card-text">{{  }}</p>
          <div class="row" v-for="content in data" :key="content.label">
            <div class="col-4">
              <span>{{ content.label }}</span>
            </div>
            <div class="col-8">
              :
              <span v-if="Array.isArray(content.value)">{{ content.value.join(', ') }}</span>
              <span v-if="typeof content.value === 'string'">{{ content.value }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TicketCard',
  props: {
    title: String,
    description: String,
    data: Array,
  }
}
</script>