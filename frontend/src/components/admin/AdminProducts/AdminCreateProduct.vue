<template>
  <div>
    <AdminTitle title="Create product" />
    <div class="px-6">
      <AdminCancelButton btnUrl="/admin/products" />

      <form @submit.prevent="addProduct" class="flex flex-wrap">
        <div class="flex flex-col w-full p-2 mb-8">
          <label
            for="upload_image"
            class="flex justify-center items-center bg-yellowLight w-52 mb-5 py-3 px-3 text-center border border-dashed cursor-pointer transition-all hover:bg-whiteColor"
          >
            <div class="flex justify-center items-center h-full">
              <p>Upload images</p>

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

            <input
              type="file"
              multiple
              id="upload_image"
              placeholder="&nbsp;"
              class="hidden"
              @change="onImageSelect"
            />
          </label>
          <div class="flex" v-if="selectedImages.length !== 0">
            <div
              v-for="(selectedImage, index) in selectedImages"
              :key="index"
              class="relative mr-4"
            >
              <!-- <img
                class="h-14 w-14"
                :src="`http://localhost:5000/${selectedImage.path}`"
                alt=""
              /> -->

              <div class="p-2 border border-solid border-darkColor">
                {{ selectedImage.name }}
              </div>

              <div class="absolute -right-2 -top-2 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="#EF4444"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- left inputs -->
        <div class="w-full md:w-1/2 p-2">
          <div class="form__field mb-6">
            <input
              type="number"
              class="form__input"
              placeholder="&nbsp;"
              v-model="sku"
            />
            <span class="form__label">SKU</span>
          </div>

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

          <!-- price & sku -->
          <div class="flex flex-wrap">
            <div class="w-full md:1/2 p-2">
              <div class="form__field mb-6">
                <input
                  type="text"
                  class="form__input"
                  placeholder="&nbsp;"
                  v-model="price"
                />
                <span class="form__label">Price</span>
              </div>
            </div>

            <div class="w-full md:1/2 p-2">
              <div class="form__field mb-6">
                <input
                  type="number"
                  class="form__input"
                  placeholder="&nbsp;"
                  v-model="inStock"
                />
                <span class="form__label">In stock</span>
              </div>
            </div>
          </div>
          <!-- material & country origin -->
          <div class="flex flex-wrap">
            <div class="w-full md:1/2 p-2">
              <div class="form__field mb-6">
                <input
                  type="text"
                  class="form__input"
                  placeholder="&nbsp;"
                  v-model="material"
                />
                <span class="form__label">Material</span>
              </div>
            </div>

            <div class="w-full md:1/2 p-2">
              <div class="form__field mb-6">
                <input
                  type="text"
                  class="form__input"
                  placeholder="&nbsp;"
                  v-model="countryOrigin"
                />
                <span class="form__label">County of origin</span>
              </div>
            </div>
          </div>

          <!-- categories & brands -->
          <div class="flex flex-wrap">
            <div class="w-full md:w-1/2"></div>

            <div class="w-full md:w-1/2"></div>
          </div>
        </div>

        <!-- right inputs -->
        <div class="w-full md:w-1/2 p-2">
          <div class="px-6">
            <div class=" flex flex-row mb-2">
              <div
                v-for="(tab, index) in tabs"
                :key="index"
                @click="selectedTab(index)"
                class=" px-2 py-2 bg-orangeColor mr-4 cursor-pointer text-whiteColor"
                :class="{ 'bg-darkColor': tab === activeTab }"
              >
                {{ tab }}
              </div>
            </div>
            <!-- choose categories -->
            <div v-if="activeTab === 'Categories'">
              <p class="p-2">Choose categories</p>
              <div
                class="p-3 mb-3 border border-solid border-lightGrey bg-whiteColor"
              >
                <div
                  v-for="cat in categories"
                  :key="cat._id"
                  class="custom__checkbox"
                >
                  <input
                    type="checkbox"
                    :id="cat.category"
                    :name="cat.category"
                    :value="cat._id"
                    v-model="prodCat"
                  />
                  <label :for="cat.category">{{ cat.category }}</label>
                </div>
              </div>
            </div>
            <!-- choose brands -->
            <div v-if="activeTab === 'Brands'">
              <p class="p-2">Choose brands</p>
              <div
                class="px-3 py-4 border border-solid border-lightGrey bg-whiteColor"
              >
                <div
                  v-for="brand in brands"
                  :key="brand._id"
                  class="custom__checkbox"
                >
                  <input
                    type="checkbox"
                    :id="brand.title"
                    :name="brand.title"
                    :value="brand._id"
                    v-model="prodBrand"
                  />
                  <label :for="brand.title">{{ brand.title }}</label>
                </div>
              </div>
            </div>

            <button type="submit" class="btn__arrow btn__arrow_full">
              Add product
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from "vue";
import { useStore } from "vuex";

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

    let toast = getCurrentInstance().ctx.$toast;

    const tabs = reactive(["Categories", "Brands"]);
    const component = ref("Categories");
    const currentTab = ref(0);

    const selectedImages = ref([]);
    const imageName = ref("");

    const sku = ref(0);
    const title = ref("");
    const description = ref("");
    const price = ref(0);
    const inStock = ref(0);
    const material = ref([]);
    const countryOrigin = ref("");
    const prodCat = ref([]);
    const prodBrand = ref([]);

    //Send request to api
    const addProduct = () => {
      let data = new FormData();
      data.append("sku", sku.value);
      data.append("title", title.value);
      data.append("description", description.value);
      data.append("price", price.value);
      data.append("material", material.value);
      data.append("inStock", inStock.value);
      data.append("countryOrigin", countryOrigin.value);
      data.append("productCategory", prodCat.value);
      data.append("productBrand", prodBrand.value);
      data.append("productImages", selectedImages.value);

      store.dispatch("products/createProduct", data);

      toast.success(
        "Product was posted successfully. <a href='/admin/products'>See all products</a>",
        {
          position: "bottom-right",
        }
      );

      selectedImages.value = [];
      sku.value = 0;
      title.value = "";
      description.value = "";
      price.value = 0;
      inStock.value = 0;
      material.value = [];
      countryOrigin.value = "";
      prodCat.value = [];
      prodBrand.value = [];
    };

    //Select images
    const onImageSelect = (e) => {
      selectedImages.value = e.target.files;

      // imageName.value = e.target.files[0].name;
    };

    //Tabs
    const selectedTab = (tab) => {
      currentTab.value = tab;
    };

    const activeTab = computed(() => {
      return tabs[currentTab.value];
    });

    //Ctegories
    const categories = computed(() => {
      return store.getters["categories/getAllCategories"];
    });

    //Brands
    const brands = computed(() => {
      return store.getters["brands/getAllBrands"];
    });

    onMounted(() => {
      store.dispatch("categories/fetchAllCategories");
      store.dispatch("brands/fetchAllBrands");
    });

    return {
      sku,
      title,
      description,
      price,
      inStock,
      material,
      countryOrigin,
      prodCat,
      prodBrand,

      addProduct,

      selectedImages,
      imageName,
      onImageSelect,

      tabs,
      currentTab,
      component,
      selectedTab,
      activeTab,
      categories,
      brands,
    };
  },
};
</script>

<style></style>
