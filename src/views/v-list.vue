<template>
    <l-list>
        <template #iconLeft>

        </template>
        <template #title>
            <p>LISTADO DE POKÉMON</p>
        </template>
        <template #pokemonList>
            <ul v-for="character in characters" :key="character.type">
                <li>{{ character.name }}</li>
                <li>{{ character.type }}</li>  
                <li>{{ character.number }}</li>    
            </ul>
        </template>
        <template #iconRight>

        </template>
    </l-list>
</template>


       

<script>

import { charactersStore } from '@/stores/characters';
import LList from '@/layouts/l-list.vue';

    export default {
        name: "v-list",

        components: {
            LList
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