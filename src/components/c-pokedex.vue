<template>
  <div class="c-pokedex">
    <audio autoplay src="src/components/assets/audio/openPokedex.mp3" />
    <section class="c-pokedex__top">
      <div class="big_circle_blue"></div>
      <div class="small_circle_red"></div>
      <div class="small_circle_orange"></div>
      <div class="small_circle_green"></div>
    </section>
    <section class="c-pokedex__middle">
      <section class="c-pokedex__middle--top">
        <span class="c-pokedex--name">{{ pokemonshown.name }}</span>
      </section>
      <section class="c-pokedex__middle--bottom">
        <div class="c-pokedex__image">
          <img
            v-if="imageNumber === -1"
            class="pokeImage"
            :src="pokemonshown.image"
            :alt="'imagen' + pokemonshown.name"
          />
          <img
            v-else
            class="pokeImage"
            :src="pokemonshown.pixel + pokemonshown.name + imageNumber + archiveExtension"
            :alt="'imagenPixel' + pokemonshown.name"
          />
        </div>
        <div class="c-pokedex__info">
          <span class="c-pokedex--type"><b>Tipo: </b>{{ pokemonshown.type }}</span>
          <span class="c-pokedex--number"><b>Número: </b>{{ pokemonshown.number }}</span>
          <span class="c-pokedex--weight"><b>Peso: </b>{{ pokemonshown.weight }}</span>
          <span class="c-pokedex--height"><b>Altura: </b>{{ pokemonshown.height }}</span>
          <span class="c-pokedex--description"
            ><b>Descripción: </b>{{ pokemonshown.description }}</span
          >
        </div>
      </section>
    </section>
    <section class="c-pokedex__bottom">
      <section class="c-pokedex__bottom--top">
        <div class="medium_circle_darkblue" @click="playingAudio">
          <audio autoplay :src="getSound(pokemonshown.name)" v-if="playAudio" />
          <img class="soundIcon" src="src/components/assets/icons/soundIcon.svg" alt="soundIcon" />
        </div>
        <div class="medium_bar_green" @click="imageBack">
          <img
            class="arrowsIcon"
            src="src/components/assets/icons/backIcon.svg"
            alt="backArrowsIcon"
          />
        </div>
        <div class="medium_bar_yellow" @click="imageAdvance">
          <img
            class="arrowsIcon"
            src="src/components/assets/icons/advanceIcon.svg"
            alt="advanceArrowsIcon"
          />
        </div>
      </section>
      <section class="c-pokedex__bottom--bottom">
        <div class="long_bar_yellow">
          <p>
            {{ pokemonshown.description }}
          </p>
        </div>
        <div class="medium_circle_red" @click="closePokedex">
          <img
            class="turnOffIcon"
            src="src/components/assets/icons/turnOffIcon.svg"
            alt="turnOffIcon"
          />
        </div>
      </section>
    </section>
  </div>
</template>

<script>
export default {
  name: 'c-pokedex',
  props: {
    pokemonshown: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      selected: false,
      playAudio: false,
      archiveExtension: '.png',
      imageNumber: -1
    }
  },
  methods: {
    getColor() {
      return 'background-color: var(--color-PokemonType--' + this.pokemonshown.type + ');'
    },
    getSound(name) {
      return 'src/components/assets/audio/' + name + 'Sound.mp3'
    },
    //función para reproducir el audio al pulsar sobre el botón darkblue de la Pokédex. Creamos dentro
    //una función setTimeout para hacer que ponga en false al cabo de 100 ms la variable playAudio y
    //así poder repetir el audio al pulsar sobre el botón
    playingAudio() {
      setTimeout(() => {
        this.playAudio = true
      }, 100)
      this.playAudio = false
    },
    imageAdvance() {
      this.imageNumber += 1

      if (this.imageNumber > 4) {
        this.imageNumber = 4
      }

      if (this.imageNumber === 4) {
        this.archiveExtension = '.gif'
      } else {
        this.archiveExtension = '.png'
      }
    },
    imageBack() {
      this.imageNumber -= 1

      if (this.imageNumber < 0) {
        this.imageNumber = -1
      }

      if (this.imageNumber === 4) {
        this.archiveExtension = '.gif'
      } else {
        this.archiveExtension = '.png'
      }
    },
    closePokedex() {
      // this.$emit('pokemonUnselected', this.selected)
      this.$router.push({ name: 'list' })
    }
  }
}
</script>

<style lang="scss" scoped>
.c-pokedex {
  border: 5px solid black;
  border-radius: 15px;
  margin-top: 20px;
  height: 600px;
  width: 100%;
  padding: 5px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: var(--color-shadow-boxPokemon);
  background-color: var(--color-backgroundPokedex);
}

