<template>
    <div class="c-pokemondetails" @click=pulsaPokemon>
        <!-- <div class="c-pokemondetails__info">
            <span class="c-pokemondetails--name">Nombre: {{ pokemonshown.name }}</span>
            <span class="c-pokemondetails--type">Tipo: {{ pokemonshown.type }}</span>
            <span class="c-pokemondetails--number">Número: {{ pokemonshown.number }}</span>
        </div> -->
        <div class="c-pokemondetails__image">
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

<style lang="scss" scoped>

  .c-pokemondetails {
    border: 5px solid black;
    border-radius: 15px;
    margin-top: 20px;
    height: 555px;
    width: 100%;
    padding: 5px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--color-shadow-boxPokemon);
    cursor: pointer;
  }

  .c-pokemondetails__info {
    width: 50%;
    display: flex;
    flex-direction: column;
    text-align: center;
    background-color: red;
  }

  .c-pokemondetails__image{   
    width: 100%;
    display: flex;
    justify-content: space-around;
  }

  .pokeImage {
    width: 165px;
    height: 165px;
    margin-bottom: 50px;
    margin-right: auto;
    margin-left: auto;
    border-radius: 10%;
  }

</style>