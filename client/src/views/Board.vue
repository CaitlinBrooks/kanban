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
    mounted() {
      getLists()
    },
    props: ["boardId"],
<<<<<<< HEAD

=======
    // props: ["listId"],
>>>>>>> 78c75146740fd17529e423360e0413bc8673b2ea
    computed: {

    }
  };

</script> methods: { getList() { this.$store.dispatch("register", this.newUser); },

<!-- bring in the list component to this board vue -->