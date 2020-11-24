/* eslint no-shadow: ["error", { "allow": ["state"] }] */

// state
const state = () => ({
  isPlayable: false,
  isGameOver: false,
  teamTurnIndex: 0,
  wordTurnIndex: 0,
});

// getters
const getters = {
  getIsPlayable: (state) => state.isPlayable,
  getIsGameOver: (state) => state.isGameOver,
  // eslint-disable-next-line
  getCurrentTeamIsLast: (state, getters, rootState, rootGetters) => rootGetters['teams/getTotalTeams'] === state.teamTurnIndex + 1,
  // eslint-disable-next-line
  getCurrentWordIsLast: (state, getters, rootState, rootGetters) => rootGetters['categories/getTotalCategories'] === state.wordTurnIndex + 1,
  getCurrentTeamIndex: (state) => state.teamTurnIndex,
  getCurrentWordIndex: (state) => state.wordTurnIndex,
};

// mutations
const mutations = {
  START_GAME: (state) => {
    state.isPlayable = true;
    state.isGameOver = false;
    state.teamTurnIndex = 0;
    state.wordTurnIndex = 0;
  },
  END_GAME: (state) => {
    state.isPlayable = false;
    state.isGameOver = true;
  },
  NEXT_TEAM: (state) => {
    state.teamTurnIndex += 1;
  },
  FIRST_TEAM: (state) => {
    state.teamTurnIndex = 0;
  },
  NEXT_WORD: (state) => {
    state.wordTurnIndex += 1;
  },
};

// actions
const actions = {
  startGame: ({ commit, dispatch }) => {
    commit("START_GAME");
    dispatch("teams/setTeamsInitialPoints", null, { root: true });
  },
  endGame: ({ commit }) => {
    commit("END_GAME");
  },
  activateNextTeam: ({ commit }) => {
    commit("NEXT_TEAM");
  },
  activateFirstTeam: ({ commit }) => {
    commit("FIRST_TEAM");
  },
  activateNextWord: ({ commit }) => {
    commit("NEXT_WORD");
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
