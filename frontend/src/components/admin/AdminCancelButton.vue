<template>
  <header class="flex justify-between">
    <div></div>
    <!-- //CANCEL BUTTON -->
    <router-link :to="btnUrl" class="flex items-center cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-10 w-10"
        viewBox="0 0 20 20"
        fill="#EF4444"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
          clip-rule="evenodd"
        />
      </svg>
      <span class=" font-medium">Cancel</span>
    </router-link>
  </header>
</template>

<script>
export default {
  props: {
    btnUrl: {
      type: String,
      default: "/admin/dashboard",
      required: true,
    },
  },
};
</script>

<style></style>
