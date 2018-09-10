<template>
  <div class="list">
    {{listData.title}}
    <task :taskData="task" v-for="task in tasks" :key="task._id" />
    <form v-on:submit.prevent="createTask">
      <input type="text" name="description" v-model="newTask.description" placeholder="task description">
      <button class="btn btn-success" type="submit">Add Task</button>
    </form>

  </div>
</template>

<script>
  // draw tasks on list
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
    props: ["listData"],
    data() {
      return {
        newTask: {
          listId: this.listData._id,
          description: ''
        }
      }
    },
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