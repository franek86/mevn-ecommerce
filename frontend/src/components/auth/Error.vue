<template>
  <div class=" bg-redColor text-center mb-3 py-2 text-greyColor">
    {{ error }}
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: String,
    },
  },
};
</script>

<style></style>
