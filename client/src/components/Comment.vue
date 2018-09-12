<template>
  <div class="comment">
    {{commentData.description}}
    <button class="btn btn-light" v-on:submit.prevent="deleteComment" @click="deleteComment">Delete Comment</button>
  </div>
</template>

<script>
  export default {
    name: "comment",
    props: ["commentData"],
    data() {
      return {
        newComment: {
          taskId: this.commentData,
          description: ''
        }
      }
    },
    methods: {
      deleteComment() {
        this.$store.dispatch('deleteComment', this.taskId)
      }
    }
  };
</script>

<style scoped>
</style>