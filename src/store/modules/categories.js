/* eslint no-shadow: ["error", { "allow": ["state"] }] */

// state
const state = () => ({
  categories: [],
});

// getters
const getters = {
  getAllCategories: (state) => state.categories,
  getCategoryById: (state) => (payload) => state.categories.find((team) => team.id === payload),
};

// mutations
const mutations = {
  ADD_CATEGORIES: (state, payload) => {
    state.categories = [...payload];
  },
  UPDATE_CATEGORY: (state, payload) => {
    const foundCategory = state.teams.find((team) => team.id === payload.id);
    foundCategory.name = payload.name;
  },
  DELETE_CATEGORY_BY_ID: (state, payload) => {
    state.teams = state.teams.filter((team) => team.id !== payload.id);
  },
};

// actions
const actions = {
  addCategories: ({ commit }, payload) => {
    commit('ADD_CATEGORIES', payload);
  },
  updateCategory: ({ commit }, payload) => {
    commit('UPDATE_CATEGORY', payload);
  },
  deleteCategpryyId: ({ commit }, payload) => {
    commit('DELETE_CATEGORY_BY_ID', payload);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
