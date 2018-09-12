<template>
  <div class="comment">
    {{commentData.description}}
  </div>
</template>

<script>
  export default {
    name: "comment",
    props: ["commentData"]
  };
</script>

<style scoped>
</style>