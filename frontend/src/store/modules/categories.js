import axios from "@/axios";
const state = {
  categories: [],
};

const getters = {
  getAllCategories(state) {
    return state.categories;
  },
};

const mutations = {
  SET_CATEGORIES(state, categories) {
    state.categories = categories;
  },
};

const actions = {
  async fetchAllCategories({ commit }) {
    try {
      let res = await axios.get("/category");
      let data = res.data.cat;

      commit("SET_CATEGORIES", data);
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
