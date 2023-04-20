<template>
   <button v-bind="$attrs">{{ buttonMessage }}</button> 
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