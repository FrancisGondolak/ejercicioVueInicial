<template>
  <l-fight>
    <template #pokeballIcon>
      <c-pokeball src="src/components/assets/images/pokeball.png" alt="pokeballIcon"></c-pokeball>
    </template>
    <template #title>
      <img
        class="tituloPokedex"
        src="src/components/assets/images/combate.png"
        alt="tituloPokedex"
      />
    </template>
    <template #fight>
      <section id="fightScreen">
        <div id="fightScreen__Pokemon">
          <section id="fightScreen__Pokemon--enemy">
            <div id="enemyPokemonLife"></div>
            <div id="enemyPokemonImage">
              <img :src="route + enemyPokemon.name + extension" alt="" />
            </div>
          </section>
          <section id="fightScreen__Pokemon--mine">
            <div id="myPokemonLife"></div>
            <div id="myPokemonImage">
              <img :src="route + myPokemon.name + extension" alt="" />
            </div>
          </section>
        </div>
        <div id="fightScreen__log"></div>
      </section>
      <section id="fightButtons">
        <div id="fightButtons__attack01"></div>
        <div id="fightButtons__attack02"></div>
        <div id="fightButtons__attack03"></div>
        <div id="fightButtons__attack04"></div>
      </section>
      <!-- <p>
        AQUI IRIA TODO LO NUEVO, LA SCREEN ENTERA {{ this.myPokemon.name }}
        {{ this.enemyPokemon.name }}
      </p> -->
    </template>
  </l-fight>
</template>

<script>
import { charactersStore } from '@/stores/characters'
import LFight from '@/layouts/l-fight.vue'
import CPokeball from '@/components/c-pokeball.vue'

export default {
  name: 'v-fight',

  components: {
    LFight,
    CPokeball
  },

  data() {
    return {
      characters: [],
      fetched: false,
      error: false,
      myPokemon: {},
      pokemonSelected: this.$route.params.pokemonNumber,
      route: 'src/components/assets/images/sprite',
      extension: '3.png',
      pokemonTotal: '',
      enemyPokemon: ''
    }
  },

  methods: {
    async getAllCharacters(pokemonSelected) {
      try {
        const useCharactersStore = charactersStore()
        this.characters = await useCharactersStore.fetchCharacters()
        this.fetched = true
        this.getMyPokemon(pokemonSelected)
      } catch (error) {
        this.error = true
      }
    },
    getMyPokemon(pokemonSelected) {
      for (let i = 0; i < this.characters.length; i++) {
        if (pokemonSelected === this.characters[i].number) {
          this.myPokemon = this.characters[i]
        }
      }
      this.choosePokemonEnemy()
    },
    choosePokemonEnemy() {
      //guardamos en pokemonTotal la longitud del array de Pokemon
      this.pokemonTotal = this.characters.length
      //con un Math.random elegimos al azar un número del total de la longitud del array
      //y lo asignamos a enemyPokemon
      this.enemyPokemon = Math.floor(Math.random() * this.pokemonTotal)
      //finalmente, reasignamos a enemyPokemon el objeto Pokemon elegido dentro del array
      this.enemyPokemon = this.characters[this.enemyPokemon]
    }
  },

  created() {
    this.getAllCharacters(this.pokemonSelected)
  }
}
</script>

<style lang="scss" scoped></style>
