<template>
    <l-list>
        <template #pokeballIcon>
            <c-pokeball 
            src="src/components/assets/images/pokeball.png"
            alt="pokeballIcon"
            ></c-pokeball>
        </template>
        <template #title>
            <p>LISTADO DE POKÉMON</p>
        </template>
        <template #pokemonList>
            <c-pokemon 
                v-for="character in characters" 
                :key="character.number" 
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
import CPokeball from '@/components/c-pokeball.vue';

    export default {
        name: "v-list",

        components: {
            LList,
            CPokemon,
            CPokeball
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
    font-size: 50px;
}

</style>