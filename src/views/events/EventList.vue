<template>
  <h1>{{ countEvents }} Events For {{ user.userInfo.name }}</h1>

  <div class="events">
    <EventCart v-for="(event, index) in event.events" :key="index" :event="event"/>

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
import { mapState, mapActions, mapGetters } from 'vuex'

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
  created() {
    watchEffect(() => {
      // this.$store.dispatch('fetchEvents', this.page)
      this.fetchEvents(this.page)
          .catch(error => {
            this.$router.push({
              name: 'ErrorDisplay',
              params: { error: error }
            })
        })
    })
  },
  methods: {
    ...mapActions('event', ['fetchEvents'])
  },
  computed: {
    ...mapState(['user', 'event', 'totalEvents']),
    ...mapGetters('event', ['countEvents']),
    hasPrevPage() {
      return this.page != 1
    },
    hasNextPage() {
      // First, calculate total pages
      const totalPages = Math.ceil(this.event.totalEvents / PERPAGE) // 2 is events per page

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
