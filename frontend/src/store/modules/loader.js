const state = {
  loader: false,
};

const getters = {
  getLoader(state) {
    return state.loader;
  },
};

const mutations = {
  SET_LAODER(state, payload) {
    state.loader = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
};
