import axios from "@/axios";

const state = {
  products: [],
  product: {},
};

const getters = {
  getProducts(state) {
    return state.products;
  },

  getProduct(state) {
    return state.product;
  },
};

const mutations = {
  SET_PRODUCTS(state, payload) {
    state.products = payload;
  },

  SET_SINGLE_PRODUCT(state, product) {
    state.product = product;
  },

  SORT_PRODUCTS_LOWEST(state, payload) {
    state.products.sort((a, b) => (a[payload] < b[payload] ? -1 : 1));
  },

  SORT_PRODUCTS_HIGHEST(state, payload) {
    state.products.sort((a, b) => (a[payload] > b[payload] ? -1 : 1));
  },
};

const actions = {
  async fetchAllProducts({ commit }) {
    let res = await axios.get("/products");
    let data = res.data.products;

    commit("SET_PRODUCTS", data);
  },

  async createProduct({ commit }, formData) {
    try {
      let res = await axios.post("/products", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      let data = res.data.product;
      console.log(data);
      commit("SET_PRODUCTS", data);
    } catch (error) {
      console.log(error);
    }
  },

  async fetchSingleProduct({ commit }, params) {
    try {
      let res = await axios.get(`/products/${params}`);
      commit("SET_SINGLE_PRODUCT", res.data.product);
    } catch (error) {
      console.log(error);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
