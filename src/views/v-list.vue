<template>
    <l-list>
        <template #pokeballIcon>
            <c-pokeball 
            src="src/components/assets/images/pokeball.png"
            alt="pokeballIcon"
            ></c-pokeball>
        </template>
        <template #title>
            <img v-if="!select" class="tituloLista" src="src/components/assets/images/listadoPokemon.png" alt="tituloLista">
            <img v-else class="tituloLista" src="src/components/assets/images/pokedex.png" alt="tituloLista">
        </template>
        <!-- este template, el listado completo de Pokémon, sólo se va a mostrar cuando la variable 
        select esté en false -->
        <template #pokemonList v-if="!select">
            <!-- @pokemonSelected significa que está a la escucha de ese evento que le viene desde
            el hijo (c-pokemon) y en cuanto reciba aviso va a ejecutar el método selectedPokemon,
            situado en methods, abajo -->
            <c-pokemon 
                v-for="character in characters" 
                :key="character.number" 
                :pokemon="character"
                @pokemonSelected="selectedPokemon"
            >
            </c-pokemon>
        </template>
        <!-- cuando la variable select esté en true, va a mostrar este otro template. Recibe además
        el aviso cuando el pokemon ha dejado de estar seleccionado (con el evento pokemonUnselected)
        poniendo la variable select de nuevo en false para que se muestre el listado Pokémon-->
        <template #pokedex v-else>
            <c-pokedex
                :pokemonshown="pokemonshown"
                @pokemonUnselected="unselectedPokemon"
            >
            </c-pokedex>
        </template>
    </l-list>
</template>


       

<script>

import { charactersStore } from '@/stores/characters';
import LList from '@/layouts/l-list.vue';
import CPokemon from '@/components/c-pokemon.vue';
import CPokeball from '@/components/c-pokeball.vue';
import CPokedex from '@/components/c-pokedex.vue';

    export default {
        name: "v-list",

        components: {
            LList,
            CPokemon,
            CPokeball,
            CPokedex
        },

        data() {
            return {
                characters: [],
                fetched: false,
                error: false,
                select: false,
                pokemonshown: {}
            }
        },

        props: {},

        watch: {},

        computed: {},

        methods: {
            async getAllCharacters() {
                try {
                    const useCharactersStore = charactersStore();
                    this.characters = await useCharactersStore.fetchCharacters();
                    this.fetched = true;
                } catch (error) {
                    this.error = true;
                }
            },
            //cuando el padre reciba el aviso de $emit desde el hijo va a lanzar este método que
            //va a setear el valor de la variable select de data() en true y va a guardar en el
            //objeto pokemonshown el objeto pokemonselected que le llega desde c-pokemon
            selectedPokemon({ pokemonselected, selected}) {
                this.pokemonshown = pokemonselected;
                this.select = selected;
            },
            //el padre recibe el emit desde c-pokedex con el método closePokedex() que deselecciona el Pokémon
            //devolviendo la variable select a false para que se muestre de nuevo el listado de Pokémon
            unselectedPokemon(newValue) {
                this.select = newValue;
            }
        },
        
        created() {
                this.getAllCharacters();
            }
    }
    
</script>

<style lang="scss">

.tituloLista {
    width: 80%;
}

</style>