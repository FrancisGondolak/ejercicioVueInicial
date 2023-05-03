<template>
    <section class="l-login">
        <div class="l-login__form">
            <slot name="form" />
        </div>
    </section>
</template>

<script>

export default {
    name:"LLogin"
}

</script>

<style lang="scss">

.l-login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.l-login__form{
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 55%;
    width: 40%;
    background: var(--color-form-background);
    box-shadow: var(--color-form-shadow);
    border: 3px solid var(--color-form-border);
}

</style>