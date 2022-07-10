<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <div id="nav">
      <router-link :to="{ name: 'EventDetail' }" >Detail</router-link>
      <router-link :to="{ name: 'EventRegister' }" >Register</router-link> |
      <router-link :to="{ name: 'EventEdit' }" >Edit</router-link>
    </div>

    <router-view :event="event"></router-view>
  </div>
</template>

<script>
// import EventRequest from '@/requests/EventRequest.js'
import { mapActions } from 'vuex'

export default {
  name: 'EventDetail',
  props: ['id'],
  data() {
    return {}
  },
  created() {
    // this.$store.dispatch('fetchEvent', this.id)
    this.fetchEvent(this.id)
      .catch(e => {
        this.$router.push({ name: 'ErrorDisplay', params: { error: e } })
      })
    // EventRequest.getDetailEvent(this.id)
    //   .then(response => {
    //     this.event = response.data
    //   })
    //   .catch(e => {
    //     console.log(e)
    //     if (e.response && e.response.status == 404) {
    //       this.$router.push({ name: '404Resource', params: { resource: 'event' } })
    //     } else {
    //       this.$router.push({ name: 'NetworkError' })
    //     }
    //   })
  },
  methods: {
    ...mapActions(['fetchEvent'])
  },
  computed: {
    event() {
      return this.$store.state.currentEvent
    }
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
