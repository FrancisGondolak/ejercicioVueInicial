<template>
    <div class="c-warning">
        <img class="c-warning__image" src="src/components/assets/images/professorOak.png" alt="professorOakImage">
        <CButton
            buttonMessage="Aceptar"
            @click=dismissWarning
        ></CButton>
    </div>
</template>

<script>

import CButton from "@/components/c-button.vue"

export default {
    name: "c-warning",
    components: {
        CButton
    },
    props: {
    },
    data() {
      return {
        showWarning: false
      }
    },
    methods: {
        dismissWarning() {
            this.$emit('dismissWarning', this.showWarning);
        }  
    }

}

</script>

<style lang="scss" scoped>

.c-warning {
    // background-color: var(--color-form-background);
    background-color: var(--color-form-background);
    width: 40%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.c-warning__image {
    width: 40%;
    height: 50%;
}

</style>