<template>
  <l-list>
    <template #pokeballIcon>
      <c-pokeball src="src/components/assets/images/pokeball.png" alt="pokeballIcon"></c-pokeball>
    </template>
    <template #title>
      <img
        class="tituloLista"
        src="src/components/assets/images/listadoPokemon.png"
        alt="tituloLista"
      />
    </template>
    <template #pokemonList>
      <c-pokemon v-for="character in characters" :key="character.number" :pokemon="character">
      </c-pokemon>
    </template>
  </l-list>
</template>

<script>
import { charactersStore } from '@/stores/characters'
import LList from '@/layouts/l-list.vue'
import CPokemon from '@/components/c-pokemon.vue'
import CPokeball from '@/components/c-pokeball.vue'

export default {
  name: 'v-list',

  components: {
    LList,
    CPokemon,
    CPokeball
  },

  data() {
    return {
      characters: [],
      fetched: false,
      error: false
    }
  },

  methods: {
    async getAllCharacters() {
      try {
        const useCharactersStore = charactersStore()
        this.characters = await useCharactersStore.fetchCharacters()
        this.fetched = true
      } catch (error) {
        this.error = true
      }
    }
  },

  created() {
    this.getAllCharacters()
  }
}
</script>

<style lang="scss">
.tituloLista {
  width: 80%;
}
</style>
