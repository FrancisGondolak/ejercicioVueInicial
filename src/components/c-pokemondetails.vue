<template>
    <div class="c-pokemondetails" @click=pulsaPokemon>
        <section class="c-pokemondetails__top">
          <div class="big_circle_blue"></div>
          <div class="small_circle_red"></div>
          <div class="small_circle_orange"></div>
          <div class="small_circle_green"></div>
        </section>
        <section class="c-pokemondetails__image">
            <img class="pokeImage" :src="pokemonshown.image" :alt="'imagen' + pokemonshown.name">
            <div class="c-pokemondetails__info">
              <span class="c-pokemondetails--name">Nombre: {{ pokemonshown.name }}</span>
              <span class="c-pokemondetails--type">Tipo: {{ pokemonshown.type }}</span>
              <span class="c-pokemondetails--number">Número: {{ pokemonshown.number }}</span>
              <span class="c-pokemondetails--weight">Peso: {{ pokemonshown.weight }}</span>
              <span class="c-pokemondetails--height">Altura: {{ pokemonshown.height }}</span>
              <span class="c-pokemondetails--description">Descripción: {{ pokemonshown.description }}</span>
            </div>
        </section>
        <section class="c-pokemondetails__bottom">
          <p>Iconillos de abajo</p>
        </section>
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
    height: 600px;
    width: 100%;
    padding: 5px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: var(--color-shadow-boxPokemon);
    background-color: red;
    cursor: pointer;
  }

  .c-pokemondetails__info {
    width: 50%;
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  .c-pokemondetails__top {
    width: 100%;
    background-color: purple;
    margin-bottom: 15px;
    display: flex;
    flex-direction: row;
  }

  .big_circle_blue {
    border: 3px solid black;
    background: rgb(50, 184, 224);
    border-radius: 50%;
    width: 70px;
    height: 70px;
    margin-top: 5px;
    margin-left: 5px;
  }

  .small_circle_red {
    border: 3px solid black;
    background: rgb(231, 27, 12);
    border-radius: 50%;
    width: 35px;
    height: 35px;
    margin-top: 5px;
    margin-left: 5px;
  }

  .small_circle_orange {
    border: 3px solid black;
    background: rgb(231, 143, 12);
    border-radius: 50%;
    width: 35px;
    height: 35px;
    margin-top: 5px;
    margin-left: 5px;
  }

  .small_circle_green {
    border: 3px solid black;
    background: rgb(12, 231, 23);
    border-radius: 50%;
    width: 35px;
    height: 35px;
    margin-top: 5px;
    margin-left: 5px;
  }

  .c-pokemondetails__image {   
    width: 90%;
    height: 100%;
    border: 10px solid gray;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    background-color: white;
  }

  .pokeImage {
    width: 200px;
    height: 200px;
    margin: auto auto auto 5px;
    background-color: green;
  }

  .c-pokemondetails__bottom {
    height: 60%;
    width: 100%;
    margin-top: 15px;
    background-color: rgb(108, 108, 212);
  }

</style>