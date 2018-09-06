<template>
  <div class="board">
    {{boardId}}
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
      }
    },
    tasks() {
      return this.$store.state.tasks
    }
    ,
    components: {
      list
    }
  };

  // <div class="dropdown">
  //   <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
  //     aria-expanded="false">
  //     ACTIONS
  // </button>
  //   <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
  //     <a class="dropdown-item" href="#">Move Task</a>
  //     <a class="dropdown-item" href="#">Add New Task</a>
  //     <a class="dropdown-item" href="#">Delete Task</a>
  //   </div>
  // </div>

</script> methods: { getList() { this.$store.dispatch("register", this.newUser); },