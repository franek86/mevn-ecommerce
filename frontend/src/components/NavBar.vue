<template>
  <div class=" container">
    <!-- // DESKTOP NAVIGATION-->
    <div v-if="!isMobile">
      <!-- top nav desktop-->
      <div class="nav__top flex justify-end w-full mt-4">
        <router-link to="/about-us" class=" mr-8 text-base font-light"
          >About us</router-link
        >
        <router-link to="/contact" class="mr-8 text-base font-light"
          >Contact</router-link
        >

        <router-link
          to="/login"
          class="text-base font-light"
          v-if="!isAuthenticated"
          ><svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#242424"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-log-in"
          >
            <path
              d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3"
            /></svg
        ></router-link>

        <a
          v-if="isAuthenticated"
          href="#"
          class="flex text-base font-light"
          @click="logout"
        >
          <span>
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="#242424"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-user"
            >
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </span>
          Logout
        </a>
      </div>
      <!-- logo desktop-->
      <div class="nav__bottom grid grid-rows-3 grid-flow-col gap-4 mt-6">
        <div class="desktop__logo row-span-3 max-h-40">
          <router-link to="/">Logo Desktop</router-link>
        </div>

        <div class="search__bar col-start-3 col-end-4">
          <!-- // SEARCH COMPONENT -->
          <search></search>
        </div>

        <div class="row-end-4 col-span-2">
          <nav class=" flex justify-end">
            <ul class=" flex">
              <li
                v-for="(link, index) in links"
                :key="index"
                class=" h-10 mr-4"
              >
                <router-link
                  :to="link.path"
                  class="custom__links flex items-end h-full justify-center text-xl font-light px-3"
                  >{{ link.page }}</router-link
                >
              </li>
            </ul>

            <!-- wishlist & cart icons desktop-->
            <div class="flex">
              <div
                class="wishlist--icon flex items-end h-9 mr-8 cursor-pointer"
              >
                <img src="../assets/images/heart.svg" alt="Wishlist icon" />
                <span class=" ml-1 justify-end leading-tight">0</span>
              </div>
              <div class="cart--icon flex items-end h-9 cursor-pointer">
                <img
                  src="../assets/images/shopping-cart.svg"
                  alt="Shopping cart icon"
                />
                <span class=" ml-1 justify-end leading-tight">0</span>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
    <!-- // END DESKTOP NAVIGATION-->

    <!-- // MOBILE NAVIGATION-->
    <div class="mobile__nav" v-if="isMobile">
      <div class="pt-8  flex justify-between">
        <!-- logo-->
        <div class="mobile__nav_logo">
          <router-link to="/">Logo mobile</router-link>
        </div>

        <!-- wishlist & cart icons-->
        <div class="flex">
          <div class="wishlist--icon flex items-end h-9 mr-8 cursor-pointer">
            <img src="../assets/images/heart.svg" alt="Wishlist icon" />
            <span class=" ml-1 justify-end leading-tight">0</span>
          </div>
          <div class="cart--icon flex items-end h-9 mr-8 cursor-pointer">
            <img
              src="../assets/images/shopping-cart.svg"
              alt="Shopping cart icon"
            />
            <span class=" ml-1 justify-end leading-tight">0</span>
          </div>

          <router-link
            to="/login"
            class="flex items-end text-base font-light"
            v-if="!isAuthenticated"
            ><svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#242424"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-log-in"
            >
              <path
                d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3"
              /></svg
          ></router-link>

          <a
            v-if="isAuthenticated"
            href="#"
            class="flex text-base font-light items-end"
            @click="logout"
            >Logout</a
          >
        </div>

        <!-- hamburger icons-->
        <div
          @click="toggleMenuNav"
          class="hamburger__icon"
          :class="{ active: mobileNav }"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <!--// SLIDER MENU MOBILE -->
      <transition name="slide-menu">
        <nav v-if="mobileNav" class=" grid grid-rows-rowsMax pt-10 px-5">
          <!-- // SEARCH COMPONENT -->
          <search></search>

          <ul class=" mt-6">
            <li v-for="(link, index) in links" :key="index" class=" leading-10">
              <router-link :to="link.path" class="text-base">{{
                link.page
              }}</router-link>
            </li>
          </ul>
          <div class="flex flex-col justify-end">
            <ul>
              <li class=" leading-10">
                <router-link to="/about-us" class="text-base"
                  >About us</router-link
                >
              </li>
              <li class=" leading-10">
                <router-link to="/contact" class="text-base"
                  >Contact</router-link
                >
              </li>
            </ul>

            <!-- // SOCIAL ICONS COMPONENT -->
            <div class=" mt-12 mb-8">
              <social></social>
            </div>
          </div>
        </nav>
      </transition>
      <!--// END SLIDER MENU MOBILE -->
    </div>
    <!-- // END MOBILE NAVIGATION-->
  </div>
</template>

<script>
import { ref, reactive, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Search from "./Search.vue";
import Social from "./Social.vue";

export default {
  components: { Search, Social },
  setup() {
    const links = reactive([
      { page: "Home", path: "/" },
      { page: "Brands", path: "/brands" },
      { page: "New collections", path: "/new-collections" },
      { page: "Archive", path: "/archive" },
    ]);

    const store = useStore();
    const router = useRouter();

    const isMobile = ref(null);

    const screenWidth = ref(null);

    const checkScreenWidth = () => {
      screenWidth.value = window.innerWidth;
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) ||
        screenWidth.value <= 990
      ) {
        isMobile.value = true;
        return;
      }
      isMobile.value = false;

      return;
    };

    const toggleMenuNav = () => {
      store.dispatch("nav/toggleMobileNav");
    };

    const logout = () => {
      store.dispatch("user/logout");
      router.push("/login");
    };

    const mobileNav = computed(() => store.getters["nav/mobileNav"]);
    const isAuthenticated = computed(
      () => store.getters["user/isAuthenticated"]
    );

    const user = computed(() => store.getters["user/isUser"]);

    onMounted(() => window.addEventListener("resize", checkScreenWidth));

    return {
      links,
      isMobile,
      mobileNav,
      screenWidth,
      checkScreenWidth,
      toggleMenuNav,
      isAuthenticated,
      user,
      logout,
    };
  },
};
</script>

<style lang="scss" scoped>
.custom__links {
  position: relative;
  &:before {
    content: "";
    position: absolute;
    height: 40px;
    width: 40px;
    left: 0;
    top: 7px;
    border-radius: 50%;
    transition: all 0.2s ease-in;
    z-index: -1;
  }

  &.router-link-active {
    &:before {
      border: 1px solid #ffd564;
    }
  }
  &:hover:not(.router-link-active) {
    &:before {
      background-color: #ffd564;
    }
  }
}

.hamburger__icon {
  width: 32px;
  height: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  z-index: 10;
  span {
    width: 100%;
    height: 1px;
    background-color: #242424;
    transform-origin: left;
    transition: all 0.2s ease;
  }

  &.active {
    color: #242424;

    span {
      &:first-child {
        transform: rotate(45deg);
      }
      &:nth-child(2) {
        opacity: 0;
      }
      &:last-child {
        transform: rotate(-45deg);
      }
    }
  }
}

.mobile__nav {
  nav {
    position: fixed;
    top: 0;
    right: 0;
    width: 70vw;
    height: 100vh;
    background-color: #cdcfc5;
    z-index: 5;
  }
}

.slide-menu-enter-active,
.slide-menu-leave-active {
  transition: transform 0.5s ease;
}

.slide-menu-enter-from,
.slide-menu-leave-to {
  transform: translateX(100%);
}
</style>
