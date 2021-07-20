<template>
  <div class="container">
    <!-- // SUBSCRIBE -->
    <div class=" bg-yellowLight border-t-2 px-4">
      <div class="flex flex-col pt-12 pb-8 md:flex-row">
        <p class=" w-full md:w-2/4 font-light mr-8 mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut
          dolor lobortis, semper quam vel, facilisis tortor.
        </p>
        <div class="w-full md:w-2/4">
          <newsletter></newsletter>
        </div>
      </div>
    </div>

    <!-- // MAIN SLIDER -->
    <div class=" mb-20">
      <Slider
        :dataForSlider="dataSlider"
        :slides-per-view="1"
        :space-between="0"
      >
        <template v-slot="slotProps">
          <img :src="slotProps.data.sliderImage" alt="" class="object-cover" />
          <div
            class="flex items-end  h-full bg-cover"
            :style="{
              backgroundImage: `url(http://localhost:5000/${slotProps.data.sliderImage})`,
            }"
          ></div>
          <div
            class="caption absolute left-2/4 transform -translate-x-1/2 bottom-0 w-2/5 text-center"
          >
            <p
              class="text-center uppercase w-full py-4 bg-opacity-70"
              :class="
                slotProps.data.titleColor
                  ? 'text-whiteColor bg-darkColor'
                  : 'text-darkColor bg-whiteColor'
              "
            >
              {{ slotProps.data.title }}
            </p>
          </div>
        </template>
      </Slider>
    </div>
  </div>
</template>

<script>
import Newsletter from "../components/Newsletter.vue";
import Slider from "../components/swiperSlider/Slider.vue";

import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";

export default {
  components: {
    Newsletter,
    Slider,
  },

  setup() {
    const store = useStore();

    const dataTest = ref([
      {
        title: "Home from home",
        image: require("@/assets/images/slide-1.jpg"),
      },
      {
        title: "Brands from home",
        image: require("@/assets/images/slide-2.jpg"),
      },
      {
        title: "New collections from home",
        image: require("@/assets/images/slide-3.jpg"),
      },
    ]);

    const dataSlider = computed(() => {
      return store.getters["slider/getSliders"];
    });

    const getProducts = onMounted(() => {
      store.dispatch("products/fetchAllProducts");
    });

    const getSliders = onMounted(() => {
      store.dispatch("slider/fetchSliders");
    });

    return {
      dataTest,
      dataSlider,
      getSliders,
      getProducts,
    };
  },
};
</script>

<style></style>
