<template>
  <h1>Events For Good</h1>
  <EventList />
</template>

<script>
import EventList from '@/components/EventList.vue'

export default {
  name: 'HomeView',
  components: {
    EventList
  },
}
</script>
