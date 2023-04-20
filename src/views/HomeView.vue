<template>
    <section class="v-home">
       <div class="v-home__form">
            <h2>{{ username }}</h2>
            <h2>{{ password }}</h2>
            <CInput
            type="text" 
            placeholder="Introduce el usuario" 
            v-model="username"
            />
            <CInput
            type="password" 
            placeholder="Introduce el password" 
            v-model="password"
            />
            <CButton
            buttonMessage="Login"
            ></CButton>
        </div>  
    </section>
   
</template>

<script>
import CInput from "@/components/c-input.vue"
import CButton from "@/components/c-button.vue"

export default {
    name: "HomeView",
    components: {
        CInput,
        CButton
    },
    data() {
        return {
            username: "",
            password: "",
            userCorrect: false
        }
    },
    watch: {
        username(value) {
            if(value === "Francisco"){
                this.userCorrect = true;
            }
        } 
    },
    methods: {
        
    }
};
</script>

<style>

.v-home {
    border: 5px solid rgb(190, 157, 157);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.v-home__form{
    border: 5px solid red;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 40%;
    background: var(--color-background-form);
}


</style>