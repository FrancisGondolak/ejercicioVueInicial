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
        <section class="gameboy__top">
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
        </section>

        <section class="gameboy__middle">
          <section class="gameboyPower">
            <div class="gameboyPower__light"></div>
            <div class="gameboyPower__letters">
              <p>BATTERY</p>
            </div>
          </section>
          <section class="gameboyScreen">
            <div class="gameboyScreen__top">
              <div class="fightScreen">
                <div class="fightScreen__Pokemon">
                  <section class="fightScreen__Pokemon--enemy">
                    <div class="enemyPokemonLife"></div>
                    <div class="enemyPokemonImageBox">
                      <img
                        class="enemyPokemonImage"
                        :src="route + enemyPokemon.name + '3.png'"
                        alt=""
                      />
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
              </div>
            </div>
            <div class="gameboyScreen_down">
              <div class="fightButtons">
                <div class="fightButtons__attack01"></div>
                <div class="fightButtons__attack02"></div>
                <div class="fightButtons__attack03"></div>
                <div class="fightButtons__attack04"></div>
              </div>
            </div>
          </section>
        </section>
      </div>
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

//ESTILOS DE LA PARTE SUPERIOR DE LA GAME BOY

.gameboy {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.gameboy__top {
  display: flex;
  height: 6%;
  justify-content: center;
}
.gameboy__top--leftStripes {
  width: 55%;
  display: flex;
  flex-direction: column;
}

.longStripe__red {
  width: 97%;
  height: 15%;
  margin: 20px 5px 5px 20px;
  background-color: rgb(168, 12, 12);
}

.longStripe__blue {
  width: 97%;
  height: 15%;
  margin: 0px 5px 0px 20px;
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
  margin: 20px 20px 5px 5px;
  background-color: rgb(168, 12, 12);
}

.shortStripe__blue {
  width: 95%;
  height: 15%;
  margin: 0px 20px 0px 5px;
  background-color: rgb(27, 27, 170);
}

//ESTILOS DE LA PARTE MEDIA DE LA GAME BOY

.gameboy__middle {
  display: flex;
  height: 85%;
}

.gameboyPower {
  width: 10%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.gameboyPower__light {
  background-color: rgb(255, 0, 0);
  border-radius: 50%;
  width: 25%;
  height: 5%;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
    rgba(255, 0, 0, 0.5) 0 2px 12px;
  animation: flashingLight 2s infinite;
}

@keyframes flashingLight {
  from {
    background-color: rgb(255, 0, 0);
  }
  50% {
    background-color: rgb(170, 0, 0);
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
      rgba(255, 0, 0, 0.5) 0 2px 0;
  }
  to {
    background-color: rgb(255, 0, 0);
  }
}
.gameboyPower__letters > p {
  font-size: 20px;
  color: white;
}

//A PARTIR DE AQUÍ ES DONDE ESTÁ LA PANTALLA DE GAME BOY PROPIAMENTE DICHA
.gameboyScreen {
  height: 100%;
  width: 80%;
  margin: 0 auto 10px 0;
  display: flex;
  flex-direction: column;
  background-color: white;
}

.gameboyScreen__top {
  height: 75%;
  background-color: green;
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

.gameboyScreen_down {
  height: 25%;
  width: 100%;
  background-color: blue;
}
</style>
