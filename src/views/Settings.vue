<template>
  <main class="main-container settings-container">
    <div class="page-header">
      <h1>Configurar jogo</h1>
    </div>

    <section class="section-container categories-container">
      <appCategories></appCategories>
    </section>

    <section class="section-container">
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
