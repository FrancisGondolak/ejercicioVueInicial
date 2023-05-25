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
                      <div class="enemyPokemonData__life--bar" :style="getEnemyBarWidth()"></div>
                    </div>
                  </div>
                  <div class="enemyPokemonImageBox">
                    <img
                      class="enemyPokemonImage"
                      :src="showEnemyPokemon"
                      alt="enemyPokemonImage"
                    />
                  </div>
                </section>
                <!-- SECTION QUE CONTIENE LA ZONA DEL POKÉMON DEL JUGADOR -->
                <section class="ownPokemon__zone">
                  <div class="ownPokemonImageBox">
                    <img class="ownPokemonImage" :src="showOwnPokemon" alt="ownPokemonImage" />
                  </div>
                  <div class="ownPokemonData">
                    <div class="ownPokemonData__name">{{ ownPokemonName }}</div>
                    <div class="ownPokemonData__life">
                      <div class="ownPokemonData__life--HPIcon">HP:</div>
                      <div class="ownPokemonData__life--bar" :style="getOwnBarWidth()"></div>
                    </div>
                  </div>
                </section>
              </div>

              <!-- DIV QUE CONTIENE LOS MENSAJES DEL COMBATE -->
              <div class="gameboyScreen__top--log">
                <ul>
                  <li v-for="logMessage in logMessages" :key="logMessage">
                    <span class="gameboyScreen__top--logMessage">{{ logMessage }}</span>
                  </li>
                </ul>
              </div>
            </div>
            <!-- DIV QUE CONTIENE LOS BOTONES PARA ELEGIR ATAQUE-->
            <div class="gameboyScreen_down">
              <div class="gameboyScreen_down--left">
                <div class="attackButton__topBox">
                  <div class="attackButton" v-if="canUseButtons" @click="ownAttack(0)">
                    {{ chooseAttackNumber(0) }}
                  </div>
                </div>
                <div class="attackButton__bottomBox">
                  <div class="attackButton" v-if="canUseButtons" @click="ownAttack(1)">
                    {{ chooseAttackNumber(1) }}
                  </div>
                </div>
              </div>
              <div class="gameboyScreen_down--center">
                <div class="pokeballCircle">
                  <div class="pokeballButton" @click="powerOffGameboy"></div>
                </div>
              </div>
              <div class="gameboyScreen_down--right">
                <div class="attackButton__topBox">
                  <div class="attackButton" v-if="canUseButtons" @click="ownAttack(2)">
                    {{ chooseAttackNumber(2) }}
                  </div>
                </div>
                <div class="attackButton__bottomBox">
                  <div class="attackButton" v-if="canUseButtons" @click="ownAttack(3)">
                    {{ chooseAttackNumber(3) }}
                  </div>
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
      ownPokemon: '',
      pokemonSelected: this.$route.params.pokemonNumber,
      route: 'src/components/assets/images/sprite',
      pokemonTotal: '',
      enemyPokemon: '',
      ownPokemonName: '',
      enemyPokemonName: '',
      ownPokemonAttacks: [],
      ownPokemonTotalLife: '',
      ownPokemonLife: '',
      ownPokemonPowerAttack: '',
      ownPokemonPowerDefense: '',
      enemyPokemonAttacks: [],
      enemyPokemonChosenAttack: '',
      enemyPokemonTotalLife: '',
      enemyPokemonLife: '',
      enemyPokemonPowerAttack: '',
      enemyPokemonPowerDefense: '',
      ownPokemon_sleeping: false,
      ownPokemon_turnSleeping: 0,
      ownPokemon_drained: false,
      ownPokemon_hpDrained: '',
      ownPokemon_turnDrain: 0,
      enemyPokemon_sleeping: false,
      enemyPokemon_turnSleeping: 0,
      enemyPokemon_drained: false,
      enemyPokemon_hpDrained: '',
      enemyPokemon_turnDrain: 0,
      logMessages: '',
      canUseButtons: true
    }
  },
  watch: {
    //watch para controlar qué pasa cuando la vida del Pokémon propio llega a 0 o menos. Le ponemos un
    //setTimeout para que espere 2 segundos antes de mostrar el mensaje de victoria o derrota
    ownPokemonLife() {
      if (this.ownPokemonLife <= 0) {
        setTimeout(() => {
          this.logMessages = []
          this.logMessages.push(this.ownPokemonName + ' se ha desmayado. Has perdido el combate')
          this.canUseButtons = false
        }, 2000)
      }
    },
    //watch para controlar qué pasa cuando la vida del Pokémon enemigo llega a 0 o menos. Le ponemos un
    //setTimeout para que espere 2 segundos antes de mostrar el mensaje de victoria o derrota
    enemyPokemonLife() {
      setTimeout(() => {
        if (this.enemyPokemonLife <= 0) {
          this.logMessages = []
          this.logMessages.push(
            'Has derrotado al ' + this.enemyPokemonName + ' enemigo. ¡¡Enhorabuena!!'
          )
          this.canUseButtons = false
        }
      }, 2000)
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
      if (!this.ownPokemon) {
        return ''
      } else {
        return this.route + this.ownPokemon.name + '5.png'
      }
    }
  },
  methods: {
    async getAllCharacters() {
      try {
        const useCharactersStore = charactersStore()
        this.characters = await useCharactersStore.fetchCharacters()
        this.getOwnPokemon(this.pokemonSelected)
        this.fetched = true
      } catch (error) {
        this.error = true
      }
    },
    getOwnPokemon(pokemonSelected) {
      for (let i = 0; i < this.characters.length; i++) {
        if (pokemonSelected === this.characters[i].number) {
          this.ownPokemon = this.characters[i]
        }
      }
      this.ownPokemonName = this.ownPokemon.name.toUpperCase()
      //recogemos los atributos del Pokémon que hemos elegido para hacerlos más manejables
      this.ownPokemonAttacks = this.ownPokemon.attacks
      this.ownPokemonTotalLife = this.ownPokemon.lifePoints
      this.ownPokemonLife = this.ownPokemon.lifePoints
      this.ownPokemonPowerAttack = this.ownPokemon.attackPoints
      this.ownPokemonPowerDefense = this.ownPokemon.defensePoints
      //lanzamos la función para crear al enemigo
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
      //recogemos los atributos del Pokémon enemigo en sus variables
      this.enemyPokemonAttacks = this.enemyPokemon.attacks
      this.enemyPokemonTotalLife = this.enemyPokemon.lifePoints
      this.enemyPokemonLife = this.enemyPokemon.lifePoints
      this.enemyPokemonPowerAttack = this.enemyPokemon.attackPoints
      this.enemyPokemonPowerDefense = this.enemyPokemon.defensePoints
      this.enemyPokemonName = this.enemyPokemon.name.toUpperCase()
    },
    //método para asignar el numero del ataque a cada botón y al ownAttack de cada evento @click
    chooseAttackNumber(number) {
      if (!this.ownPokemon.attacks) {
        return ''
      } else {
        return this.ownPokemon.attacks[number]
      }
    },

    /**
     *
     * MÉTODO PARA EL ATAQUE DEL POKEMON PROPIO
     *
     */
    ownAttack(attack) {
      this.logMessages = []
      //recorremos el array de ataques del Pokémon propio para encontrar la posición igual a la
      //que le pasamos como argumento (variable attack)
      for (let i = 0; i < this.ownPokemonAttacks.length; i++) {
        //cuando la encontramos, reasignamos a la variable attack el nombre de dicho ataque
        if (attack === i) {
          attack = this.ownPokemonAttacks[i]
        }
      }
      //cuando el Pokémon lleva 3 turnos dormidos, se despierta y reseteamos el contador a 0
      if (this.ownPokemon_turnSleeping === 3) {
        this.ownPokemon_sleeping = false
        this.logMessages.push(this.ownPokemonName + ' se despertó')
        this.ownPokemon_turnSleeping = 0
      }
      //si el Pokémon está dormido, attack va a ser vacío para evitar que ataque mientras esté dormido. Si
      //no está dormido, agregaremos al log el mensaje del ataque que usa y seguiremos la lógica de dicho
      //ataque en su if correspondiente
      if (this.ownPokemon_sleeping === true) {
        attack = ''
        this.ownPokemon_turnSleeping += 1
        this.logMessages.push(this.ownPokemonName + ' está dormido')
      } else {
        this.logMessages.push(this.ownPokemonName + ' usó ' + attack)
      }

      //a partir de aquí toca hacer un condicional para que cada ataque cumpla su función
      if (attack === 'Placaje' || attack === 'Arañazo' || attack === 'Impactrueno') {
        this.enemyPokemonLife -= this.ownPokemonPowerAttack * 2 - this.enemyPokemonPowerDefense
        this.logMessages.push(
          'Los puntos de vida del ' +
            this.enemyPokemonName +
            ' enemigo han bajado a ' +
            this.enemyPokemonLife
        )
      }

      if (
        attack === 'Látigo cepa' ||
        attack === 'Ascuas' ||
        attack === 'Pistola agua' ||
        attack === 'Cola férrea' ||
        attack === 'Poder pasado' ||
        attack === 'Confusión'
      ) {
        this.enemyPokemonLife -= this.ownPokemonPowerAttack * 3 - this.enemyPokemonPowerDefense
        this.logMessages.push(
          'Los puntos de vida del ' +
            this.enemyPokemonName +
            ' enemigo han bajado a ' +
            this.enemyPokemonLife
        )
      }
      //si elegimos Drenadoras pero el enemigo ya está infectado, perderemos el turno y nos saldrá
      //un aviso de que ya está infectado, evitando que las "recarguemos" desde 0
      if (attack === 'Drenadoras') {
        if (this.enemyPokemon_drained === true) {
          this.logMessages.push('El ' + this.enemyPokemonName + ' enemigo ya está infectado')
        } else {
          this.enemyPokemon_drained = true
        }
      }

      //cuando el rival lleva 4 turnos con drenadoras, se deshace de ellas y devolvemos los turnos a 0
      if (this.enemyPokemon_turnDrain === 4) {
        this.enemyPokemon_drained = false
        this.logMessages.push(
          'El ' + this.enemyPokemonName + ' enemigo se deshizo de las Drenadoras'
        )
        this.enemyPokemon_turnDrain = 0
      }
      //si el rival está afectado por drenadoras, vamos sumando turnos. Calculamos la vida que le quitan
      //las drenadoras otorgándoles la mitad del poder de ataque y se lo restamos cada turno mientras
      //le afecten. Esos mismos puntos los sumamos a nuestra vida pero sin sobrepasar el total (20)
      if (this.enemyPokemon_drained === true) {
        this.enemyPokemon_turnDrain += 1
        this.enemyPokemon_hpDrained = this.ownPokemonPowerAttack / 2
        this.enemyPokemonLife -= this.enemyPokemon_hpDrained
        this.logMessages.push(
          'El ' +
            this.enemyPokemonName +
            ' enemigo ha perdido ' +
            this.enemyPokemon_hpDrained +
            ' puntos de vida a causa de las Drenadoras'
        )
        this.ownPokemonLife += this.enemyPokemon_hpDrained
        this.logMessages.push(
          this.ownPokemonName +
            ' ha recuperado ' +
            this.enemyPokemon_hpDrained +
            ' puntos de vida gracias a las Drenadoras'
        )
        if (this.ownPokemonLife > 20) {
          this.ownPokemonLife = 20
        }
      }

      if (attack === 'Recuperación') {
        this.ownPokemonLife += 5
        if (this.ownPokemonLife > 40) {
          this.ownPokemonLife = 40
        }
        this.logMessages.push(this.ownPokemonName + ' ha recuperado 5 puntos de vida')
      }

      if (
        attack === 'Dragoaliento' ||
        attack === 'Mordisco' ||
        attack === 'Trueno' ||
        attack === 'Psíquico'
      ) {
        this.enemyPokemonLife -= this.ownPokemonPowerAttack * 2
        this.logMessages.push(
          'Los puntos de vida del ' +
            this.enemyPokemonName +
            ' enemigo han bajado a ' +
            this.enemyPokemonLife
        )
      }

      if (attack === 'Cara susto' || attack === 'Chirrido') {
        if (this.enemyPokemonPowerDefense === 0) {
          this.logMessages.push(
            'La defensa del ' + this.enemyPokemonName + ' enemigo no puede bajar más'
          )
        } else {
          this.enemyPokemonPowerDefense -= 1
          this.logMessages.push('La defensa del ' + this.enemyPokemonName + ' enemigo bajó')
        }
      }

      if (attack === 'Refugio' || attack === 'Encanto') {
        if (this.ownPokemonPowerDefense === 4) {
          this.logMessages.push('La defensa de ' + this.ownPokemonName + ' no puede subir más')
        } else {
          this.ownPokemonPowerDefense += 1
          this.logMessages.push('La defensa de ' + this.ownPokemonName + ' aumentó')
        }
      }
      //si atacamos con Somnífero, ponemos el booleano sleeping en true, el rival está dormido
      if (attack === 'Somnífero') {
        if (this.enemyPokemon_sleeping === true) {
          this.logMessages.push('El ' + this.enemyPokemonName + ' enemigo ya está dormido')
        } else {
          this.enemyPokemon_sleeping = true
        }
      }

      this.canUseButtons = false
      //el setTimeout hace que espere 2 segundos antes de que el enemigo ataque, siempre que su vida sea
      // mayor a 0
      if (this.enemyPokemonLife > 0) {
        setTimeout(this.enemyAttack, 2000)
      }
    },

    /**
     *
     * MÉTODO PARA EL ATAQUE DEL POKEMON ENEMIGO
     *
     */
    enemyAttack() {
      //limpiamos el combat log antes de lanzar el ataque del enemigo
      this.logMessages = []
      //asignamos a la variable un número aleatorio del total de ataques del Pokémon enemigo
      this.enemyPokemonChosenAttack = Math.floor(Math.random() * this.enemyPokemonAttacks.length)
      //reasignamos a la misma variable el nombre del ataque de esa posición del array
      this.enemyPokemonChosenAttack = this.enemyPokemonAttacks[this.enemyPokemonChosenAttack]

      //cuando el rival lleva 3 turnos dormido, se despierta y devolvemos los turnos a 0
      if (this.enemyPokemon_turnSleeping === 3) {
        this.enemyPokemon_sleeping = false
        this.logMessages.push('El ' + this.enemyPokemonName + ' enemigo se despertó')
        this.enemyPokemon_turnSleeping = 0
      }
      //si el rival está dormido, vamos sumando turnos y no puede atacar
      if (this.enemyPokemon_sleeping === true) {
        this.enemyPokemonChosenAttack = ''
        this.enemyPokemon_turnSleeping += 1
        this.logMessages.push('El ' + this.enemyPokemonName + ' enemigo está dormido')
      } else {
        this.logMessages.push(
          'El ' + this.enemyPokemonName + ' enemigo usó ' + this.enemyPokemonChosenAttack
        )
      }

      //a partir de aquí toca hacer un condicional para que cada ataque cumpla su función
      if (
        this.enemyPokemonChosenAttack === 'Placaje' ||
        this.enemyPokemonChosenAttack === 'Arañazo' ||
        this.enemyPokemonChosenAttack === 'Impactrueno'
      ) {
        this.ownPokemonLife -= this.enemyPokemonPowerAttack * 2 - this.ownPokemonPowerDefense
        this.logMessages.push(
          'Los puntos de vida de ' + this.ownPokemonName + ' han bajado a ' + this.ownPokemonLife
        )
      }

      if (
        this.enemyPokemonChosenAttack === 'Látigo cepa' ||
        this.enemyPokemonChosenAttack === 'Ascuas' ||
        this.enemyPokemonChosenAttack === 'Pistola agua' ||
        this.enemyPokemonChosenAttack === 'Cola férrea' ||
        this.enemyPokemonChosenAttack === 'Poder pasado' ||
        this.enemyPokemonChosenAttack === 'Confusión'
      ) {
        this.ownPokemonLife -= this.enemyPokemonPowerAttack * 3 - this.ownPokemonPowerDefense
        this.logMessages.push(
          'Los puntos de vida de ' + this.ownPokemonName + ' han bajado a ' + this.ownPokemonLife
        )
      }

      if (this.enemyPokemonChosenAttack === 'Drenadoras') {
        if (this.ownPokemon_drained === true) {
          this.logMessages.push(this.ownPokemonName + ' ya está infectado')
        } else {
          this.ownPokemon_drained = true
        }
      }

      if (this.ownPokemon_turnDrain === 4) {
        this.ownPokemon_drained = false
        this.logMessages.push(this.ownPokemonName + ' se deshizo de las Drenadoras')
        this.ownPokemon_turnDrain = 0
      }

      if (this.ownPokemon_drained === true) {
        this.ownPokemon_turnDrain += 1
        this.ownPokemon_hpDrained = this.enemyPokemonPowerAttack / 2
        this.ownPokemonLife -= this.ownPokemon_hpDrained
        this.logMessages.push(
          this.ownPokemonName +
            ' ha perdido ' +
            this.enemyPokemon_hpDrained +
            ' puntos de vida a causa de las Drenadoras'
        )
        this.enemyPokemonLife += this.ownPokemon_hpDrained
        this.logMessages.push(
          'El ' +
            this.enemyPokemonName +
            ' enemigo ha recuperado ' +
            this.ownPokemon_hpDrained +
            ' puntos de vida gracias a las Drenadoras'
        )
        if (this.enemyPokemonLife > 20) {
          this.enemyPokemonLife = 20
        }
      }

      if (this.enemyPokemonChosenAttack === 'Recuperación') {
        this.enemyPokemonLife += 5
        if (this.enemyPokemonLife > 40) {
          this.enemyPokemonLife = 40
        }
        this.logMessages.push(
          'El ' + this.enemyPokemonName + ' enemigo ha recuperado 5 puntos de vida'
        )
      }

      if (
        this.enemyPokemonChosenAttack === 'Dragoaliento' ||
        this.enemyPokemonChosenAttack === 'Mordisco' ||
        this.enemyPokemonChosenAttack === 'Trueno' ||
        this.enemyPokemonChosenAttack === 'Psíquico'
      ) {
        this.ownPokemonLife -= this.enemyPokemonPowerAttack * 2
        this.logMessages.push(
          'Los puntos de vida de ' + this.ownPokemonName + ' han bajado a ' + this.ownPokemonLife
        )
      }

      if (
        this.enemyPokemonChosenAttack === 'Cara susto' ||
        this.enemyPokemonChosenAttack === 'Chirrido'
      ) {
        if (this.ownPokemonPowerDefense === 0) {
          this.logMessages.push('La defensa de ' + this.ownPokemonName + ' no puede bajar más')
        } else {
          this.ownPokemonPowerDefense -= 1
          this.logMessages.push('La defensa de ' + this.ownPokemonName + ' bajó')
        }
      }

      if (
        this.enemyPokemonChosenAttack === 'Refugio' ||
        this.enemyPokemonChosenAttack === 'Encanto'
      ) {
        if (this.enemyPokemonPowerDefense === 4) {
          this.logMessages.push(
            'La defensa del ' + this.enemyPokemonName + ' enemigo no puede subir más'
          )
        } else {
          this.enemyPokemonPowerDefense += 1
          this.logMessages.push('La defensa del ' + this.enemyPokemonName + ' enemigo aumentó')
        }
      }

      if (this.enemyPokemonChosenAttack === 'Somnífero') {
        if (this.ownPokemon_sleeping === true) {
          this.logMessages.push(this.ownPokemonName + ' ya está dormido')
        } else {
          this.ownPokemon_sleeping = true
        }
      }

      //tras 2 segundos desde que finaliza el ataque, si la vida del Pokémon propio es mayor que 0, se
      //ejecuta la función setcanUseButtons para que aparezcan de nuevo los botones de ataque
      if (this.ownPokemonLife > 0) {
        setTimeout(this.setcanUseButtons, 2000)
      }
    },
    //método para obtener el porcentaje de la barra de vida del Pokémon enemigo y pintarla en la pantalla
    getEnemyBarWidth() {
      //la multiplicamos por 85 para que la barra ocupe el 85% del espacio, dado que si ocupa el 100%
      //se aplasta con la cajita de HP: y en el primer ataque no se ve que baje la vida
      let lifePercentage = (this.enemyPokemonLife * 85) / this.enemyPokemonTotalLife
      let barColor

      if (lifePercentage <= 100 && lifePercentage > 50) {
        barColor = 'rgb(26, 201, 26)'
      }

      if (lifePercentage <= 50 && lifePercentage > 15) {
        barColor = 'rgb(231, 154, 10)'
      }

      if (lifePercentage <= 15 && lifePercentage > 0) {
        barColor = 'rgb(233, 7, 7)'
      }

      if (this.enemyPokemonLife <= 0) {
        return 'width: 0%'
      } else {
        return (
          'width: ' +
          lifePercentage +
          '%; background-color: ' +
          barColor +
          ';transition: width 0.5s linear;'
        )
      }
    },
    //método para obtener la barra de vida del Pokémon propio y pintarla en la pantalla
    getOwnBarWidth() {
      //la multiplicamos por 85 para que la barra ocupe el 85% del espacio, dado que si ocupa el 100%
      //se aplasta con la cajita de HP: y en el primer ataque no se ve que baje la vida
      let lifePercentage = (this.ownPokemonLife * 85) / this.ownPokemonTotalLife
      let barColor

      if (lifePercentage <= 100 && lifePercentage > 50) {
        barColor = 'rgb(26, 201, 26)'
      }

      if (lifePercentage <= 50 && lifePercentage > 15) {
        barColor = 'rgb(231, 154, 10)'
      }

      if (lifePercentage <= 15 && lifePercentage > 0) {
        barColor = 'rgb(233, 7, 7)'
      }

      if (this.ownPokemonLife <= 0) {
        return 'width: 0%'
      } else {
        return (
          'width: ' +
          lifePercentage +
          '%; background-color: ' +
          barColor +
          ';transition: width 0.5s linear;'
        )
      }
    },
    //método para cambiar el valor de canUseButtons a true
    setcanUseButtons() {
      this.canUseButtons = true
    },
    //método para apagar la Game Boy y regresar al listado de los Pokémon
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
  font-size: 40px;
  padding-top: 5px;
  padding-left: 10px;
  font-family: 'pokemon';
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
  height: 25%;
  margin: auto 0 auto 0;
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
  font-size: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding-top: 5px;
  padding-right: 10px;
  font-family: 'pokemon';
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
  height: 15%;
  margin: auto 5px 130px 0;
}

.gameboyScreen__top--log {
  height: 30%;
  width: 90%;
  margin: 0px auto 10px auto;
  border: 5px solid rgb(0, 0, 0);
  box-sizing: border-box;
}

ul {
  list-style: none;
}

.gameboyScreen__top--logMessage {
  font-size: 20px;
  font-family: 'pokemon';
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
  font-family: 'pokemon';
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.attackButton:active {
  transform: scale(0.9);
}
</style>
