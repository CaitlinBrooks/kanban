<template>
  <div class="list">
    {{listData}}
    <task :taskData="task" v-for="task in tasks" :key="task._id" />
  </div>
</template>

<script>
  import task from "../components/Task.vue"
  export default {
    name: "list",
    created() {
      //blocks users not logged in
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      }
      else (this.$store.dispatch("getTasks", this.listId))
    },
    mounted() {
      this.$store.dispatch("getTasks")
    },
    props: ["listData"],
    computed: {
      tasks() {
        return this.$store.state.tasks[this.listId]
      }
    },
    components: {
      task
    }
  }
</script>