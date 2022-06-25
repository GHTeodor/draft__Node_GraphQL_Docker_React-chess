<template>
  <button @click="counter--">-</button>
  <u v-if="counter === 0"> Zero </u>
  <u v-else-if="counter === 1"> One </u>
  <u v-else-if="counter === 2"> Two </u>
  <u v-else> {{counter}} </u>
  <button @click="counter++">+</button>
</template>

<script>
export default {
  name: "Increment_Decrement",
  data() {
    return {
      counter: 0,
    };
  },
}
</script>

<style scoped>

</style>