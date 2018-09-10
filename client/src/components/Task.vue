<template>
  <div class="task">
    {{taskData.description}}
    <comment :commentData="comment" v-for="comment in comments" :key="comment._id" />


    <form v-on:submit.prevent="createComment">
      <input type="text" name="description" v-model="taskData.description" placeholder=" comment description">
      <button class="btn btn-success" type="submit">Add comment</button>
    </form>
  </div>
</template>

<script>
  import comment from "../components/Comment.vue"
  export default {
    name: "task",
    created() {
      //blocks users not logged in
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      }
      else (this.$store.dispatch("getComments", this.taskId))
    },
    mounted() {
      this.$store.dispatch("getComments")
    },
    props: ["taskData"],
    computed: {
      comments() {
        return this.$store.state.comments[this.commentId] || []
      }
    },
    components: {
      comment
    }
  }
</script>

<style scoped>
</style>