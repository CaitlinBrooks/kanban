<template>
  <div class="board">
    {{boardId}}
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
      else (this.$store.dispatch("getLists", boardId))
    },
    props: ["boardId"]
  };

</script> methods: { getList() { this.$store.dispatch("register", this.newUser); },

<!-- bring in the list component to this board vue -->