const state = {
  mobileNav: false,
};

const getters = {
  mobileNav(state) {
    return state.mobileNav;
  },
};

const mutations = {
  SET_MOBILE_NAV(state) {
    state.mobileNav = !state.mobileNav;
  },
};

const actions = {
  toggleMobileNav({ commit }) {
    commit("SET_MOBILE_NAV");
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
