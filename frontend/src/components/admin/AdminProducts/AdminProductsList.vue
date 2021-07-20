<template>
  <div>
    <AdminTitle title="Products" />
    <div class="px-6">
      <AdminCreateButton
        btnText="Create product"
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

        <table class="w-full whitespace-nowrap">
          <thead class=" bg-yellowLight">
            <tr class="text-left font-bold uppercase text-xs text-greenColor">
              <td class=" border p-2 "></td>
              <td class=" border p-2 ">Sku</td>
              <td class=" border p-2 ">Title</td>
              <td class=" border p-2 ">Price</td>
              <td class=" border p-2 ">In stock</td>
              <td class=" border p-2 ">Manage</td>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(product, index) in products" :key="product._id">
              <td class=" border border-greenColor p-2">{{ index + 1 }}</td>
              <td class=" border border-greenColor p-2">{{ product.sku }}</td>
              <td class=" border border-greenColor p-2 ">
                {{ product.title }}
              </td>
              <td class=" border border-greenColor p-2">
                {{ product.price }}
              </td>
              <td class=" border border-greenColor p-2">
                {{ product.inStock }}
              </td>
              <td class=" border border-greenColor p-2">
                <router-link
                  :to="`products/product/${product._id}`"
                  class="p-2 bg-greenColor mr-2 text-xs uppercase text-whiteColor cursor-pointer hover:opacity-50 transition-all"
                  >view</router-link
                >
                <router-link
                  :to="`products/edit-product/${product._id}`"
                  class="p-2 bg-orangeColor mr-2 text-xs uppercase text-whiteColor cursor-pointer hover:opacity-50 transition-all"
                  >edit</router-link
                >
                <span
                  class="p-2 bg-redColor mr-2 text-xs uppercase text-whiteColor cursor-pointer hover:opacity-50 transition-all"
                  >delete</span
                >
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
import AdminTitle from "../AdminTitle.vue";
import AdminCreateButton from "../AdminCreateButton.vue";

import { useStore } from "vuex";

import { computed, onMounted } from "vue";
// import currencyFormat from "../../helpers/currencyFormat";
export default {
  components: {
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
