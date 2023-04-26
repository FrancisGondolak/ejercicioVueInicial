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
    height: 125px;
    background-color: red;
    display: flex;
    justify-content: right;
}

.l-listCenter {
    width: 40%;
    height: 650px;
    background-color: yellow;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}

.l-listCenter__title {
    background-color: green;
    margin-bottom: 60px;
}

.l-listCenter__nameList {
    background-color: blue;
    width: 40%;
}

.l-listRight {
    width: 30%;
    height: 125px;
    background-color: rgb(110, 110, 235);
    display: flex;
    justify-content: left;
}

</style>