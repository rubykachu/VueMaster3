<template>
  <div class="form-container">
    <h1>Create an event</h1>

    <form @submit.prevent="onSubmit">
      <label>Select a category: </label>
      <select v-model="event.category">
        <option
          v-for="(category, index) in categories"
          :key="index"
          :value="category"
          :selected="category == event.category"
          > {{ category }} </option>
      </select>

      <h3>Name & describe your event</h3>

      <label for="">Title</label>
      <input type="text" v-model="event.title" placeholder="title">

      <label for="">Description</label>
      <input type="text" v-model="event.description" placeholder="description">

      <h3>Where is your event?</h3>

      <label for="">Location</label>
      <input type="text" v-model="event.location" placeholder="location">

      <h3>When is your event?</h3>
      <input type="date" name="" id="" v-model="event.date" placeholder="date">
      <input type="time" name="" id="" v-model="event.time" placeholder="time">

      <button type="submit">Submit</button>
    </form>
    <h1>{{ $store.state.events }}</h1>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      categories: [
        'sustainability',
        'nature',
        'animal welfare',
        'housing',
        'education',
        'food',
        'community'
      ],
      event: {
        id: '',
        category: '',
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        organizer: ''
      }
    }
  },
  methods: {
    ...mapActions(['createEvent']),
    onSubmit() {
      const event = {
        ...this.event,
        organizer: this.$store.state.user,
        id: uuidv4()
      }

      // this.$store.dispatch('createEvent', event)
      this.createEvent(event)
        .then(() => {
          this.$router.push({ name: 'EventDetail', params: { id: event.id } })
        })
        .catch(e => {
          this.$router.push({ name: 'ErrorDisplay', params: { error: e } })
        })
    }
  }
}
</script>

<style>

</style>
