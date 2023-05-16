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
      <slot name="fight" />
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
}

.l-fightTitle {
  background-color: white;
  margin-top: 5px;
  margin-bottom: 5px;
  width: 30%;
  justify-content: center;
  display: flex;
}

.l-fightScreen {
  background-color: green;
  width: 90%;
  height: 800px;
}
</style>
