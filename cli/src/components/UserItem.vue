<template>
  <h1 :style="{color: text}">{{buildFullName()}}</h1>

  <input type="text" placeholder="Input color (green, pink, ...)" v-model="text" :style="{color: text}">
  <i :style="{color: text}">...{{text}}</i>

  <hr/>
</template>

<script>
export default {
  name: "UserItem",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      text: null,
    };
  },
  // beforeCreate(...args) {
  //   console.log('beforeCreate', args, this.counter);
  // },
  // created(...args) {
  //   console.log('created', args, this.counter);
  // },
  // beforeMount(...args) {
  //   console.log('beforeMount', args, this.counter);
  // },
  // mounted(...args) {
  //   console.log('mounted', args, this.counter);
  // },
  // beforeUpdate(...args) {
  //   console.log('beforeUpdate', args, this.counter);
  // },
  // updated(...args) {
  //   console.log('updated', args, this.counter);
  // },
  methods: {
    buildFullName() {
      return `${this.user.name}${this.user.username}`
    },
  },
};
</script>

<style scoped>
input:hover {
  transform: scale(1.1);
}
input {
  animation-name: input-animation;
  animation-duration: 5s;
  animation-direction: alternate;
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  cursor: pointer;
  width: 200px;
  border-radius: 10px;
}

::placeholder {
  color: lightseagreen;
}

@keyframes input-animation {
  from {
    background-color: lightblue;
  }
  to {
    background-color: lightgoldenrodyellow;
  }
}
</style>