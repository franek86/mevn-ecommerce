<template>
  <div id="app" class="font-body">
    <component :is="layout">
      <slot></slot>
      <!-- <router-view></router-view> -->
    </component>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
  name: "App",

  setup() {
    const route = useRoute();
    const store = useStore();

    const defaultLayout = "default-layout";

    const layout = computed(() => {
      return route.meta.layout || defaultLayout;
    });

    const getCurrentUser = onMounted(() => {
      store.dispatch("user/currentUser");
    });

    return {
      route,
      getCurrentUser,
      defaultLayout,
      layout,
    };
  },
};
</script>

<style lang="scss">
a:not(.custom__links) {
  transition: color 0.2s ease-in-out;
  &:hover {
    color: #9aa084;
  }
}

.btn__arrow {
  &:before {
    content: "";
    background-image: url(./assets/images/btn-arrow.svg);
    position: absolute;
    right: 15%;
    top: 20px;
    background-repeat: no-repeat;
    width: 23px;
    height: 16px;
    transition: all 0.25s ease-in-out;
    background-position: 100% 0%;
  }

  &:hover::before {
    transform: translateX(10px);
  }
}
</style>
