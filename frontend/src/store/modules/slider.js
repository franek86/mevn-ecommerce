import axios from "@/axios";

const state = {
  sliders: [],
  slide: {},
  loader: false,
};

const getters = {
  getSliders(state) {
    return state.sliders;
  },

  getSingleSlide(state) {
    return state.slide;
  },

  getLoader(state) {
    return state.loader;
  },
};

const mutations = {
  SET_SLIDERS(state, sliders) {
    state.sliders = sliders;
  },

  SET_NEW_SLIDE(state, slide) {
    state.sliders = slide;
  },

  SET_EDIT_SLIDE(state, slide) {
    state.slider = slide;
  },

  SET_SINGLE_SLIDE(state, slide) {
    state.slide = slide;
  },

  DELETE_SLIDE(state, index) {
    let sliders = state.sliders.filter((i) => i._id !== index);
    state.sliders = sliders;
  },

  SET_LAODER(state, payload) {
    state.loader = payload;
  },
};

const actions = {
  async fetchSliders({ commit }) {
    try {
      commit("SET_LAODER", true);
      let res = await axios.get("/slider");
      let data = res.data.slider;
      setTimeout(() => {
        commit("SET_LAODER", false);
      }, 1000);
      commit("SET_SLIDERS", data);
    } catch (error) {
      commit("SET_LAODER", false);
      console.log(error);
    }
  },

  async createSlide({ commit }, data) {
    try {
      let res = await axios.post("/slider", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      commit("SET_NEW_SLIDE", res.data.slider);
    } catch (error) {
      console.log(error);
    }
  },

  async editSlide({ commit, getters }, data) {
    let slideId = getters.getSingleSlide._id;

    try {
      let res = await axios.put(`/slider/${slideId}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      let slideData = res.data.slider;

      commit("SET_EDIT_SLIDE", slideData);
    } catch (error) {
      console.log(error);
    }
  },

  async deleteSlide({ commit }, id) {
    try {
      await axios.delete(`/slider/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      commit("DELETE_SLIDE", id);
    } catch (error) {
      console.log(error);
    }
  },

  async getSingleSlide({ commit }, params) {
    try {
      let res = await axios.get(`/slider/${params}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      commit("SET_SINGLE_SLIDE", res.data.slider);
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
