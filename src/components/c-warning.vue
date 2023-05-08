<template>
    <div class="c-warning">
        <img class="c-warning__image" src="src/components/assets/images/professorOak.png" alt="professorOakImage">
        <button @click="dismissWarning">Aceptar</button>
    </div>
</template>

<script>

export default {
    name: "c-warning",
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
    background-color: red;
    width: 40%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.c-warning__image {
    width: 80%;
    height: 80%;
}

button {
   width: 30%;
}

</style>