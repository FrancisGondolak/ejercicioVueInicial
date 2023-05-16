<template>
  <l-fight>
    <template #pokeballIcon>
      <c-pokeball src="src/components/assets/images/pokeball.png" alt="pokeballIcon"></c-pokeball>
    </template>
    <template #title>
      <img
        class="tituloCombate"
        src="src/components/assets/images/combate.png"
        alt="tituloCombate"
      />
    </template>
    <template #fight>
      <section class="fightScreen">
        <div class="fightScreen__Pokemon">
          <section class="fightScreen__Pokemon--enemy">
            <div class="enemyPokemonLife"></div>
            <div class="enemyPokemonImageBox">
              <img class="enemyPokemonImage" :src="route + enemyPokemon.name + '3.png'" alt="" />
            </div>
          </section>
          <section class="fightScreen__Pokemon--mine">
            <div class="myPokemonLife"></div>
            <div class="myPokemonImageBox">
              <img class="myPokemonImage" :src="route + myPokemon.name + '5.png'" alt="" />
            </div>
          </section>
        </div>
        <div class="fightScreen__log"></div>
      </section>
      <section class="fightButtons">
        <div class="fightButtons__attack01"></div>
        <div class="fightButtons__attack02"></div>
        <div class="fightButtons__attack03"></div>
        <div class="fightButtons__attack04"></div>
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

<style lang="scss" scoped>
.tituloCombate {
  width: 60%;
}
.enemyPokemonImageBox {
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.enemyPokemonImage {
  width: 20%;
  height: 20%;
}

.myPokemonImageBox {
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: grey;
}

.myPokemonImage {
  width: 30%;
  height: 30%;
}
</style>
