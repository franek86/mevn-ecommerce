<template>
  <div class="  mb-20">
    <div class="container">
      <ul class="breadcrumb flex py-4 border-t-2">
        <li>
          <router-link to="/" class=" text-orangeColor">Home</router-link>
        </li>
        <li v-for="(crumb, index) in crumbs" :key="index">
          <router-link
            :to="crumb.to"
            :class="{ 'disabled--link': lastBreadCrumb(index) }"
            class="text-orangeColor"
          >
            {{ crumb.text }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();

    const lastBreadCrumb = (index) => {
      return index === crumbs.value.length - 1;
    };

    const crumbs = computed(() => {
      let pathArray = route.path.split("/");
      pathArray.shift();
      let breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
        breadcrumbArray.push({
          path: path,
          to: breadcrumbArray[idx - 1]
            ? "/" + breadcrumbArray[idx - 1].path + "/" + path
            : "/" + path,
          text: route.matched[idx].meta.breadcrumb || path,
        });
        return breadcrumbArray;
      }, []);
      return breadcrumbs;
    });

    return {
      crumbs,
      lastBreadCrumb,
    };
  },
};
</script>

<style lang="scss" scoped>
.breadcrumb {
  li:not(:first-child) {
    margin-left: 0.5rem;
    &:before {
      content: "|";
      padding-right: 0.5rem;
    }
  }
}
.disabled--link {
  color: #424242;
  cursor: not-allowed;
  opacity: 0.5;
  text-decoration: none;
}
</style>
