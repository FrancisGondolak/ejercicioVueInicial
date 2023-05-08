<template>
    <div class="c-pokedex">
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
              <img class="pokeImage" :src="pokemonshown.image" :alt="'imagen' + pokemonshown.name">
            </div>  
            <div class="c-pokedex__info">
              <span class="c-pokedex--type"><b>Tipo: </b>{{ pokemonshown.type }}</span>
              <span class="c-pokedex--number"><b>Número: </b>{{ pokemonshown.number }}</span>
              <span class="c-pokedex--weight"><b>Peso: </b>{{ pokemonshown.weight }}</span>
              <span class="c-pokedex--height"><b>Altura: </b>{{ pokemonshown.height }}</span>
              <span class="c-pokedex--description"><b>Descripción: </b>{{ pokemonshown.description }}</span>
            </div>
          </section>  
        </section>
        <section class="c-pokedex__bottom">
          <section class="c-pokedex__bottom--top">
            <div class="medium_circle_darkblue"></div>
            <div class="medium_bar_green"></div>
            <div class="medium_bar_yellow"></div>
          </section>
          <section class="c-pokedex__bottom--bottom">
            <div class="long_bar_yellow"></div>
            <div class="medium_circle_red" @click=closePokedex></div>
          </section>
        </section>
    </div>
</template>

<script>

export default {
    name: "c-pokedex",
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
      getColor() {
        return "background-color: var(--color-PokemonType--" + this.pokemonshown.type +");";
      },
      closePokedex() {
        this.$emit('pokemonUnselected', this.selected);  
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
    margin-bottom: 15px;
    display: flex;
    flex-direction: row;
  }

  .big_circle_blue {
    border: var(--color-border-elementsPokedex);
    background: rgb(50, 184, 224);
    border-radius: 50%;
    width: 70px;
    height: 70px;
    margin-top: 5px;
    margin-left: 5px;
  }

  .small_circle_red {
    border: var(--color-border-elementsPokedex);
    background: rgb(255, 17, 0);
    border-radius: 50%;
    width: 35px;
    height: 35px;
    margin-top: 5px;
    margin-left: 5px;
  }

  .small_circle_orange {
    border: var(--color-border-elementsPokedex);
    background: rgb(231, 143, 12);
    border-radius: 50%;
    width: 35px;
    height: 35px;
    margin-top: 5px;
    margin-left: 5px;
  }

  .small_circle_green {
    border: var(--color-border-elementsPokedex);
    background: rgb(12, 231, 23);
    border-radius: 50%;
    width: 35px;
    height: 35px;
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
    background:  rgb(0, 68, 255);
    border-radius: 50%;
    width: 10%;
    height: 50px;
    margin-top: 5px;
    margin-left: 15px;
  }

  .medium_bar_green {
    border: var(--color-border-elementsPokedex);
    background:  rgb(26, 201, 20);
    border-radius: 20px;
    width: 25%;
    height: 30px;
    margin-top: 5px;
    margin-left: 15px;
  }

  .medium_bar_yellow {
    border: var(--color-border-elementsPokedex);
    background:  rgb(196, 199, 27);
    border-radius: 20px;
    width: 25%;
    height: 30px;
    margin-top: 5px;
    margin-left: 15px;
  }
  .c-pokedex__bottom--bottom {
    width: 100%;
    height: 45%;
    display: flex;
  }

  .long_bar_yellow {
    border: var(--color-border-elementsPokedex);
    background:  rgb(196, 199, 27);
    border-radius: 20px;
    width: 75%;
    height: 60px;
    margin-top: 5px;
    margin-left: 15px;
  }

  .medium_circle_red {
    border: 5px solid black;
    background:  rgb(255, 8, 0);
    box-shadow: var(--color-shadow-buttonPokedex);
    border-radius: 50%;
    width: 12%;
    height: 60px;
    margin-top: 5px;
    margin-left: 15px;
    cursor: pointer;
  }

  .medium_circle_red:hover {
    transform: scale(0.9);
  }

</style>