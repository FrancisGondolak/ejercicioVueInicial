<template>
    <div class="c-pokemon" :style=getColor(pokemonshown.type) @click=pulsaPokemon>
        <div class="c-pokemon__info">
            <span class="c-pokemon--name">Nombre: {{ pokemonshown.name }}</span>
            <span class="c-pokemon--type">Tipo: {{ pokemonshown.type }}</span>
            <span class="c-pokemon--number">Número: {{ pokemonshown.number }}</span>
        </div>
        <div class="c-pokemon__image">
            <img class="pokeImage" :src="pokemonshown.image" :alt="'imagen' + pokemonshown.name">
        </div>  
    </div>
</template>

<script>

export default {
    name: "c-pokemondetails",
    props: {
        pokemonshown: {
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
        return "background-color: var(--color-PokemonType--" + this.pokemonshown.type +");";
      },
      pulsaPokemon() {
        this.$emit('pokemonUnselected', this.selected);  
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