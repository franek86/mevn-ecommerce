<template>
  <div>
    <AdminTitle title="Create brand" />
    <div class="px-6">
      <AdminCancelButton btnUrl="/admin/brands" />

      <form class="flex flex-wrap" @submit.prevent="addBrand">
        <!-- left inputs -->
        <div class="w-full md:w-1/2 p-2">
          <!-- title -->
          <div class="form__field mb-6">
            <input
              type="text"
              class="form__input"
              placeholder="&nbsp;"
              v-model="title"
            />
            <span class="form__label">Title</span>
          </div>
          <!-- Subtitle -->
          <div class="flex flex-wrap">
            <div class="w-full">
              <div class="form__field mb-6">
                <input
                  type="text"
                  class="form__input"
                  placeholder="&nbsp;"
                  v-model="subtitle"
                />
                <span class="form__label">Subtitle</span>
              </div>
            </div>
          </div>

          <!-- description -->
          <div class="form__field mb-6">
            <textarea
              rows="6"
              class="form__input"
              placeholder="&nbsp;"
              v-model="description"
            ></textarea>
            <span class="form__label">Description</span>
          </div>
        </div>

        <!-- right inputs -->
        <div class="w-full md:w-1/2 p-2">
          <div class="px-6">
            <!-- upload image -->
            <div>
              <div class="flex flex-col">
                <label
                  for="upload_image"
                  class="flex justify-center items-center bg-yellowLight py-3 px-3 text-center h-32 mb-8 border border-dashed cursor-pointer transition-all hover:bg-whiteColor"
                >
                  <div
                    class="flex justify-center items-center h-full"
                    v-if="!selectedImage"
                  >
                    <p>Upload brand logo</p>

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
            </div>

            <button type="submit" class="btn__arrow btn__arrow_full">
              Add brand
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { getCurrentInstance } from "vue";

import AdminTitle from "../AdminTitle.vue";
import AdminCancelButton from "../AdminCancelButton.vue";
export default {
  components: {
    AdminTitle,
    AdminCancelButton,
  },

  setup() {
    const store = useStore();
    const router = useRouter();

    const title = ref("");
    const subtitle = ref("");
    const description = ref("");
    const selectedImage = ref(null);
    const imageName = ref("");

    let toast = getCurrentInstance().ctx.$toast;

    const addBrand = () => {
      let data = new FormData();
      data.append("title", title.value);
      data.append("subtitle", subtitle.value);
      data.append("description", description.value);
      data.append("brandLogo", selectedImage.value);

      store.dispatch("brands/createBrand", data);

      toast.success("Brand was posted successfully", {
        position: "bottom-right",
      });
      router.push("/admin/brands");
    };

    const onImageSelect = (e) => {
      selectedImage.value = e.target.files[0];
      imageName.value = e.target.files[0].name;
    };

    return {
      addBrand,
      title,
      subtitle,
      description,
      selectedImage,
      onImageSelect,
      imageName,
    };
  },
};
</script>

<style></style>
