<template>
  <div class="l-list">
    <section class="l-listLeft">
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime ipsum excepturi dolores,
        repellat, temporibus officiis debitis sed ratione harum aliquam ab dignissimos, quas nisi.
        Molestias numquam voluptatem ipsum officia natus.
      </p>
    </section>
    <section class="l-listCenter">
      <div class="l-listCenter__title">
        <slot v-if="$slots.pokeballIcon" name="pokeballIcon" />
        <CPokeball v-else></CPokeball>
        <slot name="title" />
        <slot v-if="$slots.pokeballIcon" name="pokeballIcon" />
        <CPokeball v-else></CPokeball>
      </div>
      <div class="l-listCenter__nameList">
        <slot name="pokemonList" />
        <slot name="pokedex"></slot>
      </div>
    </section>
    <section class="l-listRight">
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime ipsum excepturi dolores,
        repellat, temporibus officiis debitis sed ratione harum aliquam ab dignissimos, quas nisi.
        Molestias numquam voluptatem ipsum officia natus.
      </p>
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
  display: flex;
  flex-direction: column;
  background-color: green;
}

.l-listCenter {
  width: 40%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
}

.l-listCenter__title {
  margin-top: 5px;
  margin-bottom: 5px;
  width: 70%;
  justify-content: center;
  display: flex;
  background-color: pink;
}

.l-listCenter__nameList {
  width: 60%;
}

.l-listRight {
  width: 30%;
  display: flex;
  flex-direction: column;
  background-color: green;
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
    width: 60%;
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
