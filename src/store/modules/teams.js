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
    });
  },
  UPDATE_TEAM: (state, payload) => {
    const foundTeam = state.teams.find((team) => team.id === payload.id);
    foundTeam.name = payload.name;
    foundTeam.words = payload.words.map((word) => word);
  },
  DELETE_TEAM_BY_ID: (state, payload) => {
    state.teams = state.teams.filter((team) => team.id !== payload.id);
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

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
