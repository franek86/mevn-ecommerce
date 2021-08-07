<template>
  <div>
    <AdminCreateButton btnText="Add slide" btnUrl="create-slider" />

    <h1 class=" text-2xl text-center" v-if="sliders.length === 0">
      No slider for now. Create one.
    </h1>

    <div else>
      <div v-if="isLoading">
        <Loader />
      </div>

      <div class="flex flex-wrap" v-if="!isLoading">
        <div
          v-for="slide in sliders"
          :key="slide.id"
          class="w-full sm:w-1/2 lg:w-1/3 p-2"
        >
          <div class="flex gap-2 mb-2">
            <!-- //DELETE BUTTON -->

            <the-modal v-if="confirm">
              <template v-slot:content>
                <p class="text-center text-xl mb-3">
                  Are you sure you want to delete this slider?
                </p>
              </template>

              <template v-slot:footer>
                <div class="flex justify-center">
                  <button
                    @click="deleteSlide(slide._id)"
                    class=" bg-redColor px-3 py-2 text-whiteColor mr-4 hover:opacity-70"
                  >
                    Delete
                  </button>
                  <button
                    @click="confirm = false"
                    class=" bg-greenColor px-3 py-2 text-whiteColor hover:opacity-70"
                  >
                    Cancel
                  </button>
                </div>
              </template>
            </the-modal>

            <!-- //EDIT BUTTON -->
            <div class=" cursor-pointer" @click="editSlide(slide._id)">
              <div class="btn__edit">
                Edit
              </div>
            </div>

            <div
              class="flex justify-center items-center cursor-pointer"
              @click="openModal(slide._id)"
            >
              <div class="btn__delete">
                Delete
              </div>
            </div>
          </div>
          <div
            class="flex items-end  h-48 bg-cover shadow-lg"
            :style="{
              backgroundImage: `url(http://localhost:5000/${slide.sliderImage})`,
            }"
          >
            <p
              class="text-center uppercase w-full p-2.5"
              :class="
                slide.titleColor
                  ? 'text-whiteColor bg-darkColor'
                  : 'text-darkColor bg-whiteColor'
              "
            >
              {{ slide.title }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import TheModal from "../../TheModal.vue";
import Loader from "../../Loader.vue";
import AdminCreateButton from "../AdminCreateButton.vue";

export default {
  components: {
    TheModal,
    Loader,
    AdminCreateButton,
  },
  setup() {
    const store = useStore();
    const route = useRouter();

    const confirm = ref(false);

    const sliders = computed(() => {
      return store.getters["slider/getSliders"];
    });

    const getSliders = onMounted(() => {
      store.dispatch("slider/fetchSliders");
    });

    const openModal = () => {
      confirm.value = true;
    };

    const deleteSlide = (id) => {
      store.dispatch("slider/deleteSlide", id).then(() => {
        confirm.value = false;
      });
    };

    const editSlide = (id) => {
      route.push(`/admin/dashboard/edit-slider/${id}`);
    };

    const isLoading = computed(() => {
      return store.getters["loader/getLoader"];
    });

    return {
      isLoading,
      sliders,
      route,
      getSliders,
      confirm,
      openModal,
      deleteSlide,
      editSlide,
    };
  },
};
</script>

<style></style>
