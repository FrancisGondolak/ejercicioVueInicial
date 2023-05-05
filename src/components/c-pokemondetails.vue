<template>
    <div class="c-pokemondetails" @click=pulsaPokemon>
        <!-- <div class="c-pokemondetails__info">
            <span class="c-pokemondetails--name">Nombre: {{ pokemonshown.name }}</span>
            <span class="c-pokemondetails--type">Tipo: {{ pokemonshown.type }}</span>
            <span class="c-pokemondetails--number">Número: {{ pokemonshown.number }}</span>
        </div> -->
        <section class="c-pokemondetails__top">
          <div class="big_circle_blue"></div>
          <div class="small_circle_red"></div>
          <div class="small_circle_orange"></div>
          <div class="small_circle_green"></div>
        </section>
        <section class="c-pokemondetails__image">
            <img class="pokeImage" :src="pokemonshown.image" :alt="'imagen' + pokemonshown.name">
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

  // .c-pokemondetails__info {
  //   width: 50%;
  //   display: flex;
  //   flex-direction: column;
  //   text-align: center;
  // }

  .c-pokemondetails__top {
    height: 100%;
    width: 100%;
    background-color: purple;
  }

  .big_circle_blue {
    background: rgb(50, 184, 224);
    border-radius: 50%;
    width: 70px;
    height: 70px;
    margin-top: 5px;
    margin-left: 5px;
  }

  .small_circle_red {
    
  }

  .c-pokemondetails__image {   
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    background-color: white;
  }

  .pokeImage {
    width: 200px;
    height: 200px;
    margin-right: auto;
    margin-left: auto;
    border-radius: 10%;
    background-color: green;
  }

  .c-pokemondetails__bottom {
    height: 100%;
    width: 100%;
    background-color: rgb(108, 108, 212);
  }

</style>