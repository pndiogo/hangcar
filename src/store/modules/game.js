/* eslint no-shadow: ["error", { "allow": ["state"] }] */

// state
const state = () => ({
  isPlayable: false,
});

// getters
const getters = {
  getIsPlayable: (state) => state.isPlayable,
};

// mutations
const mutations = {
  START_GAME: (state) => {
    state.isPlayable = true;
  },
};

// actions
const actions = {
  setAndStartGame: ({ commit, dispatch }) => {
    dispatch('teams/setStartPlayingStatus', null, { root: true });
    commit('START_GAME');
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
