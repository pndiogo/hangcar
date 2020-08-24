<template>
  <div class="settings">

    <div class="page-header">
    <h1>Configurar jogo</h1>
    <button class="btn btn-primary"  @click="addNewTeam">Adicionar equipa +</button>
    </div>

    <div class="teams-container">
      <app-team v-for="team in getAllTeams" :key="team.id" :team="team"></app-team>
    </div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Team from '../components/Team.vue';

export default {
  name: 'Settings',
  components: { appTeam: Team },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      getAllTeams: 'getAllTeams',
    }),
  },
  methods: {
    ...mapActions({
      addNewTeam: 'addNewTeam',
    }),
  },
};
</script>
