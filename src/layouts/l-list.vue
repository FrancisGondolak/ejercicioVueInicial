<template>
    <div class="l-list">
        <section class="l-listLeft">
            <slot name="pokeballIcon" />
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
            <slot name="pokeballIcon" />
        </section>
    </div>
</template>

<script>

export default {
    name:"LList"
}

</script>

<style lang="scss">

.l-list {
    display: flex;
    flex-direction: row;
}

.l-listLeft {
    width: 30%;
    height: 20px;
    background-color: red;
}

.l-listCenter {
    width: 40%;
    background-color: yellow;
}

.l-listCenter__title {
    background-color: green;

}

.l-listRight {
    width: 30%;
    height: 20px;
    background-color: rgb(110, 110, 235);
}

</style>