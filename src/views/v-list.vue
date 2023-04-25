<template>
    <section>
        <h1>ESTÁS EN LA LISTA DE PERSONAJES</h1>
        <ul v-for="character in characters" :key="character.type">
          <li>{{ character.balance }}</li>
          <li>{{ character.type }}</li>  
          <li>{{ character.number }}</li>    
        </ul>
    </section>
    
</template>

<script>

import { charactersStore } from '@/stores/characters';

    export default {
        name: "v-list",

        components: {},

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