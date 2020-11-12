/* eslint no-shadow: ["error", { "allow": ["state"] }] */

import { nanoid } from "nanoid";

// state
const state = () => ({
  teams: [],
  areAllTeamsValid: false,
});

// getters
const getters = {
  getAllTeams: (state) => state.teams,
  getTeamById: (state) => (payload) => state.teams.find((team) => team.id === payload),
  getTotalTeams: (state) => state.teams.length,
  // eslint-disable-next-line
  getPlayingTeam: (state, getters, rootState, rootGetters) => state.teams[rootGetters['game/getCurrentTeamIndex']],
  // eslint-disable-next-line
  getPlayingTeamActiveWord: (state, getters, rootState, rootGetters) => {
    const playingTeam = state.teams[rootGetters["game/getCurrentTeamIndex"]];
    if (playingTeam !== undefined && playingTeam.words) {
      return playingTeam.words[rootGetters["game/getCurrentWordIndex"]];
    }
    return undefined;
  },
  getAreAllTeamsValid: (state) => {
    if (state.teams.length > 0) {
      return state.teams.every((team) => team.isValid);
    }
    return false;
  },
};

// mutations
const mutations = {
  ADD_NEW_TEAM: (state) => {
    state.teams.push({
      id: nanoid(),
      name: "",
      words: [],
      score: 0,
      isValid: false,
    });
  },
  UPDATE_TEAM: (state, payload) => {
    const foundTeam = state.teams.find((team) => team.id === payload.id);
    foundTeam.name = payload.name;
    foundTeam.words = payload.words.map((word) => word);
    foundTeam.isValid = true;
  },
  DELETE_TEAM_BY_ID: (state, payload) => {
    state.teams = state.teams.filter((team) => team.id !== payload.id);
  },
  SET_TEAM_TO_INVALID_BY_ID: (state, payload) => {
    const foundTeam = state.teams.find((team) => team.id === payload.id);
    foundTeam.isValid = false;
  },
  // eslint-disable-next-line
  REMOVE_WORD_CATEGORY: (state, payload) => {
    state.teams.forEach((team) => {
      const foundWordIndex = team.words.findIndex((word) => word.category.id === payload);
      if (foundWordIndex) {
        team.words.splice(foundWordIndex, 1);
      }
    });
  },
  // eslint-disable-next-line
  ADD_POINT: (state, payload) => {
    state.teams[payload].score += 1;
  },
  SET_POINTS: (state, payload) => {
    // eslint-disable-next-line
    state.teams.forEach((team) => team.score = 10 * payload);
  },
  SUBTRACT_POINT: (state, payload) => {
    const foundTeam = state.teams.find((team) => team.id === payload);
    foundTeam.score -= 1;
  },
};

// actions
const actions = {
  addNewTeam: ({ commit }) => {
    commit("ADD_NEW_TEAM");
  },
  updateTeam: ({ commit }, payload) => {
    commit("UPDATE_TEAM", payload);
  },
  deleteTeamById: ({ commit }, payload) => {
    commit("DELETE_TEAM_BY_ID", payload);
  },
  setTeamToInvalidById: ({ commit }, payload) => {
    commit("SET_TEAM_TO_INVALID_BY_ID", payload);
  },
  removeWordDeletedCategoryFromTeams: ({ commit }, payload) => {
    commit("REMOVE_WORD_CATEGORY", payload);
  },
  addPointToPlayingTeamScore: ({ commit, rootGetters }) => {
    commit("ADD_POINT", rootGetters["game/getCurrentTeamIndex"]);
  },
  setTeamsInitialPoints: ({ commit, rootGetters }) => {
    commit("SET_POINTS", rootGetters["categories/getTotalCategories"]);
  },
  subtractPointToTeam: ({ commit }, payload) => {
    commit("SUBTRACT_POINT", payload);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
