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
    <!-- <div class="px-6">
      <div class=" flex flex-row mb-2">
        <div
          v-for="(tab, index) in tabs"
          :key="index"
          @click="selectedTab(index)"
          class=" px-2 py-2 bg-orangeColor mr-4 cursor-pointer text-whiteColor"
          :class="{ 'bg-darkColor': tab === activeTab }"
        >
          {{ tab }}
        </div>
      </div>

      <component :is="activeTab" />
    </div> -->
  </div>
</template>

<script>
import { reactive, ref, computed } from "vue";
// import Statistics from "./AdminDashboardTabs/AdminDashboardStatistics.vue";
// import Slider from "./AdminDashboardTabs/AdminMainSlider.vue";
import AdminTitle from "./AdminTitle.vue";

export default {
  components: {
    AdminTitle,
    // Statistics,
    // Slider,
  },

  setup() {
    const tabs = reactive(["Statistics", "Slider"]);
    const component = ref("Statistics");
    const currentTab = ref(0);

    const selectedTab = (tab) => {
      currentTab.value = tab;
    };

    const activeTab = computed(() => {
      return tabs[currentTab.value];
    });

    return {
      tabs,
      component,
      currentTab,
      activeTab,
      selectedTab,
    };
  },
};
</script>

<style></style>
