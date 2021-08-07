<template>
  <div>
    <AdminTitle title="Edit brand" />
    <div class="px-6">
      <AdminCancelButton btnUrl="/admin/brands" />

      <form class="flex flex-wrap" @submit.prevent="editBrand">
        <!-- left inputs -->
        <div class="w-full md:w-1/2 p-2">
          <!-- title -->
          <div class="form__field mb-6">
            <input
              type="text"
              class="form__input"
              placeholder="&nbsp;"
              v-model="brandValues.title"
            />
            <span class="form__label">{{ brandValues.title }}</span>
          </div>
          <!-- Subtitle -->
          <div class="flex flex-wrap">
            <div class="w-full">
              <div class="form__field mb-6">
                <input
                  type="text"
                  class="form__input"
                  placeholder="&nbsp;"
                  v-model="brandValues.subtitle"
                />
                <span class="form__label">{{ brandValues.subtitle }}</span>
              </div>
            </div>
          </div>

          <!-- description -->
          <div class="form__field mb-6">
            <textarea
              rows="6"
              class="form__input"
              placeholder="&nbsp;"
              v-model="brandValues.description"
            ></textarea>
            <span class="form__label">{{ brandValues.description }}</span>
          </div>
        </div>

        <!-- right inputs -->
        <div class="w-full md:w-1/2 p-2">
          <div class="px-6">
            <!-- upload image -->
            <div>
              <div class="flex flex-col">
                <div class="flex h-full" v-if="!selectedImage">
                  <p>Edit brand logo</p>

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
                <label
                  for="upload_image"
                  class="flex bg-70% bg-center bg-no-repeat bg-whiteColor justify-center items-center py-3 px-3 text-center h-32 mb-8 border border-dashed cursor-pointer transition-all hover:bg-whiteColor"
                  :style="{
                    backgroundImage: `url(http://localhost:5000/${brandValues.brandLogo})`,
                  }"
                >
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
              Edit brand
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
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
    const route = useRoute();

    const title = ref("");
    const subtitle = ref("");
    const description = ref("");
    const selectedImage = ref(null);
    const imageName = ref("");

    let toast = getCurrentInstance().ctx.$toast;

    const brandParams = route.params.id;

    const editBrand = () => {
      let data = new FormData();
      data.append("title", brandValues.value.title);
      data.append("subtitle", brandValues.value.subtitle);
      data.append("description", brandValues.value.description);
      data.append("brandLogo", selectedImage.value);
      data.append("oldImage", brandValues.value.brandLogo);

      store
        .dispatch("brands/editBrand", data)
        .then(() => {
          toast.success("Brand was updated successfully", {
            position: "bottom-right",
          });
          router.push("/admin/brands");
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const onImageSelect = (e) => {
      selectedImage.value = e.target.files[0];
      imageName.value = e.target.files[0].name;
    };

    const brandValues = computed(() => {
      return store.getters["brands/getSingleBrand"];
    });

    onMounted(() => {
      store.dispatch("brands/fetchSingleBrand", brandParams);
    });

    return {
      editBrand,
      brandValues,
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
