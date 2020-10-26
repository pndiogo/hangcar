<template>
  <main class="main-container settings-container">
    <div class="page-header">
      <h1>Configurar jogo</h1>
      <button class="btn btn-primary" @click="addNewTeam">Adicionar equipa</button>
    </div>

    <section class="section-container categories-container">
      <appCategories></appCategories>
    </section>

    <app-empty-container v-if="allTeams.length === 0">
      Não existem equipas criadas
    </app-empty-container>

    <section v-else class="section-container teams-container">
      <app-teams></app-teams>
    </section>
  </main>
</template>

<script>
import Categories from '../components/Categories.vue';
import Teams from '../components/Teams.vue';

export default {
  name: 'Settings',
  components: {
    appCategories: Categories,
    appTeams: Teams,
  },
};
</script>
