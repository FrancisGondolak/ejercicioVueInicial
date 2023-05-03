<template>
    <div v-if="!selected" class="c-pokemon" :style=getColor(pokemon.type) @click=pulsaPokemon>
        <div class="c-pokemon__info">
            <span class="c-pokemon--name">Nombre: {{ pokemon.name }}</span>
            <span class="c-pokemon--type">Tipo: {{ pokemon.type }}</span>
            <span class="c-pokemon--number">Número: {{ pokemon.number }}</span>
        </div>
        <div class="c-pokemon__image">
            <img class="pokeImage" :src="pokemon.image" :alt="'imagen' + pokemon.name">
        </div>  
    </div>   
    <div v-else>
      <p @click="pulsaPokemon">HOLA QUE TAL</p>
    </div>
</template>

<script>

export default {
    name: "c-pokemon",
    props: {
        pokemon: {
            type: Object,
            required: true
        }
    },
    data() {
      return {
        selected: false
      }
    },
    methods: {
      getColor(type) {
        return "background-color: var(--color-PokemonType--" + this.pokemon.type +");";
      },
      avisame(name) {
        alert("Has pulsado sobre " + name);
      },
      redirigeme() {
        this.$router.push({name:'home'});
      },
      pulsaPokemon() {
        this.selected = !this.selected;
      }
    }

}
</script>

<style lang="scss">

  .c-pokemon {
    border: 5px solid black;
    border-radius: 15px;
    margin-top: 20px;
    padding: 5px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--color-shadow-boxPokemon);
  }

  .c-pokemon__info {
    width: 50%;
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  .c-pokemon__image{   
    width: 50%;
    display: flex;
    justify-content: space-around;
  }

  .pokeImage {
    width: 100px;
    height: 100px;
    border-radius: 10%;
  }

</style>