import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    teams: [],
  },
  getters: {
    getAllTeams: (state) => state.teams,
    getTeamByID: (state) => (id) => state.teams.find((team) => team.id === id),
  },
  mutations: {
    addNewTeam: (state) => {
      state.teams.push({
        id: Math.floor(Math.random() * 1000000),
        name: '',
        words: [],
      });
    },
    addNewWordToTeam: (state, payload) => {
      const foundTeam = state.teams.find((team) => team.id === payload.id);
      foundTeam.words.push(
        {
          category: payload.category,
          word: payload.word,
        },
      );
    },
    setTeamName: (state, payload) => {
      const foundTeam = state.teams.find((team) => team.id === payload.id);
      foundTeam.name = payload.name;
    },
    deleteTeamById: (state, payload) => {
      state.teams = state.teams.filter((team) => team.id !== payload.id);
    },
  },
  actions: {
    addNewTeam: ({ commit }) => {
      commit('addNewTeam');
    },
    addNewWordToTeam: ({ commit }, payload) => {
      commit('addNewWordToTeam', payload);
    },
    setTeamName: ({ commit }, payload) => {
      commit('setTeamName', payload);
    },
    deleteTeamById: ({ commit }, payload) => {
      commit('deleteTeamById', payload);
    },
  },
  modules: {
  },
});
