<template>
  <div class="task">
    <!-- same as in list taskData is whole object, can take parts if we want  -->
    {{taskData.title}}
    <comment :commentData="comment" v-for="comment in comments" :key="comment._id" />

    <form v-on:submit.prevent="createComment">
      <input type="text" name="title" v-model="commentData.title" placeholder="title">
      <input type="text" name="description" v-model="commentData.description" placeholder="description">
      <button type="submit">send it</button>
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