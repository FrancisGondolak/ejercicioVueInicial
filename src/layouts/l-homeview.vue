<template>
    <section class="l-homeview">
        <div class="l-homeview__form">
            <slot name="form" />
        </div>
    </section>
</template>

<script>

export default {
    name:"LHomeview"
}

</script>

<style lang="scss">

.l-homeview {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 600px;
}

.l-homeview__form{
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 70%;
    width: 40%;
    background: var(--color-form-background);
    box-shadow: var(--color-form-shadow);
    border: 3px solid var(--color-form-border);
}

</style>