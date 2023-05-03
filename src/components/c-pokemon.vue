<template>
    <div class="c-pokemon" :style=getColor(pokemon.type)>
        <div class="c-pokemon__info">
            <span class="c-pokemon--name">Nombre: {{ pokemon.name }}</span>
            <span class="c-pokemon--type">Tipo: {{ pokemon.type }}</span>
            <span class="c-pokemon--number">Número: {{ pokemon.number }}</span>
        </div>
        <div class="c-pokemon__image">
            <img class="pokeImage" :src="pokemon.image" :alt="'imagen' + pokemon.name">
        </div>  
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
    methods: {
      getColor(type) {
        return "background-color: var(--color-PokemonType--" + this.pokemon.type +");";
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