import { createStore } from "vuex";

import user from "./modules/user";
import nav from "./modules/nav";
import loader from "./modules/loader";
import products from "./modules/products";
import slider from "./modules/slider";
import categories from "./modules/categories";
import brands from "./modules/brands";

// Create a new store instance.
const store = createStore({
  modules: {
    user,
    nav,
    loader,
    products,
    slider,
    categories,
    brands,
  },
});
export default store;
