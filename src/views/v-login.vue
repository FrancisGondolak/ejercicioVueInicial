<template>
  <l-login>
    <template #form>
      <img
        class="v-login__form--title"
        src="src/components/assets/images/pookedex.png"
        alt="introduceDatos"
      />
      <CWarning v-if="showWarning" @dismissWarning="closeWarning" />
      <div class="formBox" v-else>
        <CInput type="text" placeholder="Introduce el usuario" v-model="username" />
        <CInput type="password" placeholder="Introduce el password" v-model="password" />
        <CButton buttonMessage="Login" @click="checkForm"></CButton>
      </div>
      <p class="v-login__form--advice" v-if="!userCorrect || !passwordCorrect">{{ advice }}</p>
      <p class="v-login__form--p" v-else-if="userCorrect && passwordCorrect">{{ welcome }}</p>
    </template>
  </l-login>
</template>

<script>
import LLogin from '@/layouts/l-login.vue'
import CInput from '@/components/c-input.vue'
import CButton from '@/components/c-button.vue'
import CWarning from '@/components/c-warning.vue'
import { userStore } from '@/stores/user'

export default {
  name: 'Login',
  components: {
    LLogin,
    CInput,
    CButton,
    CWarning
  },
  data() {
    return {
      username: '',
      password: '',
      advice: 'El usuario y la contraseña han de tener un mínimo de 6 caracteres',
      userCorrect: false,
      passwordCorrect: false,
      showWarning: false
    }
  },
  watch: {
    username() {
      this.userCorrect = false
      if (this.username.length >= 6) {
        this.userCorrect = true
      }
    },
    password() {
      this.passwordCorrect = false
      if (this.password.length >= 6) {
        this.passwordCorrect = true
      }
    }
  },
  computed: {
    welcome() {
      if (this.username === '' || this.password === '') {
        return ''
      }

      return 'Bienvenido/a ' + this.username
    }
  },
  methods: {
    async checkForm() {
      const { username, password } = this

      const doLogin = await userStore().login({ username, password })

      console.log(doLogin)

      if (doLogin) {
        this.$router.push({ name: 'list' })
      } else {
        this.showWarning = true
        this.advice = 'Usuario o contraseña incorrectos'
        this.username = ''
        this.password = ''
      }
    },
    closeWarning(newValue) {
      this.showWarning = newValue
      this.advice = 'El usuario y la contraseña han de tener un mínimo de 6 caracteres'
    }
  }
}
</script>

<style lang="scss">
.v-login__form--title {
  width: 60%;
  margin-top: 50px;
  margin-bottom: 50px;
}

.formBox {
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.v-login__form--advice {
  font-size: 20px;
  font-weight: bold;
  color: var(--color-form-advice);
}

.v-login__form--p {
  font-size: 22px;
  font-weight: bold;
}
</style>
