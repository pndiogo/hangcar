<template>
  <div>
    <div class="section-title-container">
      <h2 class="section-title section-title--s">Equipas</h2>
      <button class="btn btn--secondary" @click="addNewTeam" :disabled="allCategories.length === 0">
        Adicionar equipa
      </button>
    </div>

    <app-empty-container v-if="allTeams.length === 0">
      <h3 class="section-title section-title--xs">Não existem equipas criadas</h3>
    </app-empty-container>

    <section v-else class="teams-container">
      <app-team v-for="team in allTeams" :key="team.id" :team="team"></app-team>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Teams",
  components: {
    appTeam: () => import("../components/Team"),
    appEmptyContainer: () => import("../components/EmptyContainer"),
  },
  computed: {
    ...mapGetters({
      allTeams: ["teams/getAllTeams"],
      allCategories: ["categories/getAllCategories"],
    }),
  },
  methods: {
    ...mapActions({
      addNewTeam: "teams/addNewTeam",
    }),
  },
};
</script>
