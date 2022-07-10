import { defineStore } from 'pinia'

export const useUserStore = defineStore('UserStore', {
  state() {
    return {
      user: 'Minh Tang Q.'
    }
  },
  getters: {
    firstName() {
      return this.user.split(' ')[0]
    },
    // Use arrow function, pass `state`
    middleName: state => state.user.split(' ')[1]
  }
})
