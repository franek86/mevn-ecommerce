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
          <div class="flex mb-2">
            <!-- edit icon -->
            <div @click="editBrand(brand._id)" class=" mr-2 cursor-pointer">
              <div class="btn__edit">
                Edit
              </div>
            </div>

            <div @click="deleteBrand(brand._id)" class="cursor-pointer">
              <!-- delete icon -->
              <div class="btn__delete">Delete</div>
            </div>
          </div>
          <div
            class="bg-whiteColor bg-no-repeat bg-center bg-70% relative overflow-hidden shadow-lg cursor-pointer w-full h-full"
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
