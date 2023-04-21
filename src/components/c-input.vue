<template>
    <input
        class="c-input"
        :type = "type"
        :placeholder = "placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    />
</template>

<script>
export default {
    name: "CInput",
    props: {
        type: {
            type: String,
            required: true
        },
        placeHolder: {
            type: String,
            default: "Pon tu usuario"
        },
        modelValue: {
            type: String,
            default: ""
        }
    },
    emits: ['update:modelValue'],
    watch: {
        modelValue(value) {

        }
    }


};
</script>

<style lang="scss">

.c-input{
    margin: 0.5em;
    width: 25rem;
    height: 3rem;
    border-radius: 10px;
    box-shadow: var(--color-input-shadow-deselected);
}

.c-input:focus{
    box-shadow: var(--color-input-shadow-selected);
}

</style>