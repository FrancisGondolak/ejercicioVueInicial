<template>
    <l-homeview>
        <template #form>
            <p class="v-home__form--title">Introduce tu datos</p>
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
            <p class="v-home__form--advice" v-if="!userCorrect || !passwordCorrect">{{ advice }}</p>
            <p class="v-home__form--p" v-else-if="userCorrect && passwordCorrect">{{ welcome }}</p> 
        </template>    
    </l-homeview>           
</template>

<script>
import LHomeview from "@/layouts/l-homeview.vue"
import CInput from "@/components/c-input.vue"
import CButton from "@/components/c-button.vue"
import { userStore } from "@/stores/user"


export default {
    name: "HomeView",
    components: {
        LHomeview,
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
                alert("Usuario y/o contraseña incorrectos");
                this.username = "";
                this.password = "";
            }
        }     
    }
};
</script>

<style lang="scss">

.v-home__form--title {
    color: var(--color-form-title);
    font-size: 35px;
    font-weight: 600;
}

.v-home__form--advice {
    font-weight: 600;
    color: var(--color-form-advice);
}

.v-home__form--p {
    font-weight: 600;
}


</style>