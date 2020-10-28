/* eslint no-shadow: ["error", { "allow": ["state"] }] */

import { nanoid } from 'nanoid';

// state
const state = () => ({
  teams: [],
  teamTurnIndex: null,
  wordTurnIndex: null,
  areAllTeamsValid: false,
});

// getters
const getters = {
  getAllTeams: (state) => state.teams,
  getTeamById: (state) => (payload) => state.teams.find((team) => team.id === payload),
  getTotalTeams: (state) => state.teams.length,
  getPlayingTeam: (state) => state.teams.find((team) => team.isPlaying),
  getPlayingTeamActiveWord: (state) => {
    const playingTeam = state.teams.find((team) => team.isPlaying);
    if (playingTeam !== undefined && playingTeam.words) {
      const activeWord = playingTeam.words.find((word) => word.isActive);
      return activeWord;
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
      name: '',
      words: [],
      isValid: false,
      isPlaying: false,
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
  SET_START_PLAYING_STATUS: (state) => {
    if (state.teams.length > 0) {
      state.teams.forEach((team, index) => {
        team.words.forEach((word) => {
          word.isActive = false;
        });

        if (index === 0) {
          team.isPlaying = true;
          team.words[0].isActive = true;
        } else {
          team.isPlaying = false;
        }
      });

      state.teamTurnIndex = 0;
      state.wordTurnIndex = 0;
    }
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
  setStartPlayingStatus: ({ commit }) => {
    commit('SET_START_PLAYING_STATUS');
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
