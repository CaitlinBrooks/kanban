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
      // else (this.$store.dispatch("getTasks", "boardId")) //listId?
    },
    mounted() {

    },
    props: ["listData"],
    components: {
      task
    }
  };
  // computed: ""

</script>

<!-- <template>
  <div class="list">
    <div></div>
    <form @submit.prevent="addList"> -->

<!-- <input type="text" required v-model="list.Title" </form> -->

<!-- </script> -->

<!-- on the board vue, the getLists method is fired off. Parents fire off the request for their children. Utilize mounted to retrieve the lists -->