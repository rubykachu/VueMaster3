<template>
  <h1>{{ eventStore.countEvents }} Events For {{ userStore.name }}</h1>

  <div class="events">
    <EventCart v-for="(event, index) in eventStore.events" :key="index" :event="event"/>

    <div class="pagination">
      <router-link rel="prev" id="page-prev" v-if="hasPrevPage" :to="{ name: 'EventList', query: { page: page - 1 }  }">
        &#60; Previous
      </router-link>

      <router-link rel="prev" id="page-next" v-if="hasNextPage" :to="{ name: 'EventList', query: { page: page + 1 }  }">
        Next &#62;
      </router-link>
    </div>
  </div>
</template>

<script>
import { watchEffect } from 'vue'
import EventCart from '@/components/EventCart.vue'
import { useEventStore } from '@/store/storage/EventStore'
import { useUserStore } from '@/store/storage/UserStore'

const PERPAGE = 2

export default {
  name: 'EventList',
  components: {
    EventCart
  },
  props: ['page'],
  data() {
    return { }
  },
  setup() {
    const eventStore = useEventStore()
    const userStore = useUserStore()
    return { eventStore, userStore }
  },
  created() {
    watchEffect(() => {
      this.eventStore.fetchEvents(this.page)
          .catch(error => {
            this.$router.push({
              name: 'ErrorDisplay',
              params: { error: error }
            })
        })
    })
  },
  computed: {
    hasPrevPage() {
      return this.page != 1
    },
    hasNextPage() {
      // First, calculate total pages
      const totalPages = Math.ceil(this.eventStore.totalEvents / PERPAGE) // 2 is events per page

      // Then check to see if the current page is less than the total pages.
      return this.page < totalPages
    },
  }
}
</script>

<style scope>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
