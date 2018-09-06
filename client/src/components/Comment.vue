<template>
  <div class="comment">
    {{commentData}}
  </div>
</template>

<script>
  export default {
    name: "comment",
    created() {
      //blocks users not logged in
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      }
    },
    props: ["boardId", "taskId"] //not sure if this needs task id -Jackson
  };
</script>

<style scoped>
</style>