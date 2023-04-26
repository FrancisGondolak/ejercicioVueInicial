<template>
    <div class="c-pokemon">
        <span class="c-pokemon--name">Nombre: {{ pokemon.name }}</span>
        <span class="c-pokemon--type">Tipo: {{ pokemon.type }}</span>
        <span class="c-pokemon--number">Número: {{ pokemon.number }}</span>
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
    //HACER UNA COMPUTADA QUE, SEGÚN EL TIPO DEL POKEMON, LE PONGA LAS
    //LETRAS DE UN COLOR U OTRO
}
</script>

<style lang="scss">

  .c-pokemon {
    border: 5px solid black;
    border-radius: 15px;
    margin-top: 3px;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

</style>