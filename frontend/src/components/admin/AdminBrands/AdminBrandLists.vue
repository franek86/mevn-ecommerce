<template>
  <div>
    <AdminTitle title="Brands" />
    <div class="px-6">
      <AdminCreateButton
        btnText="Add brand"
        btnUrl="/admin/brands/create-brand"
      />

      <div v-if="isLoading">
        <Loader />
      </div>

      <div else class="flex flex-wrap">
        <div
          v-for="brand in brands"
          :key="brand._id"
          class="w-full lg:w-1/3 h-48 p-2"
        >
          <div class="flex">
            <!-- edit icon -->
            <div @click="editBrand(brand._id)" class="p-2 cursor-pointer">
              <div class="btn__edit">
                edit
              </div>
            </div>

            <div @click="deleteBrand(brand._id)" class="p-2 cursor-pointer">
              <!-- delete icon -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 hover:opacity-50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#EF4444"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
          </div>
          <div
            class="cart relative overflow-hidden bg-cover shadow-lg cursor-pointer w-full h-full"
            :style="{
              backgroundImage: `url(http://localhost:5000/${brand.brandLogo})`,
            }"
          ></div>
          <p class="text-center uppercase w-full p-2.5">
            {{ brand.title }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import AdminTitle from "../AdminTitle.vue";
import AdminCreateButton from "../AdminCreateButton.vue";
import Loader from "../../Loader.vue";

export default {
  components: {
    AdminTitle,
    AdminCreateButton,
    Loader,
  },

  setup() {
    const store = useStore();
    const route = useRouter();

    const deleteBrand = (id) => {
      store.dispatch("brands/deleteBrand", id);
    };

    const editBrand = (id) => {
      route.push(`/admin/brands/edit-brand/${id}`);
    };

    const brands = computed(() => {
      return store.getters["brands/getAllBrands"];
    });

    const isLoading = computed(() => {
      return store.getters["loader/getLoader"];
    });

    onMounted(() => {
      store.dispatch("brands/fetchAllBrands");
    });

    return {
      brands,
      deleteBrand,
      editBrand,
      isLoading,
    };
  },
};
</script>

<style></style>
