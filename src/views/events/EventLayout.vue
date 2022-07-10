<template>
  <div v-if="eventStore.currentEvent">
    <div id="nav">
      <router-link :to="{ name: 'EventDetail' }" >Detail</router-link>
      <router-link :to="{ name: 'EventRegister' }" >Register</router-link> |
      <router-link :to="{ name: 'EventEdit' }" >Edit</router-link>
    </div>

    <router-view :event="eventStore.currentEvent"></router-view>
  </div>
</template>

<script>
import { useEventStore } from '@/store/storage/EventStore'

export default {
  name: 'EventDetail',
  props: ['id'],
  setup() {
    const eventStore = useEventStore()
    return { eventStore }
  },
  created() {
    this.eventStore.fetchEvent(this.id)
      .catch(e => {
        this.$router.push({ name: 'ErrorDisplay', params: { error: e } })
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

#nav a {
  display: inline-block;
  padding: 0 5px;
  color: #39495c
}
</style>
