<template>
  <div>
    <swiper
      ref="mySlider"
      class="h-2/4 mt-8"
      :style="{ height: `${sliderHeight}px` }"
      :slides-per-view="1"
      :pagination="{
        clickable: true,
        el: '.pagination--custom',
        bulletClass: 'pagination-custom-bullets',
      }"
      :autoplay="{ delay: 5000 }"
      :scrollbar="{ draggable: true }"
      :navigation="{ nextEl: '.next--arrow', prevEl: '.prev--arrow' }"
    >
      <swiper-slide
        v-for="(data, index) in dataForSlider"
        :key="index"
        class="relative"
      >
        <slot v-bind:data="data"></slot>
      </swiper-slide>
    </swiper>

    <!-- // NAVIGATION AND PAGINATION CONTAINER -->
    <div class="w-full grid grid-cols-5 justify-end mt-4">
      <!-- // PAGINATION -->

      <div
        class="pagination--custom flex justify-center items-center col-start-1 col-end-6"
      ></div>
      <!-- // NAVIGATION -->
      <div class="flex justify-items-end col-start-6 col-end-7 z-10">
        <!-- // PREV ARROW -->
        <div
          class="slider__arrows flex justify-center items-center cursor-pointer prev--arrow"
        >
          <svg
            width="51"
            height="8"
            viewBox="0 0 51 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.646446 4.35356C0.451183 4.1583 0.451183 3.84171 0.646446 3.64645L3.82843 0.46447C4.02369 0.269208 4.34027 0.269208 4.53553 0.46447C4.7308 0.659732 4.7308 0.976315 4.53553 1.17158L1.70711 4L4.53553 6.82843C4.7308 7.02369 4.7308 7.34028 4.53553 7.53554C4.34027 7.7308 4.02369 7.7308 3.82843 7.53554L0.646446 4.35356ZM51 4.5L1 4.5L1 3.5L51 3.5L51 4.5Z"
              fill="#242424"
            ></path>
          </svg>
        </div>

        <!-- // NEXT ARROW -->
        <div
          class="slider__arrows bg-darkColor flex justify-center items-center cursor-pointer next--arrow"
        >
          <svg
            width="51"
            height="8"
            viewBox="0 0 51 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M50.3536 4.35356C50.5488 4.1583 50.5488 3.84171 50.3536 3.64645L47.1716 0.46447C46.9763 0.269208 46.6597 0.269208 46.4645 0.46447C46.2692 0.659732 46.2692 0.976315 46.4645 1.17158L49.2929 4L46.4645 6.82843C46.2692 7.02369 46.2692 7.34028 46.4645 7.53554C46.6597 7.7308 46.9763 7.7308 47.1716 7.53554L50.3536 4.35356ZM-4.37114e-08 4.5L50 4.5L50 3.5L4.37114e-08 3.5L-4.37114e-08 4.5Z"
              fill="white"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import Swiper core and required modules
import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay,
  Scrollbar,
} from "swiper";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/swiper.scss";

import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Autoplay, Scrollbar]);

export default {
  props: {
    dataForSlider: {
      type: Array,
      default: () => [],
    },
    sliderHeight: {
      type: Number,
      default: 628,
    },
  },
  components: {
    Swiper,
    SwiperSlide,
  },
};
</script>

<style lang="scss">
.slider__arrows {
  height: 100px;
  width: 100px;

  &.swiper-button-disabled {
    opacity: 0.5;
  }

  &.prev--arrow {
    &:hover {
      svg {
        transform: translateX(-10px);
      }
    }
  }

  &.next--arrow {
    &:hover {
      svg {
        transform: translateX(10px);
      }
    }
  }

  svg {
    transition: transform 0.2s ease-in-out;
  }
}

.pagination--custom {
  transform: translateX(8%);
}
.pagination-custom-bullets {
  border: 1px solid #242424;
  border-radius: 50%;
  margin-right: 8px;
  height: 12px;
  width: 12px;
  cursor: pointer;

  &.swiper-pagination-bullet-active {
    background-color: #242424;
  }
}
</style>
