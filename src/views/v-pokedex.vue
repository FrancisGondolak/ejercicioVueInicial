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
      <c-pokedex :pokemonshown="pokemonshown" @pokemonUnselected="unselectedPokemon"> </c-pokedex>
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
      select: false,
      pokemonshown: {}
    }
  },

  props: {},

  watch: {},

  computed: {},

  methods: {
    async getAllCharacters() {
      try {
        const useCharactersStore = charactersStore()
        this.characters = await useCharactersStore.fetchCharacters()
        this.fetched = true
      } catch (error) {
        this.error = true
      }
    },
    //cuando el padre reciba el aviso de $emit desde el hijo va a lanzar este método que
    //va a setear el valor de la variable select de data() en true y va a guardar en el
    //objeto pokemonshown el objeto pokemonselected que le llega desde c-pokemon
    selectedPokemon({ pokemonselected, selected }) {
      this.pokemonshown = pokemonselected
      this.select = selected
    },
    //el padre recibe el emit desde c-pokedex con el método closePokedex() que deselecciona el Pokémon
    //devolviendo la variable select a false para que se muestre de nuevo el listado de Pokémon
    unselectedPokemon(newValue) {
      this.select = newValue
    }
  },

  created() {
    this.getAllCharacters()
  }
}
</script>

<style lang="scss">
.tituloPokedex {
  width: 80%;
}
</style>
