<template>
  <h1>Detail</h1>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>

<script>
import EventRequest from '@/requests/EventRequest.js'

export default {
  name: 'EventDetail',
  props: ['id'],
  data() {
    return { event: null }
  },
  created() {
    EventRequest.getDetailEvent(this.id)
                .then(response => {
                  this.event = response.data
                })
                .catch(e => {
                  alert(e)
                })
  }
}
</script>

<style scoped>
.event-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}

.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
</style>
