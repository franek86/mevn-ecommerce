<template>
  <div>
    <BreadCrumb />
    <div class="container">
      <div class=" flex justify-center">
        <Loader v-if="loader" />
        <div class="form w-full md:w-2/3 xl:w-1/3" v-else>
          <h1 class="text-3xl text-darkColor">Hello</h1>
          <p class=" mb-8">Sign in for your account</p>
          <error v-if="error" :error="error"></error>

          <form @submit.prevent="login()">
            <div class="form__field mb-6">
              <input
                type="email"
                class="form__input"
                placeholder="&nbsp;"
                v-model="email"
              />
              <span class="form__label">Email</span>
            </div>
            <div class="form__field">
              <input
                :type="show ? 'password' : 'text'"
                class="relative form__input"
                placeholder="&nbsp;"
                v-model="password"
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

            <div class="flex justify-between mt-4 mb-6">
              <div class="flex items-center mr-4 mb-2">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  value="yes"
                  class="opacity-0 absolute h-8 w-8"
                />
                <div
                  class="bg-white border border-blue-400 w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500"
                >
                  <svg
                    class="fill-current hidden w-3 h-3 text-blue-600 pointer-events-none"
                    version="1.1"
                    viewBox="0 0 17 12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="none" fill-rule="evenodd">
                      <g
                        transform="translate(-9 -11)"
                        fill="#242424"
                        fill-rule="nonzero"
                      >
                        <path
                          d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z"
                        />
                      </g>
                    </g>
                  </svg>
                </div>
                <label for="remember" class="select-none">Remember me</label>
              </div>

              <div>
                <router-link to="/" class=" font-bold"
                  >Forgot password</router-link
                >
              </div>
            </div>

            <button type="sumbit" class="btn__arrow">
              Login
            </button>
          </form>
          <p class=" mt-4">
            Not a member?
            <router-link to="/registration" class=" font-bold"
              >Create account!</router-link
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumb from "../Breadcrumb.vue";
import Loader from "../Loader.vue";
import Error from "./Error.vue";

import { useStore } from "vuex";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

export default {
  components: {
    BreadCrumb,
    Loader,
    Error,
  },

  setup() {
    const store = useStore();
    const router = useRouter();

    const email = ref("");
    const password = ref("");
    const loader = ref(false);
    const show = ref(true);
    const error = ref("");

    const login = async () => {
      loader.value = true;
      try {
        await store.dispatch("user/login", {
          email: email.value,
          password: password.value,
        });
        await store.dispatch("user/currentUser");
        let user = computed(() => store.getters["user/isUser"]);

        if (user.value.role === 1) {
          router.push("/admin/dashboard");
        }
        if (user.value.role === 0) {
          router.push("/profile");
        }
      } catch (err) {
        error.value = "Invalid email or password";
        loader.value = false;
      }
      loader.value = false;
    };

    return {
      email,
      password,
      login,
      loader,
      router,
      show,
      error,
    };
  },
};
</script>

<style lang="scss">
.form__label {
  //   transform: translate(10px, 17px);
  transition: transform 100ms ease 0s, color 100ms ease 0s,
    font-size 100ms ease 0s;
}
.form__input {
  &:not(:placeholder-shown),
  &:focus {
    + .form__label {
      font-size: 0.8rem;
      transform: translate(-8px, -30px);
    }
  }
}
</style>
