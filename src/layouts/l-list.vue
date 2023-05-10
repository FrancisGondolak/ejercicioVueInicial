<template>
  <div class="l-list">
    <section class="l-listLeft">
      <slot v-if="$slots.pokeballIcon" name="pokeballIcon" />
      <CPokeball v-else></CPokeball>
    </section>
    <section class="l-listCenter">
      <div class="l-listCenter__title">
        <slot name="title" />
      </div>
      <div class="l-listCenter__nameList">
        <slot name="pokemonList" />
        <slot name="pokedex"></slot>
      </div>
    </section>
    <section class="l-listRight">
      <slot v-if="$slots.pokeballIcon" name="pokeballIcon" />
      <CPokeball v-else></CPokeball>
    </section>
  </div>
</template>

<script>
import CPokeball from '@/components/c-pokeball.vue'

export default {
  name: 'LList',

  components: {
    CPokeball
  }
}
</script>

<style lang="scss" scoped>
.l-list {
  display: flex;
}

.l-listLeft {
  width: 30%;
  height: 125px;
  display: flex;
  justify-content: right;
}

.l-listCenter {
  width: 40%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.l-listCenter__title {
  margin-top: 5px;
  margin-bottom: 5px;
  text-align: center;
}

.l-listCenter__nameList {
  width: 60%;
}

.l-listRight {
  width: 30%;
  height: 125px;
  display: flex;
  justify-content: left;
}

//TAMAÑO LAPTOP Y TABLET//

@media only screen and (max-width: 1854px) {
  .l-listCenter {
    width: 60%;
    height: auto;
    display: flex;
    flex-direction: column;
  }

  .l-listCenter__title {
    margin-top: 5px;
    margin-bottom: 5px;
    text-align: center;
  }

  .l-listCenter__nameList {
    width: 65%;
  }
}

//TAMAÑO MÓVIL//

@media only screen and (max-width: 635px) {
  .l-listLeft {
    display: none !important;
  }
  .l-listCenter {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  .l-listCenter__title {
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .l-listCenter__nameList {
    width: 85%;
  }
  .l-listRight {
    display: none;
  }
}
</style>
