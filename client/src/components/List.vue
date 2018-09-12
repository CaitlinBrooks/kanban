<template>
  <div class="list">
    {{listData.title}}
    <task :taskData="task" v-for="task in tasks" :key="task._id" />
    <!-- need to fix createTask or at least the link/name -->
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
      this.$store.dispatch("getTasks", this.listData._id)
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
    methods: {
      createTask() {
        this.$store.dispatch('addTask', this.newTask)
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