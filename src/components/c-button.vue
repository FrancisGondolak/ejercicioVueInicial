<template>
   <button class="c-button" v-bind="$attrs">{{ buttonMessage }}</button> 
</template>

<script>
export default {
    name: "CButton",
    inheritAttrs: false,
    props: {
        buttonMessage: {
            type: String,
            default: "Submit"
        }
    }

};
</script>

<style lang="scss" scoped>

.c-button {
    background-color: var(--color-button-background);
    color: var(--color-button-text);
    padding: 1rem 2rem;
    border-radius: 12px;
    margin: 2rem;
    width: 9rem;
    cursor: pointer;
}

</style>