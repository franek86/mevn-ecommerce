<template>
  <div>
    <AdminTitle title="Create product" />
    <div class="px-6">
      <AdminCancelButton btnUrl="/admin/products" />

      <form @submit.prevent="create" class="flex flex-wrap">
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
                  v-model="sku"
                />
                <span class="form__label">SKU</span>
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
                  />
                  <label :for="brand.title">{{ brand.title }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from "vue";
import { useStore } from "vuex";

import AdminTitle from "../AdminTitle.vue";
import AdminCancelButton from "../AdminCancelButton.vue";
export default {
  components: {
    AdminTitle,
    AdminCancelButton,
  },

  setup() {
    const store = useStore();

    const tabs = reactive(["Categories", "Brands"]);
    const component = ref("Categories");
    const currentTab = ref(0);

    const selectedTab = (tab) => {
      currentTab.value = tab;
    };

    const activeTab = computed(() => {
      return tabs[currentTab.value];
    });

    const categories = computed(() => {
      return store.getters["categories/getAllCategories"];
    });

    const brands = computed(() => {
      return store.getters["brands/getAllBrands"];
    });

    onMounted(() => {
      store.dispatch("categories/fetchAllCategories");
      store.dispatch("brands/fetchAllBrands");
    });

    return {
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
