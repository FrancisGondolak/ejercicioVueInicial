<template>
    <div class="l-list">
        <section class="l-listLeft">
            <slot name="iconLeft" />
        </section>
        <section class="l-listCenter">
            <div class="l-listCenter__title">
                <slot name="title" />
            </div>
            <div class="l-listCenter__nameList">
                <slot name="pokemonList" />
            </div>
        </section> 
        <section class="l-listRight">
            <slot name="iconRight" />
        </section>
    </div>
</template>

<script>

export default {
    name:"LList"
}

</script>

<style lang="scss">

.l-listLeft {
    width: 100%;
    height: 20px;
    background-color: red;
}

.l-listCenter {
    background-color: yellow;
}

.l-listCenter__title {
    background-color: green;

}

.l-listRight {
    width: 100%;
    height: 20px;
    background-color: blue;
}

</style>