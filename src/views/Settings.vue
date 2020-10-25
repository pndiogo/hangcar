<template>
  <main class="settings">
    <div class="page-header">
      <h1>Configurar jogo</h1>
      <button class="btn btn-primary" @click="addNewTeam">Adicionar equipa +</button>
    </div>

    <div class="teams-container">
      <div v-if="allTeams.length === 0" class="wrapper-empty">
        <img src="../assets/svg/shark-fin.svg" alt="Vazio">
        <p>Não existem equipas criadas</p>
      </div>
      <div v-else class="wrapper-with-teams">
        <app-team v-for="team in allTeams" :key="team.id" :team="team"></app-team>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Team from '../components/Team.vue';

export default {
  name: 'Settings',
  components: { appTeam: Team },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      allTeams: 'getAllTeams',
    }),
  },
  methods: {
    ...mapActions({
      addNewTeam: 'addNewTeam',
    }),
  },
};
</script>
