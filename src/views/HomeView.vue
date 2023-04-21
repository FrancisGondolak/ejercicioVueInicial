<template>
    <section class="v-home">
       <div class="v-home__form">
            <p class="v-home__form__title">Introduce tu datos</p>
            <CInput
            type="text" 
            placeholder="Introduce el usuario" 
            v-model="username"
            />
            <p v-if="!userCorrect">El usuario ha de tener un mínimo de 6 caracteres</p>
            <p v-else>El nombre de usuario es válido</p>
            <CInput
            type="password" 
            placeholder="Introduce el password" 
            v-model="password"
            />
            <!-- <p v-if="!passwordCorrect">La contraseña ha de tener un caracter especial</p> -->
            <CButton
            buttonMessage="Login"
            @click=checkForm()
            ></CButton>
            <p>{{ welcome }}</p>
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
            userCorrect: false,
            passwordCorrect: false,
            correctLogin: false
        }
    },
    watch: {
        username() {
            if(this.username.length >= 6){
                this.userCorrect = true;
            }else{
                this.userCorrect = false;
            }
        },
        // password() {
        //     if(this.password === "@Neoris"){
        //         this.passwordCorrect = true;
        //     }
        // }

    },
    computed: {
        welcome() {
            if (this.username === "" || this.password === "") {
                return "";
            }else{
                return this.username + " " + this.password;
      }
        }
    },
    methods: {
        checkForm() {
            if(this.username != "" && this.password != "") {
                alert("Bienvenido " + this.username);
            }else{
                alert("Los campos a rellenar son obligatorios");
            }
        }     
    }
};
</script>

<style lang="scss">

.v-home {
    border: 5px solid rgb(190, 157, 157);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 600px;
}

.v-home__form{
    border: 5px solid red;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 70%;
    width: 40%;
    background: var(--color-background-form);
}

.v-home__form__title {
    color: var(--color-title-text);
    font-size: 35px;
}


</style>