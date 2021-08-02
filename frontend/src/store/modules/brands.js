import axios from "@/axios";
const state = {
  brands: [],
  brand: {},
};

const getters = {
  getAllBrands(state) {
    return state.brands;
  },

  getSingleBrand(state) {
    return state.brand;
  },
};

const mutations = {
  SET_SINGLE_BRAND(state, brand) {
    state.brand = brand;
  },

  SET_BRANDS(state, brands) {
    state.brands = brands;
  },

  SET_CREATE_BRAND(state, brand) {
    state.brands.push(brand);
  },

  SET_EDIT_BRAND(state, brand) {
    state.brand = brand;
  },

  DELETE_BRAND(state, brand) {
    let newBrands = state.brands.filter((b) => b._id !== brand);
    state.brands = newBrands;
  },
};

const actions = {
  async fetchAllBrands({ commit }) {
    commit("loader/SET_LAODER", true, { root: true });

    try {
      let res = await axios.get("/brands");
      let data = res.data.brands;

      commit("SET_BRANDS", data);
      commit("loader/SET_LAODER", false, { root: true });
    } catch (error) {
      console.log(error); //TO DO: error message
      commit("loader/SET_LAODER", false, { root: true });
    }
  },

  async createBrand({ commit }, formData) {
    try {
      commit("loader/SET_LAODER", true, { root: true });
      let res = await axios.post("/brands", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      let data = res.data.saveBrand;
      commit("SET_CREATE_BRAND", data);
      commit("loader/SET_LAODER", false, { root: true });
    } catch (error) {
      console.log(error); //TO DO: error message
    }
  },

  async editBrand({ commit, getters }, formData) {
    let brandId = getters.getSingleBrand._id;
    try {
      commit("loader/SET_LAODER", true, { root: true });
      let res = await axios.put(`/brands/${brandId}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      let data = res.data.updateBrand;
      commit("SET_EDIT_BRAND", data);
      commit("loader/SET_LAODER", false, { root: true });
    } catch (error) {
      console.log(error); //TO DO: error message
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

  async fetchSingleBrand({ commit }, params) {
    try {
      let res = await axios.get(`/brands/${params}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      let data = res.data.brand;

      commit("SET_SINGLE_BRAND", data);
    } catch (error) {
      console.log(error); //TO DO: error message
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
