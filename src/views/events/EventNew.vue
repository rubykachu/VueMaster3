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
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'

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
    onSubmit() {
      this.event.organizer = this.$store.state.user
      this.event.id = uuidv4()
      console.log(this.event)
    }
  }
}
</script>

<style>

</style>
