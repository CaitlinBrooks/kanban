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
    props: ["boardId"]
  };
</script>

<style scoped>
</style>