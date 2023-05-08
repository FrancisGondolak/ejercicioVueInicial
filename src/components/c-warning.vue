<template>
    <div class="c-warning">
        <img class="c-warning__image" src="src/components/assets/images/professorOak.png" alt="">
    </div>
</template>

<script>

export default {
    name: "c-warning",
    props: {
    },
    data() {
      return {
      }
    },
    methods: {
    }

}

</script>

<style lang="scss" scoped>

.c-warning {
    background-color: red;
    width: 40%;
    height: 100%;
}

.c-warning__image {
    width: 80%;
    height: 80%;
}

</style>