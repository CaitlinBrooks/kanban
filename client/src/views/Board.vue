<template>
  <div class="board">
    {{boardId}}
    <list :listData="list" v-for="list in lists" :key="list._id" />
    <list :taskData="task" v-for="task in tasks" :key="task._id" />
    <!-- <router-link :to="{name: 'list', params: {listId: list._id}}">{{list.title}}</router-link>
      <button @click="deletelist(list._id)">DELETE LIST</button> -->
    <!-- </div> -->
  </div>
</template>

<script>
  import list from "../components/List.vue"
  import task from "../components/Task.vue"
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
      list,
      task
    }
  };

</script> methods: { getList() { this.$store.dispatch("register", this.newUser); },

<!-- bring in the list component to this board vue -->