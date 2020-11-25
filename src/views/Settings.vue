<template>
  <main class="main-container settings-container">
    <div class="page-header">
      <h1 class="app-title app-title--m">Configurar jogo</h1>
      <button class="btn btn--primary btn--large" @click="start" :disabled="!getAreAllTeamsValid">
        Jogar
      </button>
    </div>

    <section class="section-container categories-container">
      <appCategories></appCategories>
    </section>

    <section class="section-container">
      <app-teams></app-teams>
    </section>

    <div class="actions-container">
      <button class="btn btn--primary btn--large" @click="start" :disabled="!getAreAllTeamsValid">
        Jogar
      </button>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Categories from "../components/Categories.vue";
import Teams from "../components/Teams.vue";

export default {
  name: "Settings",
  components: {
    appCategories: Categories,
    appTeams: Teams,
  },
  computed: {
    ...mapGetters({
      getAreAllTeamsValid: ["teams/getAreAllTeamsValid"],
    }),
  },
  methods: {
    ...mapActions({
      startGame: "game/startGame",
    }),
    start() {
      this.startGame();
      this.$router.push("/");
    },
  },
};
</script>
