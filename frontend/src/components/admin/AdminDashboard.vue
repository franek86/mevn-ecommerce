<template>
  <div class="w-full">
    <AdminTitle title="Dashboard" />
    <div class="px-6">
      <div class=" mb-8">
        <router-link
          to="/admin/dashboard/"
          class="custom__links px-2 py-2 bg-orangeColor mr-4 cursor-pointer text-whiteColor hover:bg-darkColor hover:text-whiteColor"
          >statistics</router-link
        >
        <router-link
          to="/admin/dashboard/sliders"
          class="custom__links px-2 py-2 bg-orangeColor mr-4 cursor-pointer text-whiteColor hover:bg-darkColor hover:text-whiteColor"
          >sliders</router-link
        >
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AdminTitle from "./AdminTitle.vue";

export default {
  components: {
    AdminTitle,
  },
};
</script>

<style></style>
