<template>
    <input
        class="c-input"
        :type = "type"
        placeholder = "placeholder"
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
    emits: ['update:modelValue']
};
</script>

<style lang="scss">

.c-input{
    margin: 10px;
    width: 95%;
    height: 3rem;
    border-radius: 10px;
    box-shadow: var(--color-input-shadow-deselected);
    background-color: rgb(35, 90, 241);
    color: var(--color-button-text);
    outline: none;
}

.c-input::placeholder {
    color: var(--color-button-text);
}

.c-input:focus{
    box-shadow: var(--color-input-shadow-selected);
}

</style>