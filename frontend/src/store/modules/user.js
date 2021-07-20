import axios from "@/axios";

const state = {
  token: localStorage.getItem("token") || null,
  user: {},
  error: "",
};

const getters = {
  isAuthenticated(state) {
    return state.token !== null;
  },

  isUser(state) {
    return state.user;
  },
};

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
  },

  SET_USER(state, user) {
    state.user = user;
  },

  SET_LOGOUT(state) {
    state.token = null;
    state.user = null;
  },

  SET_ERROR(state, error) {
    state.error = error;
  },
};

const actions = {
  async login({ commit }, payload) {
    let credetials = {
      email: payload.email,
      password: payload.password,
    };

    let res = await axios.post("/auth/login", credetials);

    let token = res.data.token;
    if (token) {
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = token;
      commit("SET_TOKEN", token);
      commit("SET_USER", res.data);
    }
  },

  async register(_, payload) {
    let formData = {
      username: payload.username,
      email: payload.email,
      password: payload.password,
    };

    await axios.post("/auth/register", formData);
  },

  async currentUser({ commit }, token) {
    if (token) {
      commit("SET_TOKEN", token);
    }
    try {
      let res = await axios.get("/user/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      localStorage.setItem("user", res.data.role);
      commit("SET_USER", res.data);
    } catch (error) {
      //console.log(error);
    }
  },

  async logout({ commit }) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    commit("SET_LOGOUT");
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
