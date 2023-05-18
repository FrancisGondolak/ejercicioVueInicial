<template>
  <div class="l-fight">
    <section class="l-fightTitle">
      <slot v-if="$slots.pokeballIcon" name="pokeballIcon" />
      <CPokeball v-else></CPokeball>
      <slot name="title" />
      <slot v-if="$slots.pokeballIcon" name="pokeballIcon" />
      <CPokeball v-else></CPokeball>
    </section>

    <section class="l-fightScreen">
      <slot name="gameboy" />
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
.l-fight {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  background-color: rgb(219, 219, 219);
}

.l-fightTitle {
  margin-top: 5px;
  margin-bottom: 5px;
  width: 30%;
  justify-content: center;
  display: flex;
}

.l-fightScreen {
  border: 5px solid gray;
  background-color: gray;
  border-radius: 30px 30px 160px 30px;
  width: 70%;
  height: 900px;
}
</style>
