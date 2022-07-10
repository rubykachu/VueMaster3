import EventRequest from "@/requests/EventRequest.js";

const PERPAGE = 2

export default {
  namespaced: true,
  state: {
    events: [],
    currentEvent: null,
    totalEvents: 0
  },
  getters: {
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENT(state, event) {
      state.currentEvent = event
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_TOTAL_EVENT(state, total) {
      state.totalEvents = total
    }
  },
  actions: {
    createEvent({ commit }, event) {
      return EventRequest.postEvent(event)
        .then(() => { commit('ADD_EVENT', event) })
        .catch(e => { throw (e) })
    },
    fetchEvents({ commit }, page) {
      return EventRequest.getEvents(PERPAGE, parseInt(page) || 1)
        .then(response => {
          commit('SET_EVENTS', response.data)
          commit('SET_TOTAL_EVENT', response.headers['x-total-count'])
        })
        .catch(e => {
          throw (e)
        })
    },
    fetchEvent({ commit }, eventId) {
      return EventRequest.getDetailEvent(eventId)
        .then(response => {
          commit('SET_EVENT', response.data)
        })
        .catch(e => {
          throw (e)
        })
    }
  }
}
