<template>
  <div class=" py-4 px-6 font-semibold border-b-2 border-orangeColor mb-8">
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Title",
    },
  },
};
</script>

<style></style>
