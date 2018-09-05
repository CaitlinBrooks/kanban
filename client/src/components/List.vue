<template>
  <div class="list">
    {{listId}}
  </div>
</template>

<script>
  export default {
    name: "list",
    created() {
      //blocks users not logged in
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      }
    },
    props: ["boardId"]
  };
  // computed: ""
</script>

<!-- <template>
  <div class="list">
    <div></div>
    <form @submit.prevent="addList"> -->

<!-- <input type="text" required v-model="list.Title" </form> -->

<!-- </script> -->

<!-- on the board vue, the getLists method is fired off. Parents fire off the request for their children. Utilize mounted to retrieve the lists -->