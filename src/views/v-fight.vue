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

    <template #gameboy>
      <div class="gameboy">
        <div class="gameboy__top">
          <div class="gameboy__top--leftStripes">
            <div class="longStripe__red"></div>
            <div class="longStripe__blue"></div>
          </div>
          <div class="gameboy__top--letters">
            <p>DOT MATRIX WITH STEREO SOUND</p>
          </div>
          <div class="gameboy__top--rightStripes">
            <div class="shortStripe__red"></div>
            <div class="shortStripe__blue"></div>
          </div>
        </div>
        <div class="gameboy__left"></div>
      </div>
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
//ESTILOS DEL ENCABEZADO DE LA PÁGINA
.tituloCombate {
  width: 60%;
}

//ESTILOS DE LOS ADORNOS DE LA PANTALLA DE GAMEBOY

.gameboy {
  display: flex;
  flex-direction: column;
}

.gameboy__top {
  display: flex;
  height: 10%;
}
.gameboy__top--leftStripes {
  width: 55%;
  display: flex;
  flex-direction: column;
}

.longStripe__red {
  width: 97%;
  height: 15%;
  margin: 19px 5px 5px 20px;
  background-color: rgb(168, 12, 12);
}

.longStripe__blue {
  width: 97%;
  height: 15%;
  margin: 0 5px 19px 20px;
  background-color: rgb(27, 27, 170);
}

.gameboy__top--letters {
  width: auto;
}

.gameboy__top--letters > p {
  color: white;
  font-size: 20px;
}

.gameboy__top--rightStripes {
  width: 22%;
}

.shortStripe__red {
  width: 95%;
  height: 15%;
  margin: 19px 20px 5px 5px;
  background-color: rgb(168, 12, 12);
}

.shortStripe__blue {
  width: 95%;
  height: 15%;
  margin: 0 20px 19px 5px;
  background-color: rgb(27, 27, 170);
}

//ESTILOS DE LA PANTALLA DE LA GAMEBOY
.fightScreen {
  height: 60%;
  width: 80%;
  margin: 0 auto 10px auto;
  background-color: red;
}
.fightScreen__Pokemon--enemy {
  display: flex;
  align-items: flex-end;
  background-color: pink;
}
.enemyPokemonImageBox {
  width: 50%;
  height: 100%;
  display: flex;

  align-items: center;
  justify-content: center;
  background-color: red;
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
  background-color: rgb(204, 141, 141);
}

.myPokemonImage {
  width: 30%;
  height: 30%;
}

.fightButtons {
  height: 20%;
  width: 80%;
  margin: 10px auto 100px auto;
  background-color: blue;
}
</style>
