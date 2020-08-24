<template>
  <div class="team">
    <div class="title-container">
      <h2 class="title">Equipa *</h2>
      <input
        class="name team-input"
        type="text"
        placeholder="Nome da equipa"
        v-model="name"
        @input="setName"
      />
      <button class="title-action" @click="deleteTeam">X</button>
    </div>

    <div class="words-container">
      <div class="titles">
        <h3 class="title">Categoria *</h3>
        <h3 class="title">Palavra *</h3>
      </div>
      <div class="words">
        <input class="word team-input" type="text" v-model.trim="category" />
        <input class="word team-input" type="text" v-model.trim="word" />
      </div>

      <div class="action">
        <button class="btn btn-primary btn-small" @click="addNewWord" :disabled="!isWordValid">
          Adicionar palavra +
        </button>
      </div>

      <div v-if="team.words.length > 0" class="selected-words-list">
        <div class="selected-words" v-for="(word, index) in team.words" :key="index">
          <span class="selected-word">{{ word.category }}</span>
          <span class="selected-word">{{ word.word }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Team',
  props: {
    team: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      name: null,
      category: null,
      word: null,
    };
  },
  computed: {
    isWordValid() {
      return !!(this.category && this.word);
    },
  },
  methods: {
    ...mapActions({
      addNewWordToTeam: 'addNewWordToTeam',
      setTeamName: 'setTeamName',
      deleteTeamById: 'deleteTeamById',
    }),
    addNewWord() {
      if (this.isWordValid) {
        this.addNewWordToTeam({
          id: this.team.id,
          category: this.category,
          word: this.word,
        });

        this.clearWordInputs();
      }
    },
    setName() {
      this.setTeamName({
        id: this.team.id,
        name: this.name,
      });
    },
    deleteTeam() {
      this.deleteTeamById({
        id: this.team.id,
      });
    },
    clearWordInputs() {
      this.category = null;
      this.word = null;
    },
  },
};
</script>
