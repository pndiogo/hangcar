import Vue from 'vue';
import Vuex from 'vuex';

import { nanoid } from 'nanoid';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    teams: [],
  },
  getters: {
    getAllTeams: (state) => state.teams,
    getTeamById: (state) => (id) => state.teams.find((team) => team.id === id),
    getTeamCompleteStatusById: (state) => (id) => {
      const foundTeam = state.teams.find((team) => team.id === id);
      return foundTeam.isComplete;
    },
  },
  mutations: {
    addNewTeam: (state) => {
      state.teams.push({
        id: nanoid(),
        name: '',
        words: [],
      });
    },
    updateTeam: (state, payload) => {
      const foundTeam = state.teams.find((team) => team.id === payload.id);
      foundTeam.name = payload.name;
      foundTeam.words = payload.words.map((word) => word);
    },
    deleteTeamById: (state, payload) => {
      state.teams = state.teams.filter((team) => team.id !== payload.id);
    },

  },
  actions: {
    addNewTeam: ({ commit }) => {
      commit('addNewTeam');
    },
    updateTeam: ({ commit }, payload) => {
      commit('updateTeam', payload);
    },
    deleteTeamById: ({ commit }, payload) => {
      commit('deleteTeamById', payload);
    },
  },
  modules: {
  },
});
