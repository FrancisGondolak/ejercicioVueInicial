<template>
  <l-list>
    <template #pokeballIcon>
      <c-pokeball src="src/components/assets/images/pokeball.png" alt="pokeballIcon"></c-pokeball>
    </template>
    <template #title>
      <img
        class="tituloPokedex"
        src="src/components/assets/images/pokedex.png"
        alt="tituloPokedex"
      />
    </template>
    <template #pokedex>
      <c-pokedex :pokemonshown="pokemonshown" :pokemonselected="pokemonSelected"> </c-pokedex>
    </template>
  </l-list>
</template>

<script>
import { charactersStore } from '@/stores/characters'
import LList from '@/layouts/l-list.vue'
import CPokeball from '@/components/c-pokeball.vue'
import CPokedex from '@/components/c-pokedex.vue'

export default {
  name: 'v-pokedex',

  components: {
    LList,
    CPokeball,
    CPokedex
  },

  data() {
    return {
      characters: [],
      fetched: false,
      error: false,
      pokemonshown: {},
      pokemonSelected: this.$route.params.pokemonNumber
    }
  },

  props: {},

  watch: {},

  computed: {},

  methods: {
    async getAllCharacters(pokemonSelected) {
      try {
        const useCharactersStore = charactersStore()
        this.characters = await useCharactersStore.fetchCharacters()
        this.fetched = true
        console.log(pokemonSelected)
        this.getPokemon(pokemonSelected)
      } catch (error) {
        this.error = true
      }
    },
    getPokemon(pokemonSelected) {
      console.log('entro en getPokemon')
      //aqui tengo que buscar el pokemon seleccionado en el array de Pokemon y guardarlo en el objeto pokemonshown
      for (let i = 0; i < this.characters.length; i++) {
        if (pokemonSelected === this.characters[i].number) {
          this.pokemonshown = this.characters[i]
        }
      }
    }
  },

  created() {
    this.getAllCharacters(this.pokemonSelected)
  }
}
</script>

<style lang="scss">
.tituloPokedex {
  width: 80%;
}
</style>
