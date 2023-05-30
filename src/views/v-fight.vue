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
      ownPokemonAttackModifier: 0,
      ownPokemonDefenseModifier: 0,
      enemyPokemonAttacks: [],
      enemyPokemonChosenAttack: '',
      enemyPokemonTotalLife: '',
      enemyPokemonLife: '',
      enemyPokemonPowerAttack: '',
      enemyPokemonPowerDefense: '',
      enemyPokemonAttackModifier: 0,
      enemyPokemonDefenseModifier: 0,
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
        // this.enemyPokemonLife -= this.ownPokemonPowerAttack * 2 - this.enemyPokemonPowerDefense
        this.enemyPokemonLife -=
          (((2 * 50) / 5 + 2) * this.ownPokemon.attackPoints * 40) /
          this.enemyPokemon.defensePoints /
          50
        this.logMessages.push(
          'Los puntos de vida del ' +
            this.enemyPokemonName +
            ' enemigo han bajado a ' +
            this.enemyPokemonLife
        )
      }

      if (attack === 'Látigo cepa' || attack === 'Ascuas' || attack === 'Pistola agua') {
        // this.enemyPokemonLife -= this.ownPokemonPowerAttack * 3 - this.enemyPokemonPowerDefense
        this.enemyPokemonLife -=
          (((2 * 50) / 5 + 2) * this.ownPokemon.attackPoints * 45) /
          this.enemyPokemon.defensePoints /
          50
        this.logMessages.push(
          'Los puntos de vida del ' +
            this.enemyPokemonName +
            ' enemigo han bajado a ' +
            this.enemyPokemonLife
        )
      }

      if (attack === 'Cola férrea') {
        this.enemyPokemonLife -=
          (((2 * 50) / 5 + 2) * this.ownPokemon.attackPoints * 50) /
          this.enemyPokemon.defensePoints /
          50
        this.logMessages.push(
          'Los puntos de vida del ' +
            this.enemyPokemonName +
            ' enemigo han bajado a ' +
            this.enemyPokemonLife
        )
      }

      if (attack === 'Confusión' || attack === 'Trueno') {
        this.enemyPokemonLife -=
          (((2 * 50) / 5 + 2) * this.ownPokemon.attackPoints * 65) /
          this.enemyPokemon.defensePoints /
          50
        this.logMessages.push(
          'Los puntos de vida del ' +
            this.enemyPokemonName +
            ' enemigo han bajado a ' +
            this.enemyPokemonLife
        )
      }

      if (attack === 'Poder pasado') {
        this.enemyPokemonLife -=
          (((2 * 50) / 5 + 2) * this.ownPokemon.attackPoints * 70) /
          this.enemyPokemon.defensePoints /
          50
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
      //las drenadoras otorgándoles 1/8 de su vida total y se lo restamos cada turno mientras
      //le afecten. Esos mismos puntos los sumamos a nuestra vida pero sin sobrepasar
      //el total (this.ownPokemonTotalLife), en cuyo caso lo igualamos
      if (this.enemyPokemon_drained === true) {
        this.enemyPokemon_turnDrain += 1
        this.enemyPokemon_hpDrained = this.enemyPokemonTotalLife / 8
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
        if (this.ownPokemonLife > this.ownPokemonTotalLife) {
          this.ownPokemonLife = this.ownPokemonTotalLife
        }
      }

      //con Recuperación, recuperamos 1/3 de la vida total, sin sobrepasar el límite
      if (attack === 'Recuperación') {
        this.ownPokemonLife += this.ownPokemonTotalLife / 3
        if (this.ownPokemonLife > this.ownPokemonTotalLife) {
          this.ownPokemonLife = this.ownPokemonTotalLife
        }
        this.logMessages.push(this.ownPokemonName + ' ha recuperado vida')
      }

      if (attack === 'Dragoaliento' || attack === 'Mordisco') {
        this.enemyPokemonLife -=
          (((2 * 50) / 5 + 2) * this.ownPokemon.attackPoints * 60) /
          this.enemyPokemon.defensePoints /
          50
        this.logMessages.push(
          'Los puntos de vida del ' +
            this.enemyPokemonName +
            ' enemigo han bajado a ' +
            this.enemyPokemonLife
        )
      }

      if (attack === 'Psíquico') {
        this.enemyPokemonLife -=
          (((2 * 50) / 5 + 2) * this.ownPokemon.attackPoints * 75) /
          this.enemyPokemon.defensePoints /
          50
        this.logMessages.push(
          'Los puntos de vida del ' +
            this.enemyPokemonName +
            ' enemigo han bajado a ' +
            this.enemyPokemonLife
        )
      }

      //Cuando usamos Cara susto o Chirrido, bajamos un punto el modificador de defensa seteado a 0 según
      //comienza el combate. Cada posibilidad va modificando el valor de su defensa entre dividendos más
      //grandes hasta llegar a -6, momento en el que no se puede bajar más. Si el enemigo usa un ataque que
      //aumente su defensa, se la vamos a ir restando para dejársela al valor normal antes de comenzar a
      //afectarla negativamente por debajo de dicho valor
      if (attack === 'Cara susto' || attack === 'Chirrido') {
        if (this.enemyPokemonDefenseModifier === -6) {
          this.logMessages.push(
            'La defensa del ' + this.enemyPokemonName + ' enemigo no puede bajar más'
          )
        } else {
          this.enemyPokemonDefenseModifier -= 1
          this.logMessages.push('La defensa del ' + this.enemyPokemonName + ' enemigo bajó')
        }

        if (this.enemyPokemonDefenseModifier === 5) {
          this.enemyPokemon.defensePoints = (this.enemyPokemonPowerDefense / 2) * 7
        }

        if (this.enemyPokemonDefenseModifier === 4) {
          this.enemyPokemon.defensePoints = (this.enemyPokemonPowerDefense / 2) * 6
        }

        if (this.enemyPokemonDefenseModifier === 3) {
          this.enemyPokemon.defensePoints = (this.enemyPokemonPowerDefense / 2) * 5
        }

        if (this.enemyPokemonDefenseModifier === 2) {
          this.enemyPokemon.defensePoints = (this.enemyPokemonPowerDefense / 2) * 4
        }

        if (this.enemyPokemonDefenseModifier === 1) {
          this.enemyPokemon.defensePoints = (this.enemyPokemonPowerDefense / 2) * 3
        }

        //Aquí ya hemos regresado el modificador a 0, haciendo que el enemigo recupere su defensa total,
        //perdiendo su aumento

        if (this.enemyPokemonDefenseModifier === 0) {
          this.enemyPokemon.defensePoints = this.enemyPokemonPowerDefense
        }

        //A partir de aquí le vamos bajando la defensa al enemigo con cada ataque que reciba

        if (this.enemyPokemonDefenseModifier === -1) {
          this.enemyPokemon.defensePoints = (this.enemyPokemonPowerDefense / 3) * 2
        }

        if (this.enemyPokemonDefenseModifier === -2) {
          this.enemyPokemon.defensePoints = (this.enemyPokemonPowerDefense / 4) * 2
        }

        if (this.enemyPokemonDefenseModifier === -3) {
          this.enemyPokemon.defensePoints = (this.enemyPokemonPowerDefense / 5) * 2
        }

        if (this.enemyPokemonDefenseModifier === -4) {
          this.enemyPokemon.defensePoints = (this.enemyPokemonPowerDefense / 6) * 2
        }

        if (this.enemyPokemonDefenseModifier === -5) {
          this.enemyPokemon.defensePoints = (this.enemyPokemonPowerDefense / 7) * 2
        }

        if (this.enemyPokemonDefenseModifier === -6) {
          this.enemyPokemon.defensePoints = (this.enemyPokemonPowerDefense / 8) * 2
        }
      }

      //Encanto es igual que Cara susto o Chirrido pero afectando al ataque del enemigo en lugar de a
      //la defensa
      if (attack === 'Encanto') {
        if (this.enemyPokemonAttackModifier === -6) {
          this.logMessages.push(
            'El ataque del ' + this.enemyPokemonName + ' enemigo no puede bajar más'
          )
        } else {
          this.enemyPokemonAttackModifier -= 1
          this.logMessages.push('El ataque del ' + this.enemyPokemonName + ' enemigo bajó')
        }

        if (this.enemyPokemonAttackModifier === 5) {
          this.enemyPokemon.attackPoints = (this.enemyPokemonPowerAttack / 2) * 7
        }

        if (this.enemyPokemonAttackModifier === 4) {
          this.enemyPokemon.attackPoints = (this.enemyPokemonPowerAttack / 2) * 6
        }

        if (this.enemyPokemonAttackModifier === 3) {
          this.enemyPokemon.attackPoints = (this.enemyPokemonPowerAttack / 2) * 5
        }

        if (this.enemyPokemonAttackModifier === 2) {
          this.enemyPokemon.attackPoints = (this.enemyPokemonPowerAttack / 2) * 4
        }

        if (this.enemyPokemonAttackModifier === 1) {
          this.enemyPokemon.attackPoints = (this.enemyPokemonPowerAttack / 2) * 3
        }

        //Aquí ya hemos regresado el modificador a 0, haciendo que el enemigo recupere su defensa total,
        //perdiendo su aumento

        if (this.enemyPokemonAttackModifier === 0) {
          this.enemyPokemon.attackPoints = this.enemyPokemonPowerAttack
        }

        //A partir de aquí le vamos bajando la defensa al enemigo con cada ataque que le asestemos

        if (this.enemyPokemonAttackModifier === -1) {
          this.enemyPokemon.attackPoints = (this.enemyPokemonPowerAttack / 3) * 2
        }

        if (this.enemyPokemonAttackModifier === -2) {
          this.enemyPokemon.attackPoints = (this.enemyPokemonPowerAttack / 4) * 2
        }

        if (this.enemyPokemonAttackModifier === -3) {
          this.enemyPokemon.attackPoints = (this.enemyPokemonPowerAttack / 5) * 2
        }

        if (this.enemyPokemonAttackModifier === -4) {
          this.enemyPokemon.attackPoints = (this.enemyPokemonPowerAttack / 6) * 2
        }

        if (this.enemyPokemonAttackModifier === -5) {
          this.enemyPokemon.attackPoints = (this.enemyPokemonPowerAttack / 7) * 2
        }

        if (this.enemyPokemonAttackModifier === -6) {
          this.enemyPokemon.attackPoints = (this.enemyPokemonPowerAttack / 8) * 2
        }
      }

      //Refugio va a jugar con el aumento del índice de defensa del Pokemon que lo usa
      if (attack === 'Refugio') {
        if (this.ownPokemonDefenseModifier === 6) {
          this.logMessages.push('La defensa de ' + this.ownPokemonName + ' no puede subir más')
        } else {
          this.ownPokemonDefenseModifier += 1
          this.logMessages.push('La defensa de ' + this.ownPokemonName + ' aumentó')
        }

        //si estamos con el modificador en negativo, empezamos a recuperar la defensa poco a poco

        if (this.ownPokemonDefenseModifier === -5) {
          this.ownPokemon.defensePoints = (this.ownPokemonPowerDefense / 7) * 2
        }

        if (this.ownPokemonDefenseModifier === -4) {
          this.ownPokemon.defensePoints = (this.ownPokemonPowerDefense / 6) * 2
        }

        if (this.ownPokemonDefenseModifier === -3) {
          this.ownPokemon.defensePoints = (this.ownPokemonPowerDefense / 5) * 2
        }

        if (this.ownPokemonDefenseModifier === -2) {
          this.ownPokemon.defensePoints = (this.ownPokemonPowerDefense / 4) * 2
        }

        if (this.ownPokemonDefenseModifier === -1) {
          this.ownPokemon.defensePoints = (this.ownPokemonPowerDefense / 3) * 2
        }

        //Aquí ya hemos regresado al modificador a 0, recuperando nuestra defensa total

        if (this.ownPokemonDefenseModifier === 0) {
          this.ownPokemon.defensePoints = this.ownPokemonPowerDefense
        }

        //Aquí empezamos a aumentar la defensa

        if (this.ownPokemonDefenseModifier === 1) {
          this.ownPokemon.defensePoints = (this.ownPokemonPowerDefense / 2) * 3
        }

        if (this.ownPokemonDefenseModifier === 2) {
          this.ownPokemon.defensePoints = (this.ownPokemonPowerDefense / 2) * 4
        }

        if (this.ownPokemonDefenseModifier === 3) {
          this.ownPokemon.defensePoints = (this.ownPokemonPowerDefense / 2) * 5
        }

        if (this.ownPokemonDefenseModifier === 4) {
          this.ownPokemon.defensePoints = (this.ownPokemonPowerDefense / 2) * 6
        }

        if (this.ownPokemonDefenseModifier === 5) {
          this.ownPokemon.defensePoints = (this.ownPokemonPowerDefense / 2) * 7
        }

        if (this.ownPokemonDefenseModifier === 6) {
          this.ownPokemon.defensePoints = (this.ownPokemonPowerDefense / 2) * 8
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

      //A PARTIR DE AQUÍ TOCA HACER UN CONDICIONAL PARA CADA TIPO DE ATAQUE

      if (
        this.enemyPokemonChosenAttack === 'Placaje' ||
        this.enemyPokemonChosenAttack === 'Arañazo' ||
        this.enemyPokemonChosenAttack === 'Impactrueno'
      ) {
        this.ownPokemonLife -=
          (((2 * 50) / 5 + 2) * this.enemyPokemon.attackPoints * 40) /
          this.ownPokemon.defensePoints /
          50
        this.logMessages.push(
          'Los puntos de vida de ' + this.ownPokemonName + ' han bajado a ' + this.ownPokemonLife
        )
      }

      if (
        this.enemyPokemonChosenAttack === 'Látigo cepa' ||
        this.enemyPokemonChosenAttack === 'Ascuas' ||
        this.enemyPokemonChosenAttack === 'Pistola agua'
      ) {
        this.ownPokemonLife -=
          (((2 * 50) / 5 + 2) * this.enemyPokemon.attackPoints * 45) /
          this.ownPokemon.defensePoints /
          50
        this.logMessages.push(
          'Los puntos de vida de ' + this.ownPokemonName + ' han bajado a ' + this.ownPokemonLife
        )
      }

      if (this.enemyPokemonChosenAttack === 'Cola férrea') {
        this.ownPokemonLife -=
          (((2 * 50) / 5 + 2) * this.enemyPokemon.attackPoints * 50) /
          this.ownPokemon.defensePoints /
          50
        this.logMessages.push(
          'Los puntos de vida de ' + this.ownPokemonName + ' han bajado a ' + this.ownPokemonLife
        )
      }

      if (
        this.enemyPokemonChosenAttack === 'Confusión' ||
        this.enemyPokemonChosenAttack === 'Trueno'
      ) {
        this.ownPokemonLife -=
          (((2 * 50) / 5 + 2) * this.enemyPokemon.attackPoints * 65) /
          this.ownPokemon.defensePoints /
          50
        this.logMessages.push(
          'Los puntos de vida de ' + this.ownPokemonName + ' han bajado a ' + this.ownPokemonLife
        )
      }

      if (this.enemyPokemonChosenAttack === 'Poder pasado') {
        this.ownPokemonLife -=
          (((2 * 50) / 5 + 2) * this.enemyPokemon.attackPoints * 70) /
          this.ownPokemon.defensePoints /
          50
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
        this.ownPokemon_hpDrained = this.ownPokemonTotalLife / 8
        this.ownPokemonLife -= this.ownPokemon_hpDrained
        this.logMessages.push(
          this.ownPokemonName +
            ' ha perdido ' +
            this.ownPokemon_hpDrained +
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
        if (this.enemyPokemonLife > this.enemyPokemonTotalLife) {
          this.enemyPokemonLife = this.enemyPokemonTotalLife
        }
      }

      if (this.enemyPokemonChosenAttack === 'Recuperación') {
        this.enemyPokemonLife += this.enemyPokemonTotalLife / 3
        if (this.enemyPokemonLife > this.enemyPokemonTotalLife) {
          this.enemyPokemonLife = this.enemyPokemonTotalLife
        }
        this.logMessages.push('El ' + this.enemyPokemonName + ' enemigo ha recuperado vida')
      }

      if (
        this.enemyPokemonChosenAttack === 'Dragoaliento' ||
        this.enemyPokemonChosenAttack === 'Mordisco'
      ) {
        this.ownPokemonLife -=
          (((2 * 50) / 5 + 2) * this.enemyPokemon.attackPoints * 60) /
          this.ownPokemon.defensePoints /
          50
        this.logMessages.push(
          'Los puntos de vida de ' + this.ownPokemonName + ' han bajado a ' + this.ownPokemonLife
        )
      }

      if (this.enemyPokemonChosenAttack === 'Psíquico') {
        this.ownPokemonLife -=
          (((2 * 50) / 5 + 2) * this.enemyPokemon.attackPoints * 75) /
          this.ownPokemon.defensePoints /
          50
        this.logMessages.push(
          'Los puntos de vida de ' + this.ownPokemonName + ' han bajado a ' + this.ownPokemonLife
        )
      }

      if (
        this.enemyPokemonChosenAttack === 'Cara susto' ||
        this.enemyPokemonChosenAttack === 'Chirrido'
      ) {
        if (this.ownPokemonDefenseModifier === -6) {
          this.logMessages.push('La defensa de ' + this.ownPokemonName + ' no puede bajar más')
        } else {
          this.ownPokemonDefenseModifier -= 1
          this.logMessages.push('La defensa de ' + this.ownPokemonName + ' bajó')
        }

        if (this.ownPokemonDefenseModifier === 5) {
          this.ownPokemon.defensePoints = (this.ownPokemonPowerDefense / 2) * 7
        }

        if (this.ownPokemonDefenseModifier === 4) {
          this.ownPokemon.defensePoints = (this.ownPokemonPowerDefense / 2) * 6
        }

        if (this.ownPokemonDefenseModifier === 3) {
          this.ownPokemon.defensePoints = (this.ownPokemonPowerDefense / 2) * 5
        }

        if (this.ownPokemonDefenseModifier === 2) {
          this.ownPokemon.defensePoints = (this.ownPokemonPowerDefense / 2) * 4
        }

        if (this.ownPokemonDefenseModifier === 1) {
          this.ownPokemon.defensePoints = (this.ownPokemonPowerDefense / 2) * 3
        }

        if (this.ownPokemonDefenseModifier === 0) {
          this.ownPokemon.defensePoints = this.ownPokemonPowerDefense
        }

        if (this.ownPokemonDefenseModifier === -1) {
          this.ownPokemon.defensePoints = (this.ownPokemonPowerDefense / 3) * 2
        }

        if (this.ownPokemonDefenseModifier === -2) {
          this.ownPokemon.defensePoints = (this.ownPokemonPowerDefense / 4) * 2
        }

        if (this.ownPokemonDefenseModifier === -3) {
          this.ownPokemon.defensePoints = (this.ownPokemonPowerDefense / 5) * 2
        }

        if (this.ownPokemonDefenseModifier === -4) {
          this.ownPokemon.defensePoints = (this.ownPokemonPowerDefense / 6) * 2
        }

        if (this.ownPokemonDefenseModifier === -5) {
          this.ownPokemon.defensePoints = (this.ownPokemonPowerDefense / 7) * 2
        }

        if (this.ownPokemonDefenseModifier === -6) {
          this.ownPokemon.defensePoints = (this.ownPokemonPowerDefense / 8) * 2
        }
      }

      if (this.enemyPokemonChosenAttack === 'Encanto') {
        if (this.ownPokemonAttackModifier === -6) {
          this.logMessages.push('El ataque de ' + this.ownPokemonName + ' no puede bajar más')
        } else {
          this.ownPokemonAttackModifier -= 1
          this.logMessages.push('El ataque de ' + this.ownPokemonName + ' bajó')
        }

        if (this.ownPokemonAttackModifier === 5) {
          this.ownPokemon.attackPoints = (this.ownPokemonPowerAttack / 2) * 7
        }

        if (this.ownPokemonAttackModifier === 4) {
          this.ownPokemon.attackPoints = (this.ownPokemonPowerAttack / 2) * 6
        }

        if (this.ownPokemonAttackModifier === 3) {
          this.ownPokemon.attackPoints = (this.ownPokemonPowerAttack / 2) * 5
        }

        if (this.ownPokemonAttackModifier === 2) {
          this.ownPokemon.attackPoints = (this.ownPokemonPowerAttack / 2) * 4
        }

        if (this.ownPokemonAttackModifier === 1) {
          this.ownPokemon.attackPoints = (this.ownPokemonPowerAttack / 2) * 3
        }

        if (this.ownPokemonAttackModifier === 0) {
          this.ownPokemon.attackPoints = this.ownPokemonPowerAttack
        }

        if (this.ownPokemonAttackModifier === -1) {
          this.ownPokemon.attackPoints = (this.ownPokemonPowerAttack / 3) * 2
        }

        if (this.ownPokemonAttackModifier === -2) {
          this.ownPokemon.attackPoints = (this.ownPokemonPowerAttack / 4) * 2
        }

        if (this.ownPokemonAttackModifier === -3) {
          this.ownPokemon.attackPoints = (this.ownPokemonPowerAttack / 5) * 2
        }

        if (this.ownPokemonAttackModifier === -4) {
          this.ownPokemon.attackPoints = (this.ownPokemonPowerAttack / 6) * 2
        }

        if (this.ownPokemonAttackModifier === -5) {
          this.ownPokemon.attackPoints = (this.ownPokemonPowerAttack / 7) * 2
        }

        if (this.ownPokemonAttackModifier === -6) {
          this.ownPokemon.attackPoints = (this.ownPokemonPowerAttack / 8) * 2
        }
      }

      if (this.enemyPokemonChosenAttack === 'Refugio') {
        if (this.enemyPokemonDefenseModifier === 6) {
          this.logMessages.push(
            'La defensa del ' + this.enemyPokemonName + ' enemigo no puede subir más'
          )
        } else {
          this.enemyPokemonDefenseModifier += 1
          this.logMessages.push('La defensa del ' + this.enemyPokemonName + ' enemigo aumentó')
        }

        if (this.enemyPokemonDefenseModifier === -5) {
          this.enemyPokemon.defensePoints = (this.enemyPokemonPowerDefense / 7) * 2
        }

        if (this.enemyPokemonDefenseModifier === -4) {
          this.enemyPokemon.defensePoints = (this.enemyPokemonPowerDefense / 6) * 2
        }

        if (this.enemyPokemonDefenseModifier === -3) {
          this.enemyPokemon.defensePoints = (this.enemyPokemonPowerDefense / 5) * 2
        }

        if (this.enemyPokemonDefenseModifier === -2) {
          this.enemyPokemon.defensePoints = (this.enemyPokemonPowerDefense / 4) * 2
        }

        if (this.enemyPokemonDefenseModifier === -1) {
          this.enemyPokemon.defensePoints = (this.enemyPokemonPowerDefense / 3) * 2
        }

        if (this.enemyPokemonDefenseModifier === 0) {
          this.enemyPokemon.defensePoints = this.enemyPokemonPowerDefense
        }

        if (this.enemyPokemonDefenseModifier === 1) {
          this.enemyPokemon.defensePoints = (this.enemyPokemonPowerDefense / 2) * 3
        }

        if (this.enemyPokemonDefenseModifier === 2) {
          this.enemyPokemon.defensePoints = (this.enemyPokemonPowerDefense / 2) * 4
        }

        if (this.enemyPokemonDefenseModifier === 3) {
          this.enemyPokemon.defensePoints = (this.enemyPokemonPowerDefense / 2) * 5
        }

        if (this.enemyPokemonDefenseModifier === 4) {
          this.enemyPokemon.defensePoints = (this.enemyPokemonPowerDefense / 2) * 6
        }

        if (this.enemyPokemonDefenseModifier === 5) {
          this.enemyPokemon.defensePoints = (this.enemyPokemonPowerDefense / 2) * 7
        }

        if (this.enemyPokemonDefenseModifier === 6) {
          this.enemyPokemon.defensePoints = (this.enemyPokemonPowerDefense / 2) * 8
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
  width: 20vw;
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
  align-items: center;
}

.longStripe__red {
  width: 36.5vw;
  height: 15%;
  margin: 2vh 5px 0.8vh 20px;
  background-color: rgb(168, 12, 12);
}

.longStripe__blue {
  width: 36.5vw;
  height: 15%;
  margin: 0 5px auto 20px;
  background-color: rgb(27, 27, 170);
}

.gameboy__top--letters {
  width: auto;
  padding-left: auto;
}

.gameboy__top--letters > p {
  color: white;
  font-size: 0.95vw;
}

.gameboy__top--rightStripes {
  width: 22%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.shortStripe__red {
  width: 14vw;
  height: 15%;
  margin: 2vh 20px 0.8vh 5px;
  background-color: rgb(168, 12, 12);
}

.shortStripe__blue {
  width: 14vw;
  height: 15%;
  margin: 0 20px auto 5px;
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
  font-size: 1.9vw;
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
  font-size: 1.8vw;
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
  height: 99%;
}

.ownPokemonData {
  width: 60%;
  display: flex;
  flex-direction: column;
  // background-color: rgb(173, 118, 118);
}

.ownPokemonData__name {
  height: 30%;
  font-size: 1.9vw;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding-top: 5px;
  padding-right: 10px;
  margin-bottom: 10px;
  font-family: 'pokemon';
  // border: 5px solid green;
}

.ownPokemonData__life {
  height: 65%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  // border: 5px solid blue;
}

.ownPokemonData__life--HPIcon {
  width: 10%;
  height: 28%;
  color: rgb(206, 206, 32);
  font-size: 1.8vw;
  text-align: center;
  background-color: black;
}

.ownPokemonData__life--bar {
  height: 15%;
  margin-top: 1vh;
}

.gameboyScreen__top--log {
  height: 30%;
  width: 90%;
  margin: 0px auto 10px auto;
  border: 5px solid rgb(0, 0, 0);
  box-sizing: border-box;
  display: flex;
  align-items: center;
}

ul {
  list-style: none;
}

.gameboyScreen__top--logMessage {
  font-size: 0.7vw;
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
  font-size: 0.7vw;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.attackButton:active {
  transform: scale(0.9);
}
</style>
