import { defineStore } from 'pinia'
import { apiStore } from './api'

export const charactersStore = defineStore('characters', {
  state: () => ({
    characters: null
  }),

  actions: {
    async fetchCharacters() {
      const method = 'GET'
      const url = '/characters/getAll'
      return apiStore()
        .doRequest({ url, method })
        .then((res) => {
          this.characters = res
          return res
        })
        .catch((error) => {
          console.log(error)
          return false
        })
    }
  }
})
