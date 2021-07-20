<template>
  <div>
    <AdminTitle title="Product" />
    <p>single product {{ id }}</p>
  </div>
</template>

<script>
import { useRoute } from "vue-router";

import AdminTitle from "../AdminTitle.vue";
export default {
  components: {
    AdminTitle,
  },
  setup() {
    const route = useRoute();

    const id = route.params.id;

    return {
      id,
    };
  },
};
</script>

<style></style>
