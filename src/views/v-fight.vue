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
          <section class="gameboy__middle--left">
            <div class="powerLight"></div>
            <div class="powerLetters">
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
                    <img class="enemyPokemonImage" :src="showEnemyPokemon" alt="" />
                  </div>
                </section>
                <!-- SECTION QUE CONTIENE LA ZONA DEL POKÉMON DEL JUGADOR -->
                <section class="ownPokemon__zone">
                  <div class="ownPokemonImageBox">
                    <img class="ownPokemonImage" :src="showOwnPokemon" alt="" />
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
              <div class="gameboyScreen_down--left">
                <div class="attackButton__topBox">
                  <div class="attackButton" @click="ownAttack(0)">{{ chooseAttackNumber(0) }}</div>
                </div>
                <div class="attackButton__bottomBox">
                  <div class="attackButton" @click="ownAttack(1)">{{ chooseAttackNumber(1) }}</div>
                </div>
              </div>
              <div class="gameboyScreen_down--center">
                <div class="pokeballCircle">
                  <div class="pokeballButton" @click="powerOffGameboy"></div>
                </div>
              </div>
              <div class="gameboyScreen_down--right">
                <div class="attackButton__topBox">
                  <div class="attackButton" @click="ownAttack(2)">{{ chooseAttackNumber(2) }}</div>
                </div>
                <div class="attackButton__bottomBox">
                  <div class="attackButton" @click="ownAttack(3)">{{ chooseAttackNumber(3) }}</div>
                </div>
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
      myPokemon: '',
      pokemonSelected: this.$route.params.pokemonNumber,
      route: 'src/components/assets/images/sprite',
      pokemonTotal: '',
      enemyPokemon: '',
      myPokemonName: '',
      enemyPokemonName: '',
      ownPokemonAttacks: [],
      enemyPokemonAttacks: []
    }
  },
  computed: {
    //computada para recargar el valor de enemyPokemon cuando lo encuentra undefined al cargar el DOM
    showEnemyPokemon() {
      if (!this.enemyPokemon) {
        return ''
      } else {
        return this.route + this.enemyPokemon.name + '3.png'
      }
    },
    //computada para recargar el valor de myPokemon cuando lo encuentra undefined al cargar el DOM
    showOwnPokemon() {
      if (!this.myPokemon) {
        return ''
      } else {
        return this.route + this.myPokemon.name + '5.png'
      }
    }
  },
  methods: {
    async getAllCharacters() {
      try {
        const useCharactersStore = charactersStore()
        this.characters = await useCharactersStore.fetchCharacters()
        this.fetched = true
        this.getMyPokemon(this.pokemonSelected)
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
      //recogemos los ataques del Pokémon que hemos elegido en la variable
      this.ownPokemonAttacks = this.myPokemon.attacks
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
      //recogemos los ataques del Pokémon rival en la variable
      this.enemyPokemonAttacks = this.enemyPokemon.attacks
      this.enemyPokemonName = this.enemyPokemon.name.toUpperCase()
    },
    chooseAttackNumber(number) {
      if (!this.myPokemon.attacks) {
        return ''
      } else {
        return this.myPokemon.attacks[number]
      }
    },
    ownAttack(attack) {
      console.log(this.ownPokemonAttacks)
      for (let i = 0; i < this.ownPokemonAttacks.length; i++) {
        if (attack === i) {
          console.log('hola' + this.ownPokemonAttacks[i])
        }
      }
      if (attack === 'Placaje') {
        this.enemyPokemon.lifePoints -= 2
      }
      console.log(this.enemyPokemon.lifePoints)
    },
    powerOffGameboy() {
      this.$router.push({ name: 'list' })
    }
  },

  created() {
    this.getAllCharacters()
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
  font-size: 0.95vw;
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

.gameboy__middle--left {
  width: 10%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.powerLight {
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
.powerLetters > p {
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
  border: 5px solid black;
}

.gameboyScreen__top {
  height: 80%;
  display: flex;
  flex-direction: column;
  // background-color: green;
}
.gameboyScreen__top--combat {
  height: 70%;
  display: flex;
  flex-direction: column;
  // border: 5px solid black;
}
.enemyPokemon__zone {
  height: 40%;
  width: 90%;
  margin: 0px auto 0px auto;
  padding-top: 5px;
  display: flex;
}
.enemyPokemonData {
  width: 60%;
  display: flex;
  flex-direction: column;
  // background-color: aqua;
}

.enemyPokemonData__name {
  height: 30%;
  font-size: 50px;
  padding-left: 10px;
  // border: 5px solid green;
}

.enemyPokemonData__life {
  height: 70%;
  display: flex;
  // border: 5px solid blue;
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
  // background-color: red;
}

.enemyPokemonImage {
  width: 40%;
  height: 100%;
}

.ownPokemon__zone {
  height: 60%;
  width: 90%;
  margin: 0px auto 0px auto;
  display: flex;
}
.ownPokemonImageBox {
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  // background-color: rgb(204, 141, 141);
}

.ownPokemonImage {
  width: 60%;
  height: 100%;
}

.ownPokemonData {
  width: 60%;
  display: flex;
  flex-direction: column;
  // background-color: rgb(173, 118, 118);
}

.ownPokemonData__name {
  height: 30%;
  font-size: 55px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding-right: 10px;
  // border: 5px solid green;
}

.ownPokemonData__life {
  height: 70%;
  display: flex;
  // border: 5px solid blue;
}

.ownPokemonData__life--HPIcon {
  width: 10%;
  height: 25%;
  color: rgb(206, 206, 32);
  font-size: 35px;
  text-align: center;
  background-color: black;
  margin: auto 0 120px 0;
}

.ownPokemonData__life--bar {
  width: 100%;
  height: 15%;
  margin: auto 5px 130px 0;
  background-color: rgb(26, 201, 26);
}

.gameboyScreen__top--log {
  height: 30%;
  width: 90%;
  margin: 0px auto 10px auto;
  border: 5px solid rgb(0, 0, 0);
  box-sizing: border-box;
}

.gameboyScreen_down {
  height: 20%;
  width: 100%;
  display: flex;
  border-top: 5px solid rgb(0, 0, 0);
}
.gameboyScreen_down--left {
  width: 45%;
  display: flex;
  flex-direction: column;
}

.gameboyScreen_down--center {
  width: 10%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: linear-gradient(red 50%, white 50%);
  box-sizing: border-box;
}

.pokeballCircle {
  background-color: rgb(255, 255, 255);
  border-radius: 50%;
  border: 10px solid black;
  width: 100%;
  height: 60%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.pokeballButton {
  border-radius: 50%;
  border: 5px solid black;
  width: 40%;
  height: 40%;
  box-shadow: 0px 3px 3px 1px rgba(0, 0, 0, 0.75);
  cursor: pointer;
}

.pokeballButton:active {
  transform: scale(0.9);
}

.gameboyScreen_down--right {
  width: 45%;
}

.attackButton__topBox {
  height: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: red;
  border-bottom: 5px solid black;
  box-sizing: border-box;
}

.attackButton__bottomBox {
  height: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-top: 5px solid black;
  box-sizing: border-box;
}

.attackButton {
  border: 5px solid black;
  box-sizing: border-box;
  background: rgb(255, 255, 255);
  box-shadow: var(--color-shadow-buttonPokedex);
  border-radius: 5%;
  width: 40%;
  height: 60%;
  display: flex;
  cursor: pointer;
}

.attackButton:active {
  transform: scale(0.9);
}
</style>
