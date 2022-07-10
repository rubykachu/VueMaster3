<template>
  <div v-if="event">
    <h3>{{ event.title }}</h3>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>

<script>
export default {
  props: ['event']
}
</script>

<style scoped>

</style>
