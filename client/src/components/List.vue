<template>
  <div class="list">
    <!-- listData gives whole object, we can choose what to display off it here (makes it look much prettier)-->
    {{listData.title}}
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
      else (this.$store.dispatch("getTasks", this.listData._id))
    },
    mounted() {
      // this.$store.
      // this.$store.dispatch("getTasks")
    },
    props: ["listData"],
    computed: {
      tasks() {
        return this.$store.state.tasks[this.listData._id] || []
      }
    },
    components: {
      task
    }
  }
</script>