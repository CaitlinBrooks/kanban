<template>
  <div class="board">
    {{boardId.title}}
    <form v-on:submit.prevent="createList">
      <input type="text" name="title" v-model="newList.title" placeholder="New List">
      <input type="text" name="description" v-model="newList.description" placeholder="description">
      <button class="btn btn-success" type="submit">Send It</button>
    </form>
    <list :listData="list" v-for="list in lists" :key="list._id" />
    <!-- <router-link :to="{name: 'list', params: {listId: list._id}}">{{list.title}}</router-link>
        <button @click="deletelist(list._id)">DELETE LIST</button> -->
    <!-- </div> -->
    <button class="btn btn-light" type="submit">Logout</button>
  </div>

</template>

<script>
  import list from "../components/List.vue"
  export default {
    name: "board",
    data() {
      return {
        newList: { title: "", description: "" }
      }
    },
    created() {
      //blocks users not logged in
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      }
      else (this.$store.dispatch("getLists", this.boardId))
    },
    props: ["boardId"],
    // props: ["listId"],
    computed: {
      lists() {
        return this.$store.state.lists
      },
    },
    tasks() {
      return this.$store.state.tasks
    }
    ,
    components: {
      list
    },
    methods: {
      getList() { this.$store.dispatch("register", this.newUser); },
      createList() {
        this.$store.dispatch("addList", this.newList)
        console.log("Hello from createList")
      }
    }
  };

</script>
<!--not sure if we still need this here but I kept jic  -->
<!-- bring in the list component to this board vue -->