.c-pokedex__top {
  width: 100%;
  height: 140px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: row;
}

.big_circle_blue {
  border: var(--color-border-elementsPokedex);
  background: rgb(50, 184, 224);
  border-radius: 50%;
  width: 15%;
  height: 100%;
  margin-top: 5px;
  margin-left: 5px;
  position: relative;
  overflow: hidden;
}

.big_circle_blue:after {
  content: '';
  transform: translateX(100%);
  width: 30%;
  height: 120%;
  position: absolute;
  z-index: 1;
  animation: shine 5s infinite;
  background: -webkit-linear-gradient(
    left,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.8) 50%,
    rgba(128, 186, 232, 0) 99%,
    rgba(125, 185, 232, 0) 100%
  );
}

@keyframes shine {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(350%);
  }
}

.small_circle_red {
  border: var(--color-border-elementsPokedex);
  background: rgb(255, 17, 0);
  border-radius: 50%;
  width: 7%;
  height: 50%;
  margin-top: 5px;
  margin-left: 5px;
}

.small_circle_orange {
  border: var(--color-border-elementsPokedex);
  background: rgb(231, 143, 12);
  border-radius: 50%;
  width: 7%;
  height: 50%;
  margin-top: 5px;
  margin-left: 5px;
}

.small_circle_green {
  border: var(--color-border-elementsPokedex);
  background: rgb(12, 231, 23);
  border-radius: 50%;
  width: 7%;
  height: 50%;
  margin-top: 5px;
  margin-left: 5px;
}
.c-pokedex__middle--top {
  display: flex;
  height: 6%;
  margin-left: auto;
  margin-right: auto;
  font-size: 28px;
  font-weight: bold;
  cursor: default;
}

.c-pokedex__middle--bottom {
  display: flex;
  height: 92%;
}

.c-pokedex__middle {
  width: 90%;
  height: 100%;
  border: var(--color-border-screenPokedex);
  border-radius: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  background-color: rgb(255, 255, 255);
}

.c-pokedex__image {
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pokeImage {
  width: 90%;
  height: 70%;
}

.c-pokedex__info {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: space-evenly;
  margin-right: 2px;
  cursor: default;
}

.c-pokedex__bottom {
  height: 60%;
  width: 100%;
  margin-top: 15px;
}

.c-pokedex__bottom--top {
  width: 100%;
  height: 45%;
  display: flex;
}

.medium_circle_darkblue {
  border: var(--color-border-elementsPokedex);
  background: rgb(0, 68, 255);
  border-radius: 50%;
  width: 10%;
  height: 50px;
  margin-top: 5px;
  margin-left: 15px;
  box-shadow: var(--color-shadow-buttonPokedex);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.medium_circle_darkblue:active {
  transform: scale(0.9);
}

.soundIcon {
  width: 80%;
  height: 80%;
}

.medium_bar_green {
  border: var(--color-border-elementsPokedex);
  background: rgb(26, 201, 20);
  border-radius: 20px;
  box-shadow: var(--color-shadow-buttonPokedex);
  width: 25%;
  height: 30px;
  margin-top: 5px;
  margin-left: 15px;
  cursor: pointer;
}

.medium_bar_green:active {
  transform: scale(0.9);
}

.medium_bar_yellow {
  border: var(--color-border-elementsPokedex);
  background: rgb(196, 199, 27);
  border-radius: 20px;
  box-shadow: var(--color-shadow-buttonPokedex);
  width: 25%;
  height: 30px;
  margin-top: 5px;
  margin-left: 15px;
  cursor: pointer;
}

.medium_bar_yellow:active {
  transform: scale(0.9);
}

.arrowsIcon {
  width: 100%;
  height: 100%;
}
.c-pokedex__bottom--bottom {
  width: 100%;
  height: 45%;
  display: flex;
}

.long_bar_yellow {
  border: var(--color-border-elementsPokedex);
  background: rgb(196, 199, 27);
  border-radius: 20px;
  width: 75%;
  height: 60px;
  margin-top: 5px;
  margin-left: 15px;
  color: white;
  overflow: hidden;
  display: flex;
  align-items: center;
}
.long_bar_yellow p {
  animation: textScrolling 30s linear infinite;
  white-space: nowrap;
}
@keyframes textScrolling {
  0% {
    transform: translate(100%, 0%);
  }
  100% {
    transform: translate(-100%, 0%);
  }
}
.medium_circle_red {
  border: 5px solid black;
  background: rgb(255, 8, 0);
  box-shadow: var(--color-shadow-buttonPokedex);
  border-radius: 50%;
  width: 12%;
  height: 60px;
  margin-top: 5px;
  margin-left: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.medium_circle_red:active {
  transform: scale(0.9);
}

.turnOffIcon {
  width: 80%;
  height: 80%;
}
</style>
