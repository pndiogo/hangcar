/* eslint no-shadow: ["error", { "allow": ["state"] }] */

import { nanoid } from 'nanoid';

// state
const state = () => ({
  teams: [],
});

// getters
const getters = {
  getAllTeams: (state) => state.teams,
  getTeamById: (state) => (payload) => state.teams.find((team) => team.id === payload),
};

// mutations
const mutations = {
  ADD_NEW_TEAM: (state) => {
    state.teams.push({
      id: nanoid(),
      name: '',
      words: [],
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
};

// actions
const actions = {
  addNewTeam: ({ commit }) => {
    commit('ADD_NEW_TEAM');
  },
  updateTeam: ({ commit }, payload) => {
    commit('UPDATE_TEAM', payload);
  },
  deleteTeamById: ({ commit }, payload) => {
    commit('DELETE_TEAM_BY_ID', payload);
  },
  setTeamToInvalidById: ({ commit }, payload) => {
    commit('SET_TEAM_TO_INVALID_BY_ID', payload);
  },
  removeWordDeletedCategoryFromTeams: ({ commit }, payload) => {
    commit('REMOVE_WORD_CATEGORY', payload);
  },

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
