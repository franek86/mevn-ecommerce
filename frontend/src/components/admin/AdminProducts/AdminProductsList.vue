<template>
  <div>
    <AdminTitle title="Products" />
    <div class="px-6">
      <AdminCreateButton
        btnText="Add product"
        btnUrl="/admin/products/create-product"
      />
      <div>
        <div class="select__box w-40 mb-4">
          <select @change="selectedSort" class="w-40 p-2">
            <option>Sort by</option>
            <option value="lowest-price">Lowest price</option>
            <option value="highest-price">Highest price</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </select>
        </div>

        <table class="w-full whitespace-nowrap shadow-lg">
          <thead class=" bg-yellowLight">
            <tr class="text-left font-bold uppercase text-xs text-greenColor">
              <td class=" border-b border-solid p-3 ">#</td>
              <td class=" border-b border-solid p-3 ">Sku</td>
              <td class=" border-b border-solid p-3 ">Title</td>
              <td class=" border-b border-solid p-3 ">Price</td>
              <td class=" border-b border-solid p-3 ">In stock</td>
              <td class=" border-b border-solid p-3 ">Manage</td>
            </tr>
          </thead>

          <tbody class=" bg-whiteColor">
            <tr v-for="(product, index) in products" :key="product._id">
              <td class=" border-b border-solid border-greyColor p-3">
                {{ index + 1 }}
              </td>
              <td class=" border-b border-solid border-greyColor p-3">
                {{ product.sku }}
              </td>
              <td class=" border-b border-solid border-greyColor p-3 ">
                {{ product.title }}
              </td>
              <td class=" border-b border-solid border-greyColor p-3">
                {{ product.price }}
              </td>
              <td class=" border-b border-solid border-greyColor p-3">
                {{ product.inStock }}
              </td>
              <td class="flex border-b border-solid border-greyColor p-3">
                <the-tooltip text="View">
                  <router-link
                    :to="`products/product/${product._id}`"
                    class="px-2 hover:opacity-70"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fill-rule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clip-rule="evenodd"
                      /></svg
                  ></router-link>
                </the-tooltip>

                <the-tooltip text="Edit">
                  <router-link
                    :to="`products/edit-product/${product._id}`"
                    class="px-2 hover:opacity-70"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-7"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#00D100"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </router-link>
                </the-tooltip>

                <the-tooltip text="Delete">
                  <span class="px-2 hover:opacity-70"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      viewBox="0 0 20 20"
                      fill="#EF4444"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clip-rule="evenodd"
                      /></svg
                  ></span>
                </the-tooltip>
              </td>
            </tr>
          </tbody>
        </table>

        <router-view> </router-view>
      </div>
    </div>
  </div>
</template>

<script>
import TheTooltip from "../../TheTooltip.vue";

import AdminTitle from "../AdminTitle.vue";
import AdminCreateButton from "../AdminCreateButton.vue";

import { useStore } from "vuex";

import { computed, onMounted } from "vue";
// import currencyFormat from "../../helpers/currencyFormat";
export default {
  components: {
    TheTooltip,
    AdminTitle,
    AdminCreateButton,
  },

  setup() {
    const store = useStore();

    const products = computed(() => {
      return store.getters["products/getProducts"];
    });

    const sortTitleLowest = (title) => {
      store.commit("products/SORT_PRODUCTS_LOWEST", title);
    };
    const sortTitleHighest = (title) => {
      store.commit("products/SORT_PRODUCTS_HIGHEST", title);
    };

    const sortPriceLowest = (price) => {
      store.commit("products/SORT_PRODUCTS_LOWEST", price);
    };
    const sortPriceHighest = (price) => {
      store.commit("products/SORT_PRODUCTS_HIGHEST", price);
    };

    const selectedSort = (e) => {
      let title = "title";
      let price = "price";
      if (e.target.value === "lowest-price") {
        store.commit("products/SORT_PRODUCTS_LOWEST", price);
      }
      if (e.target.value === "highest-price") {
        store.commit("products/SORT_PRODUCTS_HIGHEST", price);
      }

      if (e.target.value === "a-z") {
        store.commit("products/SORT_PRODUCTS_LOWEST", title);
      }
      if (e.target.value === "z-a") {
        store.commit("products/SORT_PRODUCTS_HIGHEST", title);
      }
    };

    onMounted(() => {
      store.dispatch("products/fetchAllProducts");
    });

    return {
      products,
      sortTitleLowest,
      sortTitleHighest,
      sortPriceLowest,
      sortPriceHighest,
      selectedSort,
    };
  },
};
</script>

<style lang="scss">
select {
  border: 1px solid #eee;
  border-radius: 0.25rem;
  padding: 0.5rem 1.5rem 0.5rem 0.5rem;
  display: flex;
  background-color: white;
  outline: 0;
  cursor: pointer;
  appearance: none;
}

.select__box {
  position: relative;

  &:before {
    content: "";
    position: absolute;
    top: 50%;
    margin-top: -6px;
    right: 0.7rem;
    width: 0;
    height: 0;
    border: solid black;
    border-width: 0 1px 1px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(45deg);
  }
}
</style>
