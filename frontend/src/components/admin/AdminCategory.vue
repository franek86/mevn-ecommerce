<template>
  <div>
    <AdminTitle title="Categories" />
    <div class="flex flex-wrap px-6">
      <div class="w-full lg:w-2/5 lg:px-4 mb-6 lg:mb-0">
        <!-- add category -->
        <div>
          <h1 class="mb-3 text-xl">Add category</h1>
          <input
            class="w-full py-3 px-2 mb-4"
            type="text"
            placeholder="Category name"
            v-model="add_category"
          />
          <button class="btn__arrow btn__arrow_full" @click="addCategory">
            Add
          </button>
        </div>
      </div>

      <!-- cat lists edit/delete -->
      <div class="w-full h-auto lg:w-3/5 bg-whiteColor shadow-xl px-4 ">
        <div
          class="flex flex-col border-b border-solid border-greyColor py-3"
          v-for="cat in categories"
          :key="cat._id"
        >
          <div class="flex justify-between mb-2">
            <div class="">
              {{ cat.category }}
            </div>

            <div class="flex items-center">
              <!-- edit icon -->
              <div
                class=" cursor-pointer mr-3 hover:opacity-50"
                @click="toggleEditCategory(cat._id)"
              >
                <div class="btn__edit">
                  edit
                </div>
              </div>

              <!-- delete icon -->
              <div
                class=" cursor-pointer hover:opacity-50"
                @click="deleteCategory(cat._id)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-7 w-7"
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

          <div class="flex" v-if="showEdit === cat._id">
            <input
              class="w-full outline-black px-2"
              type="text"
              v-model="cat.category"
            />
            <button class="btn__arrow" @click="editCategory(cat)">
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

import AdminTitle from "./AdminTitle.vue";

export default {
  components: {
    AdminTitle,
  },

  setup() {
    const store = useStore();
    const showEdit = ref(false);

    const add_category = ref("");

    const addCategory = () => {
      store.dispatch("categories/createCategory", {
        category: add_category.value,
      });
      add_category.value = "";
    };

    const editCategory = async (cat) => {
      store.dispatch("categories/editCategory", cat);
    };

    const deleteCategory = (id) => {
      store.dispatch("categories/deleteCategory", id);
    };

    const toggleEditCategory = (id) => {
      return showEdit.value === id
        ? (showEdit.value = false)
        : (showEdit.value = id);
    };

    const categories = computed(() => {
      return store.getters["categories/getAllCategories"];
    });

    onMounted(() => {
      store.dispatch("categories/fetchAllCategories");
    });

    return {
      categories,
      add_category,

      addCategory,
      toggleEditCategory,
      editCategory,

      deleteCategory,
      showEdit,
    };
  },
};
</script>

<style></style>
