import { createStore } from "vuex";

import user from "./modules/user";
import nav from "./modules/nav";
import products from "./modules/products";
import slider from "./modules/slider";

// Create a new store instance.
const store = createStore({
  modules: {
    user,
    nav,
    products,
    slider,
  },
});
export default store;
