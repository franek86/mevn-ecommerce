<template>
  <div>
    <BreadCrumb />
    <div class="container">
      <div class="flex justify-center">
        <Loader v-if="loader" />
        <div class="form w-full md:w-2/3 xl:w-1/3" v-else>
          <h1 class="text-3xl text-darkColor mb-8">Register</h1>
          <error v-if="error" :error="error"></error>
          <form @submit.prevent="register()">
            <!-- username field -->
            <div class="form__field mb-6">
              <input
                type="text"
                class="form__input"
                placeholder="&nbsp;"
                v-model="formData.username"
              />
              <span class="form__label">Username</span>
            </div>

            <!-- email field -->
            <div class="form__field mb-6">
              <input
                type="email"
                class="form__input"
                placeholder="&nbsp;"
                v-model="formData.email"
              />
              <span class="form__label">Email</span>
            </div>

            <!-- password field -->
            <div class="form__field mb-6">
              <input
                :type="show ? 'password' : 'text'"
                class="relative form__input"
                placeholder="&nbsp;"
                v-model="formData.password"
              />

              <span class="form__label">Password</span>
              <div class=" absolute inset-y-0 right-0 px-3 py-2">
                <!-- icon show-->
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="#242424"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-eye"
                  @click="show = !show"
                  :class="{ hidden: !show, block: show }"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>

                <!-- icon hide-->
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="#242424"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-eye-off"
                  @click="show = !show"
                  :class="{ block: !show, hidden: show }"
                >
                  <path
                    d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22"
                  />
                </svg>
              </div>
            </div>

            <!-- confirm password field -->
            <div class="form__field mb-6">
              <input
                :type="show ? 'password' : 'text'"
                class="relative form__input"
                placeholder="&nbsp;"
              />

              <span class="form__label">Confirm Password</span>
              <div class=" absolute inset-y-0 right-0 px-3 py-2">
                <!-- icon show-->
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="#242424"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-eye"
                  @click="show = !show"
                  :class="{ hidden: !show, block: show }"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>

                <!-- icon hide-->
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="#242424"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-eye-off"
                  @click="show = !show"
                  :class="{ block: !show, hidden: show }"
                >
                  <path
                    d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22"
                  />
                </svg>
              </div>
            </div>

            <p class=" mb-6 opacity-50">
              For sign up, you aggre to our Terms, Data Policy and Cookies
              Policy
            </p>

            <button type="sumbit" class="btn__arrow">
              Sign up
            </button>
          </form>
          <p class=" mt-4 mb-4">
            Have an account?
            <router-link to="/login" class=" font-bold">Log in</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

import BreadCrumb from "../Breadcrumb.vue";
import Loader from "../Loader.vue";
import Error from "./Error.vue";
export default {
  components: {
    BreadCrumb,
    Loader,
    Error,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const loader = ref(false);
    const show = ref(true);
    const error = ref("");

    const formData = reactive({
      username: "",
      email: "",
      password: "",
    });

    const register = async () => {
      loader.value = true;
      try {
        await store.dispatch("user/register", formData);
        loader.value = false;
        router.push("/login");
      } catch (err) {
        error.value = "All fields required";
        loader.value = false;
      }
    };

    return {
      store,
      loader,
      show,
      formData,
      register,
      error,
    };
  },
};
</script>

<style></style>
