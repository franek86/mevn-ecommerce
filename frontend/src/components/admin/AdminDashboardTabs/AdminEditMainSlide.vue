<template>
  <div>
    <header class="flex justify-between">
      <div></div>
      <!-- //CANCEL BUTTON -->
      <router-link
        to="/admin/dashboard/sliders"
        class="flex items-center cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10"
          viewBox="0 0 20 20"
          fill="#EF4444"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
            clip-rule="evenodd"
          />
        </svg>
        <span class=" font-medium">Cancel</span>
      </router-link>
    </header>

    <div class="lg:w-1/2">
      <form @submit.prevent="editSlide" enctype="multipart/form-data">
        <div class="flex flex-col">
          <div class="flex mb-3 h-full" v-if="!selectedImage">
            <p>Edit image</p>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="#242424"
            >
              <path
                fill-rule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <p else>{{ imageName }}</p>
          <label
            for="upload_image"
            class="flex justify-center items-center bg-yellowLight bg-center bg-cover py-3 px-3 text-center h-32 mb-8 border border-dashed cursor-pointer transition-all hover:bg-whiteColor"
            :style="{
              backgroundImage: `url(http://localhost:5000/${slideValues.sliderImage})`,
            }"
          >
            <input
              type="file"
              id="upload_image"
              placeholder="&nbsp;"
              class="hidden"
              @change="onImageSelect"
            />
          </label>
        </div>

        <div class="form__field mb-6">
          <input
            type="text"
            class="form__input"
            placeholder="&nbsp;"
            v-model="slideValues.title"
          />

          <span class="form__label"> {{ slideValues.title }}</span>
        </div>

        <div class="mb-6 flex flex-col">
          <span class="mb-2">Edit text color</span>
          <input
            class="toggle__checkbox"
            type="checkbox"
            value="chooseTitleColor"
            id="chooseTitleColor"
            :checked="slideValues.titleColor"
            v-model="chooseTitleColor"
          />
          <div v-if="!slideValues.titleColor">
            Black title color
          </div>
          <div v-if="slideValues.titleColor">
            White title color
          </div>
        </div>

        <button type="submit" class="btn__arrow btn__arrow_full">
          Edit slide
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { useRouter, useRoute } from "vue-router";
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { getCurrentInstance } from "vue";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const title = ref("");
    const imageName = ref("");
    const selectedImage = ref(null);
    const chooseTitleColor = ref(false);
    let toast = getCurrentInstance().ctx.$toast;

    const id = route.params.id;

    const editSlide = () => {
      let data = new FormData();

      data.append("title", slideValues.value.title);
      data.append("sliderImage", selectedImage.value);
      data.append("titleColor", chooseTitleColor.value);
      data.append("oldImage", slideValues.value.sliderImage);

      store
        .dispatch("slider/editSlide", data)
        .then(() => {
          toast.success("Brand was updated successfully", {
            position: "bottom-right",
          });

          setTimeout(() => {
            router.push("/admin/dashboard/sliders");
          }, 500);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const onImageSelect = (e) => {
      selectedImage.value = e.target.files[0];
      imageName.value = e.target.files[0].name;
    };

    const slideValues = computed(() => store.getters["slider/getSingleSlide"]);

    onMounted(() => {
      store.dispatch("slider/getSingleSlide", id);
    });

    return {
      title,
      imageName,

      selectedImage,
      onImageSelect,
      editSlide,
      chooseTitleColor,
      slideValues,
    };
  },
};
</script>

<style></style>
