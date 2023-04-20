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

<style>

.c-button {
    font: inherit;
    background-color: var(--color-background-button);
    color: var(--color-text-button);
    padding: 1rem 2rem;
    border-radius: 12px;
    margin: 1rem;
    width: 10rem;
    cursor: pointer;
}

</style>