<template>
  <div class="task">
    {{taskData.description}}
    <comment :commentData="comment" v-for="comment in comments" :key="comment._id" />
    <form v-on:submit.prevent="createComment">
      <input type="text" name="description" v-model="newCom.description" placeholder="comment description">
      <button class="btn btn-dark" type="submit">Add comment</button>
    </form>
    <form @submit.prevent='changeList'>
      <div class="form-group">
        <label for="list-form">Change List</label>
        <select class="form-control" id="list-form" v-model="newListId">
          <option v-for="list in lists" :value='list._id'>{{list.title}}</option>
        </select>
        <button type="submit">CHANGE LIST</button>
      </div>
    </form>

  </div>
</template>

<script>
  import comment from "../components/Comment.vue"
  export default {
    name: "task",
    created() {
      this.$store.dispatch("getComments", this.taskData._id)
    },
    props: ["taskData"],
    data() {
      return {
        newCom: {
          description: '',
          taskId: this.taskData._id
        },
        newListId: ''
      }
    },
    computed: {
      comments() {
        return this.$store.state.comments[this.taskData._id] || []
      },
      lists() {
        return this.$store.state.lists
      }
    },
    methods: {
      createComment() {
        this.$store.dispatch('addComment', this.newCom)
        //this.newCom.description = ""
      },
      changeList() {
        let data = {
          oldListId: this.taskData.listId,
          newListId: this.newListId,
          taskId: this.taskData._id
        }
        this.$store.dispatch('editTask', data)
      }
    },
    components: {
      comment
    }
  }
</script>

<style scoped>
</style>