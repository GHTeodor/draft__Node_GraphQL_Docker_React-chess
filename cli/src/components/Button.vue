<template>
  <button class="btn" @click="onClickHandler">{{text}}</button>
</template>

<script>
export default {
  name: `Button`,
  emits: ['button-click'],
  props: {
    text: {type: String, required: true}
  },
  // onClick: {
  //   type: Function,
  //   required: true
  // },
  methods: {
    onClickHandler() {
      this.$emit('button-click');
    },
  },
}
</script>

<style scoped>
.btn {
  height: 1.5rem;
  padding: 6px 10px;
  display: flex;
  background: white;
  align-items: center;
  justify-content: center;
  border: 2px solid currentColor;
  text-transform: uppercase;
  font-weight: bold;
  transition: .2s;
}

.btn:hover {
  cursor: pointer;
  box-shadow: 6px 6px 0 0 currentColor;
}

.btn:active {
  transform: scale(1.05, 1.05);
  background: rgba(0, 0, 0, 0.05);
}

</style>