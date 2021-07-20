import axios from "@/axios";
const state = {
  brands: [],
};

const getters = {
  getAllBrands(state) {
    return state.brands;
  },
};

const mutations = {
  SET_BRANDS(state, brands) {
    state.brands = brands;
  },
};

const actions = {
  async fetchAllBrands({ commit }) {
    try {
      let res = await axios.get("/brands");
      let data = res.data.brands;

      commit("SET_BRANDS", data);
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
