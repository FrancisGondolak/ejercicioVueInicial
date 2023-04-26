<template>
    <l-list>
        <template #pokeballIcon>
            <p>Hola que tal</p>
        </template>
        <template #title>
            <p>LISTADO DE POKÉMON</p>
        </template>
        <template #pokemonList>
            <c-pokemon 
                v-for="character in characters" 
                :key="character.type" 
                :pokemon="character"
            >
            </c-pokemon>
        </template>
    </l-list>
</template>


       

<script>

import { charactersStore } from '@/stores/characters';
import LList from '@/layouts/l-list.vue';
import CPokemon from '@/components/c-pokemon.vue';

    export default {
        name: "v-list",

        components: {
            LList,
            CPokemon
        },

        data() {
            return {
                characters: [],
                fetched: false,
                error: false
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
            }
        },
        
        created() {
                this.getAllCharacters();
            }
    }
    
</script>

<style lang="scss">

p {
    margin:0;
}

ul {
    margin:0;
}

</style>