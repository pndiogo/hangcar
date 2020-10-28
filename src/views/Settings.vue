<template>
  <main class="main-container settings-container">
    <div class="page-header">
      <h1>Configurar jogo</h1>
      <button class="btn btn-primary btn-large" @click="startGame" :disabled="!getAreAllTeamsValid">
        Jogar
      </button>
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
import { mapGetters, mapActions } from 'vuex';
import Categories from '../components/Categories.vue';
import Teams from '../components/Teams.vue';

export default {
  name: 'Settings',
  components: {
    appCategories: Categories,
    appTeams: Teams,
  },
  computed: {
    ...mapGetters({
      getAreAllTeamsValid: ['teams/getAreAllTeamsValid'],
    }),
  },
  methods: {
    ...mapActions({
      setAndStartGame: 'game/setAndStartGame',
    }),
    startGame() {
      this.setAndStartGame();
      this.$router.push('/');
    },
  },
};
</script>
