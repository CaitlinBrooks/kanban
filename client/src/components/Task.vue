<template>
  <div class="list">
    {{taskId}}
  </div>
</template>

<script>
  export default {
    name: "task",
    created() {
      //blocks users not logged in
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      }
      else (this.$store.dispatch("getList", taskId)) //get list might need to be getboard or other
    },
    props: ["boardId"] //would this change? the task would need to get to the list and the list to the board.
  };
</script>

<style scoped>
</style>