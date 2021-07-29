<template>
  <div class="flex">
    <AdminNav />
    <main class="w-full">
      <AdminHeader />
      <div
        class=" bg-greyColor h-screen lg:transform lg:-translate-y-3 lg:rounded-l-xl "
      >
        <Admin />
      </div>
    </main>
  </div>
</template>

<script>
import AdminNav from "../components/admin/AdminNav.vue";
import AdminHeader from "../components/admin/AdminHeader.vue";
import Admin from "../components/admin/Admin.vue";
export default {
  components: {
    AdminNav,
    AdminHeader,
    Admin,
  },
};
</script>

<style></style>
