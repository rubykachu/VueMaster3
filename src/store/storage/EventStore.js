import { defineStore } from 'pinia';
import EventRequest from "@/requests/EventRequest.js";

const PERPAGE = 2

export const useEventStore = defineStore('EventStore', {
  state() {
    return {
      events: [],
      currentEvent: null,
      totalEvents: 0,
      organizer: 'Minh Tang'
    }
  },
  getters: {
    countEvents() {
      return this.events.length
    }
  },
  actions: {
    createEvent(event) {
      return EventRequest.postEvent(event)
        .then(() => { this.events.push(event) })
        .catch(e => { throw (e) })
    },
    fetchEvents(page) {
      return EventRequest.getEvents(PERPAGE, parseInt(page) || 1)
        .then(response => {
          this.events = response.data
          this.totalEvents = response.headers['x-total-count']
        })
        .catch(e => {
          throw (e)
        })
    },
    fetchEvent(eventId) {
      return EventRequest.getDetailEvent(eventId)
        .then(response => {
          this.currentEvent = response.data
        })
        .catch(e => {
          throw (e)
        })
    }
  }
})
