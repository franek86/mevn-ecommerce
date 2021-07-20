<template>
  <header
    class=" bg-yellowLight w-full grid grid-cols-2 lg:grid-cols-3 gap-4 py-4 px-2 lg:px-10 lg:py-6 "
  >
    <div class="lg:col-span-2">
      <AdminSearch />
    </div>

    <div class="flex items-center justify-end">
      <div class=" border rounded-full border-darkColor w-10 h-10 mr-2"></div>
      <div class="flex cursor-pointer relative" @click="setToogleLogout">
        Hi, {{ user.username }}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M19 9l-7 7-7-7"
          />
        </svg>

        <div
          class=" absolute bg-whiteColor text-darkColor w-60 transform -translate-x-2/3 z-10 transition-transform shadow-md py-2 px-2"
          :class="[
            toggleLogout
              ? 'translate-y-1/2 opacity-100'
              : 'translate-y-0 opacity-0',
          ]"
        >
          <div
            class=" inline-flex w-full py-2 boder border-yellowColor hover:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
            <span>Account settings</span>
          </div>
          <div
            class=" inline-flex w-full py-2 boder border-yellowColor hover:opacity-50"
            @click="logout"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span>Sign out</span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import AdminSearch from "./AdminSearch.vue";

import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  components: {
    AdminSearch,
  },

  setup() {
    const toggleLogout = ref(false);

    const store = useStore();
    const router = useRouter();

    const setToogleLogout = () => {
      toggleLogout.value = !toggleLogout.value;
    };

    const logout = () => {
      store.dispatch("user/logout");
      router.push("/login");
    };

    const user = computed(() => store.getters["user/isUser"]);

    return {
      toggleLogout,
      setToogleLogout,
      user,
      logout,
    };
  },
};
</script>

<style></style>
