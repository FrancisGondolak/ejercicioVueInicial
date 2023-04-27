<template>
    <div class="c-pokemon">
        <div class="c-pokemon__info">
            <span class="c-pokemon--name">Nombre: {{ pokemon.name }}</span>
            <span class="c-pokemon--type">Tipo: {{ pokemon.type }}</span>
            <span class="c-pokemon--number">Número: {{ pokemon.number }}</span>
        </div>
        <div class="c-pokemon__image">
            <img :src="pokemon.image" alt="imagen + {{ pokemon.name }}">
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
    }
}
</script>

<style lang="scss">

  .c-pokemon {
    border: 5px solid black;
    border-radius: 15px;
    margin-top: 3px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .c-pokemon__info {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: left;
    background-color: aquamarine;
  }

  .c-pokemon__image{   
    width: 50%;
    background-color: brown;
  }

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

</style>