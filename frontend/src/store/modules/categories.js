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

  ADD_CATEGORY(state, category) {
    state.categories.push(category);
  },

  SET_EDIT_CATEGORY(state, cat) {
    let updatedCat = state.categories.find((n) => n._id === cat._id);
    console.log(updatedCat);

    updatedCat.category = cat.category;
  },

  DELETE_CATEGORY(state, index) {
    let newCategories = state.categories.filter((cat) => cat._id !== index);
    state.categories = newCategories;
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

  async createCategory({ commit }, payload) {
    try {
      let res = await axios.post("/category", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      let data = res.data.newCategory;

      commit("ADD_CATEGORY", data);
    } catch (error) {
      console.log(error);
    }
  },

  async editCategory({ commit }, cat) {
    try {
      await axios.put(`/category/${cat._id}`, cat, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      commit("SET_EDIT_CATEGORY", cat);
    } catch (error) {
      console.log(error);
    }
  },

  async deleteCategory({ commit }, id) {
    try {
      await axios.delete(`/category/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      commit("DELETE_CATEGORY", id);
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
