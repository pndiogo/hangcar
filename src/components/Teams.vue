<template>
  <div>
    <div class="title-container">
      <h2 class="title">Equipas</h2>
      <button class="btn btn-secondary" @click="addNewTeam" :disabled="allCategories.length === 0">
        Adicionar equipa
      </button>
    </div>

    <app-empty-container v-if="allTeams.length === 0">
      Não existem equipas criadas
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
