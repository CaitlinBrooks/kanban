<template>
  <div class="board">
    {{boardId}}
    <form v-on:submit.prevent="createList">
      <input type="text" name="title" v-model="listData.title" placeholder="title">
      <input type="text" name="description" v-model="listData.description" placeholder="description">
      <button type="submit">send it</button>
    </form>
    <list :listData="list" v-for="list in lists" :key="list._id" />
    <!-- <router-link :to="{name: 'list', params: {listId: list._id}}">{{list.title}}</router-link>
        <button @click="deletelist(list._id)">DELETE LIST</button> -->
    <!-- </div> -->
  </div>
</template>

<script>
  import list from "../components/List.vue"
  export default {
    name: "board",
    data() {
      return {
        listData: { title: "", description: "" }
      }
    },
    created() {
      //blocks users not logged in
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      }
      else (this.$store.dispatch("getLists", this.boardId))
    },
    mounted() {
      this.$store.dispatch("getLists")
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
        this.$store.dispatch("addList", this.listData)
        console.log("Hello from createList")
      }
    }
  };

</script>
<!--not sure if we still need this here but I kept jic  -->
<!-- bring in the list component to this board vue -->