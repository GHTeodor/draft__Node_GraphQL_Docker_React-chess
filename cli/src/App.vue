<template>
  <div class="top">
    <img alt="Vue logo" src="./assets/logo.png">
    <AwesomeButton :text="'my awesome button!'" :onClick="changeName"/>
  </div>

  <h1>Hello, {{ name }}🚀🚀🚀</h1>

  <button @click="isVisible = !isVisible"
          :style="{
                  border: name > 500 ? 'double medium red' : '',
                  backgroundColor: 'transparent',
                  borderRadius: '8px',
                  color: 'red'
          }"
  >{{isVisible ? "hide" : "show"}}
  </button>

  <IncDec/>

  <hr />

  <button v-if="users[0].name === 'Leanne Graham'" @click="users[0].name += 1">change Name</button>

  <UserItem v-for="user of users" :key="user.id" :user="user"/>

  <hr v-show="isVisible"/>
  <img :src="img" :alt="alt">

</template>

<script>

import Button from "@/components/Button";
import UserItem from "@/components/UserItem";
import Increment_Decrement from "@/components/Increment_Decrement";

export default {
  name: 'App',
  data() {
    return {
      users: [{id: 0, name: null, username: null}],
      isVisible: true,
      name: "Vue",
      img: "https://i.pinimg.com/originals/09/f0/8f/09f08f0f50899c0f435967c5ab882967.gif",
      alt: "Elephant",
    };
  },
  methods: {
    changeName(/* arg,  event */) {
      this.name = Math.floor(Math.random() * 1000);
    },
    setUsers(users) {
      this.users = users;
    },
    async fetchUsers() {
      const resp = await fetch('https://jsonplaceholder.typicode.com/users');
      return  resp.json();
    },
  },
  async created() {
    this.setUsers(await this.fetchUsers());
  },
  components: {
    IncDec: Increment_Decrement,
    AwesomeButton: Button,
    UserItem,
  },
}
</script>

<style>

@import "./assets";

</style>