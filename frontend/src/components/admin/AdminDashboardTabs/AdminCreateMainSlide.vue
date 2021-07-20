<template>
  <div>
    <AdminCancelButton btnUrl="sliders" />

    <p v-if="successMsg">{{ successMsg }}</p>

    <form class="lg:w-1/3" @submit.prevent="createSlide">
      <div class="flex flex-col">
        <label
          for="upload_image"
          class="flex justify-center items-center bg-yellowLight py-3 px-3 text-center h-32 mb-8 border border-dashed cursor-pointer transition-all hover:bg-whiteColor"
        >
          <div
            class="flex justify-center items-center h-full"
            v-if="!selectedImage"
          >
            <p>Upload image</p>

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
          v-model="title"
        />
        <span class="form__label">Text</span>
      </div>

      <div class="mb-6 flex flex-col">
        <span class="mb-2">Choose text color</span>
        <input
          class="toggle__checkbox"
          type="checkbox"
          value="chooseTitleColor"
          id="chooseTitleColor"
          v-model="chooseTitleColor"
        />
        <div v-if="!chooseTitleColor">Black title color</div>
        <div v-if="chooseTitleColor">White title color</div>
      </div>

      <button type="submit" class="btn__arrow btn__arrow_full">
        Create slide
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import AdminCancelButton from "../AdminCancelButton.vue";

export default {
  components: {
    AdminCancelButton,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const title = ref("");
    const imageName = ref("");
    const selectedImage = ref(null);
    const chooseTitleColor = ref(false);

    const successMsg = ref("");

    const createSlide = () => {
      let data = new FormData();
      data.append("title", title.value);
      data.append("sliderImage", selectedImage.value);
      data.append("titleColor", chooseTitleColor.value);

      store
        .dispatch("slider/createSlide", data)
        .then(() => {
          successMsg.value = "Created";

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

    return {
      title,
      imageName,
      selectedImage,
      onImageSelect,
      createSlide,
      chooseTitleColor,
      successMsg,
    };
  },
};
</script>

<style></style>
