<template>
  <div class="board">
    {{boardId}}
    <!-- list component, v-for -->
  </div>
</template>

<script>
  export default {
    name: "board",
    created() {
      //blocks users not logged in
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      }
      else (this.$store.dispatch("getLists", this.boardId))
    },
    props: ["boardId"],
    props: ["listId"],
    computed: {

    }
  };

</script> methods: { getList() { this.$store.dispatch("register", this.newUser); },

<!-- bring in the list component to this board vue -->