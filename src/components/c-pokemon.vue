<template>
  <div class="c-pokemon" :style="getColor(pokemon.type)">
    <div class="c-pokemon__info">
      <span class="c-pokemon--name">{{ pokemon.name }}</span>
    </div>
    <div class="c-pokemon__pokemonImage" v-if="!pokeball">
      <img
        class="pokemonImage"
        :src="pokemon.image"
        :alt="'imagen' + pokemon.name"
        @mouseleave="openPokeball"
      />
      <audio autoplay src="src/components/assets/audio/pokeballOpen.mp3"></audio>
    </div>
    <div v-else class="c-pokemon__pokeballImage">
      <img
        class="pokeballImage"
        src="src/components/assets/images/pokeball.png"
        alt="pokeballIcon"
        @click="openPokeball"
      />
    </div>
    <button class="pokedexButton" @click="openPokedex">Pokédex</button>
  </div>
</template>

<script>
export default {
  name: 'c-pokemon',
  props: {
    pokemon: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      selected: true,
      pokeball: true
    }
  },
  methods: {
    getColor(type) {
      return 'background-color: var(--color-PokemonType--' + type + ');'
    },
    openPokedex() {
      this.$router.push({ name: 'pokedex', params: { pokemonNumber: this.pokemon.number } })
    },
    openPokeball() {
      this.pokeball = !this.pokeball
    }
  }
}
</script>

<style lang="scss" scoped>
.c-pokemon {
  border: 5px solid black;
  border-radius: 15px;
  margin-top: 15px;
  padding: 5px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--color-shadow-boxPokemon);
}

.c-pokemon__info {
  width: 60%;
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 6%;
  font-size: 22px;
  font-weight: bold;
  font-family: 'pokemon';
  cursor: default;
}

.c-pokemon__pokemonImage {
  width: 40%;
  display: flex;
  justify-content: space-around;
  :hover {
    transition: 2s;
    transform: scale(2.8);
  }
}

.c-pokemon__pokeballImage {
  width: 40%;
  display: flex;
  justify-content: space-around;
  :not(:hover) {
    animation: shake 1s infinite;
  }
}

.c-pokemon__pokeballImage:hover {
  transition: 4s;
  transform: rotate(1440deg);
}

@keyframes shake {
  0% {
    transform: rotate(-10deg);
  }
  25% {
    transform: rotate(10deg);
  }
  50% {
    transform: rotate(-10deg);
  }
  75% {
    transform: rotate(10deg);
  }
  100% {
    transform: rotate(-10deg);
  }
  125% {
    transform: rotate(10deg);
  }
}

.pokemonImage {
  width: 40px;
  height: 40px;
  border-radius: 10%;
  padding: 10px;
  cursor: pointer;
}

.pokeballImage {
  width: 60px;
  height: 60px;
  border-radius: 10%;
  padding: 10px;
  cursor: pointer;
}

.pokedexButton {
  height: 25px;
  margin-top: 85px;
  margin-right: 3px;
  align-items: center;
  background-color: var(--color-button-background);
  color: var(--color-button-text);
  border-radius: 10px;
  box-shadow: var(--color-shadow-boxPokemon);
  cursor: pointer;
}

button:hover {
  transform: scale(0.9);
}
</style>
