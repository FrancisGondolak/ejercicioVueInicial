<template>
    <l-login>
        <template #login_warning v-if="showWarning">
            <c-warning
                :pokemonshown="pokemonshown"
                @pokemonUnselected="unselectedPokemon"
            >
            </c-warning>
        </template>
        <template #form>
            <img class="v-login__form--title" src="src/components/assets/images/pookedex.png" alt="introduceDatos">
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
            <p class="v-login__form--advice" v-if="!userCorrect || !passwordCorrect">{{ advice }}</p>
            <p class="v-login__form--p" v-else-if="userCorrect && passwordCorrect">{{ welcome }}</p> 
        </template>    
    </l-login>           
</template>

<script>
import LLogin from "@/layouts/l-login.vue"
import CInput from "@/components/c-input.vue"
import CButton from "@/components/c-button.vue"
import { userStore } from "@/stores/user"


export default {
    name: "Login",
    components: {
        LLogin,
        CInput,
        CButton
    },
    data() {
        return {
            username: "",
            password: "",
            advice: "El usuario y la contraseña han de tener un mínimo de 6 caracteres",
            userCorrect: false,
            passwordCorrect: false,
            showWarning: false
        }
    },
    watch: {
        username() {
            this.userCorrect = false;
            if(this.username.length >= 6){
                this.userCorrect = true;
            }
        },
        password() {
            this.passwordCorrect = false;
            if(this.password.length >= 6){
                this.passwordCorrect = true;
            }
        }

    },
    computed: {
        welcome() {
            if (this.username === "" || this.password === "") {
                return "";
            }

            return "Nombre de usuario: " + this.username;
        }
    },
    methods: {
        async checkForm() {

            const { username, password } = this

            const doLogin = await userStore().login({ username, password })

            console.log(doLogin)

            if(doLogin) {
                this.$router.push({name:'list'});
            }else{
                // alert("Usuario y/o contraseña incorrectos");
                this.showWarning = true;
                this.username = "";
                this.password = "";
            }
        },
        dismissWarning() {
            this.showWarning = false;
        }     
    }
};
</script>

<style lang="scss">

.v-login__form--title {
    width: 60%;
    margin-top: 5px;
    margin-bottom: 10px;
}

.v-login__form--advice {
    font-weight: 600;
    color: var(--color-form-advice);
}

.v-login__form--p {
    font-weight: 600;
}


</style>