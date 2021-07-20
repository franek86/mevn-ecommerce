<template>
  <header class="flex justify-between mb-8">
    <div></div>

    <!-- //CREATE BUTTON -->
    <router-link :to="btnUrl" class="cursor-pointer hover:opacity-50">
      <div class="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
            clip-rule="evenodd"
          />
        </svg>
        <span class=" font-medium">{{ btnText }}</span>
      </div>
    </router-link>
  </header>
</template>

<script>
export default {
  props: {
    btnText: {
      type: String,
      required: true,
    },

    btnUrl: {
      type: String,
      default: "/admin/dashboard",
      required: true,
    },
  },
};
</script>

<style></style>
