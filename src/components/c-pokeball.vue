<template>
    <div class="c-pokeball">
        <img :src="src" alt="alt">
    </div>   
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

.c-pokeball {
    display: flex;
    justify-content: right;
}

</style>