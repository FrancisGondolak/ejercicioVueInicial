<template>
    <img :src="src" alt="alt">   
</template>

<script>

export default {
    name: "c-pokeball",
    props: {
        src: {
            type: String,
            required: true
        },
        alt: {
            type: String,
            required: true
        }
    },

}
</script>

<style lang="scss">

</style>