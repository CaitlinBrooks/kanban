<template>
  <div class="comment">
    {{commentData}}
    <comment :commentData="comment" v-for="comment in comments" :key="comment._id" />
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
    props: ["commentData"]
  };
</script>

<style scoped>
</style>