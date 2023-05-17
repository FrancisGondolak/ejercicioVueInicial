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
          <!-- SECTION QUE CONTIENE LA LUZ DE ENCENDIDO -->
          <section class="gameboyPower">
            <div class="gameboyPower__light"></div>
            <div class="gameboyPower__letters">
              <p>BATTERY</p>
            </div>
          </section>

          <!-- SECTION QUE CONTIENE LA PANTALLA PROPIAMENTE DICHA -->
          <section class="gameboyScreen">
            <!-- DIV QUE CONTIENE LA PARTE SUPERIOR DE LA PANTALLA -->
            <div class="gameboyScreen__top">
              <!-- DIV QUE CONTIENE LA ZONA DONDE SE MUESTRA EL COMBATE -->
              <div class="gameboyScreen__top--combat">
                <!-- SECTION QUE CONTIENE LA ZONA DEL POKÉMON ENEMIGO -->
                <section class="enemyPokemon__zone">
                  <div class="enemyPokemonData">
                    <div class="enemyPokemonData__name">{{ enemyPokemonName }}</div>
                    <div class="enemyPokemonData__life">
                      <div class="enemyPokemonData__life--HPIcon">HP:</div>
                      <div class="enemyPokemonData__life--bar"></div>
                    </div>
                  </div>
                  <div class="enemyPokemonImageBox">
                    <img
                      class="enemyPokemonImage"
                      :src="route + enemyPokemon.name + '3.png'"
                      alt=""
                    />
                  </div>
                </section>
                <!-- SECTION QUE CONTIENE LA ZONA DEL POKÉMON DEL JUGADOR -->
                <section class="ownPokemon__zone">
                  <div class="ownPokemonImageBox">
                    <img class="ownPokemonImage" :src="route + myPokemon.name + '5.png'" alt="" />
                  </div>
                  <div class="ownPokemonData">
                    <div class="ownPokemonData__name">{{ myPokemonName }}</div>
                    <div class="ownPokemonData__life">
                      <div class="ownPokemonData__life--HPIcon">HP:</div>
                      <div class="ownPokemonData__life--bar"></div>
                    </div>
                  </div>
                </section>
              </div>

              <!-- DIV QUE CONTIENE LOS MENSAJES DEL COMBATE -->
              <div class="gameboyScreen__top--log"></div>
            </div>
            <!-- DIV QUE CONTIENE LOS BOTONES PARA ELEGIR ATAQUE-->
            <div class="gameboyScreen_down">
              <div class="gameboyScreen_down--buttons">
                <div class="button_01"></div>
                <div class="button_02"></div>
                <div class="button_03"></div>
                <div class="button_04"></div>
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
      enemyPokemon: '',
      myPokemonName: '',
      enemyPokemonName: ''
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
      this.myPokemonName = this.myPokemon.name.toUpperCase()
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
      this.enemyPokemonName = this.enemyPokemon.name.toUpperCase()
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
  height: 80%;
  display: flex;
  flex-direction: column;
  background-color: green;
}
.gameboyScreen__top--combat {
  height: 70%;
  display: flex;
  flex-direction: column;
  border: 5px solid black;
}
.enemyPokemon__zone {
  height: 40%;
  display: flex;
}
.enemyPokemonData {
  width: 60%;
  display: flex;
  flex-direction: column;
  background-color: aqua;
}

.enemyPokemonData__name {
  height: 30%;
  font-size: 50px;
  padding-left: 10px;
  border: 5px solid green;
}

.enemyPokemonData__life {
  height: 70%;
  display: flex;
  border: 5px solid blue;
}

.enemyPokemonData__life--HPIcon {
  width: 10%;
  height: 40%;
  color: rgb(206, 206, 32);
  font-size: 35px;
  text-align: center;
  background-color: black;
  margin: auto 0 auto 5px;
}

.enemyPokemonData__life--bar {
  width: 100%;
  height: 25%;
  margin: auto 0 auto 0;
  background-color: rgb(26, 201, 26);
}

.enemyPokemonImageBox {
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: red;
}

.enemyPokemonImage {
  width: 40%;
  height: 100%;
}

.ownPokemon__zone {
  height: 60%;
  display: flex;
}
.ownPokemonImageBox {
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(204, 141, 141);
}

.ownPokemonImage {
  width: 60%;
  height: 100%;
}

.ownPokemonData {
  width: 60%;
  display: flex;
  flex-direction: column;
  background-color: rgb(173, 118, 118);
}

.ownPokemonData__name {
  height: 30%;
  font-size: 55px;
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
  border: 5px solid green;
}

.ownPokemonData__life {
  height: 70%;
  display: flex;
  border: 5px solid blue;
}

.ownPokemonData__life--HPIcon {
  width: 10%;
  height: 25%;
  color: rgb(206, 206, 32);
  font-size: 35px;
  text-align: center;
  background-color: black;
  margin: auto 0 90px 0;
}

.ownPokemonData__life--bar {
  width: 100%;
  height: 15%;
  margin: auto 5px 100px 0;
  background-color: rgb(26, 201, 26);
}

.gameboyScreen__top--log {
  height: 30%;
  border: 5px solid red;
}

.gameboyScreen_down {
  height: 20%;
  width: 100%;
  background-color: blue;
}
</style>
