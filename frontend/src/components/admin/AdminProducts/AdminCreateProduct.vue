<template>
  <div>
    <AdminTitle title="Create product" />
    <div class="px-6">
      <AdminCancelButton btnUrl="/admin/products" />

      <form @submit.prevent="create" class="flex">
        <!-- left inputs -->
        <div class="w-full md:1/2 p-2">
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
          <div class="flex">
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

          <div class="flex">
            <div class="w-full md:1/2 p-2">
              <div class="form__field mb-6">
                <input
                  type="number"
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
                  type="number"
                  class="form__input"
                  placeholder="&nbsp;"
                  v-model="countryOrigin"
                />
                <span class="form__label">County of origin</span>
              </div>
            </div>
          </div>
        </div>

        <!-- right inputs -->
        <div class="w-full md:1/2 p-2">
          <div class="flex">
            <div class="w-full md:1/2">
              <div class="form__field mb-6">
                <p class=" mb-4">Choose categories</p>
                <div
                  class="h-32 p-3 mb-3 overflow-scroll border border-solid border-darkColor bg-whiteColor"
                >
                  <div class="custom__checkbox">
                    <input type="checkbox" id="scales" name="scales" />
                    <label for="scales">Scales</label>
                  </div>

                  <div class="custom__checkbox">
                    <input type="checkbox" id="x" name="x" />
                    <label for="x">x</label>
                  </div>

                  <div class="custom__checkbox">
                    <input type="checkbox" id="y" name="y" />
                    <label for="y">y</label>
                  </div>

                  <div class="custom__checkbox">
                    <input type="checkbox" id="z" name="z" />
                    <label for="z">z</label>
                  </div>

                  <div class="custom__checkbox">
                    <input type="checkbox" id="q" name="q" />
                    <label for="q">q</label>
                  </div>

                  <div class="custom__checkbox">
                    <input type="checkbox" id="w" name="w" />
                    <label for="w">w</label>
                  </div>
                </div>
              </div>
            </div>

            <div class="w-full md:1/2">
              brands
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

import AdminTitle from "../AdminTitle.vue";
import AdminCancelButton from "../AdminCancelButton.vue";
export default {
  components: {
    AdminTitle,
    AdminCancelButton,
  },

  setup() {
    const seeMore = ref(false);

    return {
      seeMore,
    };
  },
};
</script>

<style></style>
