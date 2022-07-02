<template>
  <div class="events">
    <EventCart v-for="(event, index) in events" :key="index" :event="event"/>
  </div>
</template>

<script>
import EventCart from '@/components/EventCart.vue'
import EventRequest from '@/requests/EventRequest.js'

export default {
  name: 'EventList',
  components: {
    EventCart
  },
  data() {
    return {
      events: []
    }
  },
  created() {
    EventRequest.getEvents()
                .then(response => {
                  this.events = response.data
                })
                .catch(error => {
                  alert(error)
                })
  }
}
</script>

<style scope>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
