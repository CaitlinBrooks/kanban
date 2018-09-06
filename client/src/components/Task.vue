<template>
  <div class="task">
    {{taskData}}
    <comment :commentData="comment" v-for="comment in comments" :key="comment._id" />
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
      // else (this.$store.dispatch("getList", taskId)) //get list might need to be getboard or other
    },
    mounted() {

    },
    props: ["taskData"]
  };
</script>

<style scoped>
</style>