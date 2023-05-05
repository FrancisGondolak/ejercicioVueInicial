<template>
    <div class="c-pokemondetails" @click=pulsaPokemon>
        <section class="c-pokemondetails__top">
          <div class="big_circle_blue"></div>
          <div class="small_circle_red"></div>
          <div class="small_circle_orange"></div>
          <div class="small_circle_green"></div>
        </section>
        <section class="c-pokemondetails__middle">
          <section class="c-pokemondetails__middle--top">
            <span class="c-pokemondetails--name">{{ pokemonshown.name }}</span>
          </section>
          <section class="c-pokemondetails__middle--bottom">
            <div class="c-pokemondetails__image">
              <img class="pokeImage" :src="pokemonshown.image" :alt="'imagen' + pokemonshown.name">
            </div>  
            <div class="c-pokemondetails__info">
              <span class="c-pokemondetails--type"><b>Tipo: </b>{{ pokemonshown.type }}</span>
              <span class="c-pokemondetails--number"><b>Número: </b>{{ pokemonshown.number }}</span>
              <span class="c-pokemondetails--weight"><b>Peso: </b>{{ pokemonshown.weight }}</span>
              <span class="c-pokemondetails--height"><b>Altura: </b>{{ pokemonshown.height }}</span>
              <span class="c-pokemondetails--description"><b>Descripción: </b>{{ pokemonshown.description }}</span>
            </div>
          </section>  
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
  .c-pokemondetails__middle--top {
    display: flex;
    height: 6%;
    margin-left: auto;
    margin-right: auto;
    font-size: 20px;
    font-weight: bold;
    background-color: rgb(201, 142, 176);
  }

  .c-pokemondetails__middle--bottom {
    display: flex;
    height: 92%;
  }

  .c-pokemondetails__middle {   
    width: 90%;
    height: 100%;
    border: 10px solid gray;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    background-color: white;
  }

  .c-pokemondetails__image {
    width: 50%;
    height: 100%;
    background-color: orange;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pokeImage {
    width: 90%;
    height: 70%;
    background-color: green;
  }

  .c-pokemondetails__info {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: space-evenly;
    margin-right: 2px;
    background-color: yellow;
  }

  .c-pokemondetails__bottom {
    height: 60%;
    width: 100%;
    margin-top: 15px;
    background-color: rgb(108, 108, 212);
  }

</style>