/* eslint no-shadow: ["error", { "allow": ["state"] }] */

// state
const state = () => ({
  categories: [],
});

// getters
const getters = {
  getAllCategories: (state) => state.categories,
  getTotalCategories: (state) => state.categories.length,
};

// mutations
const mutations = {
  UPDATE_CATEGORIES: (state, payload) => {
    state.categories = [...payload];
  },
};

// actions
const actions = {
  updateCategories: ({ commit }, payload) => {
    commit("UPDATE_CATEGORIES", payload);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
