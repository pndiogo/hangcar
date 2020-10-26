import Vue from 'vue';
import Vuex from 'vuex';
import categories from './modules/categories';
import teams from './modules/teams';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    categories,
    teams,
  },
});
