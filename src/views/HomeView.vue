<template>
    <section class="v-home">
       <div class="v-home__form">
            <p class="v-home__form__title">Introduce tu datos</p>
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
            @click=checkForm
            ></CButton>
            <p v-if="!userCorrect || !passwordCorrect">{{ advice }}</p>
            <p v-else-if="userCorrect && passwordCorrect">{{ welcome }}</p>
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
            advice: "El usuario y la contraseña han de tener un mínimo de 6 caracteres",
            userCorrect: false,
            passwordCorrect: false
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
        password() {
            if(this.password.length >= 6){
                this.passwordCorrect = true;
            }else{
                this.passwordCorrect = false;
            }
        }

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
            if(this.username === "Francisco" && this.password === "Neoris") {
                alert("Login correcto");
            }else{
                alert("Usuario y/o contraseña incorrectos");
            }
        }     
    }
};
</script>

<style lang="scss">

.v-home {
    border: 5px solid rgb(190, 157, 157);
    display: flex;
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
    background: var(--color-form-background);
}

.v-home__form__title {
    color: var(--color-form-title);
    font-size: 35px;
}


</style>