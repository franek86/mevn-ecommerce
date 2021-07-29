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

  SET_CREATE_BRAND(state, brand) {
    state.brands.push(brand);
  },

  DELETE_BRAND(state, brand) {
    let newBrands = state.brands.filter((b) => b._id !== brand);
    state.brands = newBrands;
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

  async createBrand({ commit }, formData) {
    try {
      let res = await axios.post("/brands", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      let data = res.data.saveBrand;
      commit("SET_CREATE_BRAND", data);
    } catch (error) {
      console.log(error);
    }
  },

  async deleteBrand({ commit }, id) {
    await axios.delete(`/brands/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    commit("DELETE_BRAND", id);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
