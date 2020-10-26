<template>
  <div class="team-container">
    <div class="title-container">
      <h2 class="title">Equipa *</h2>
      <button class="btn-icon title-action" @click="deleteTeam">X</button>
    </div>

    <div class="body-container">
      <input
        class="app-input name-input"
        type="text"
        placeholder="Nome da equipa"
        v-model="name"
        @input="showNameError = false"
        :disabled="!isEditMode"
      />
      <p v-if="showNameError" class="error-message">Nome da equipa é obrigatório</p>
      <h3 v-if="words.length > 0" class="title">Palavras *</h3>
      <div v-if="words.length > 0" class="sub-titles">
        <h4 class="sub-title">Categoria *</h4>
        <h4 class="sub-title">Palavra *</h4>
      </div>
      <div class="words" v-for="(word, index) in words" :key="word.id">
        <input
          class="app-input word-input"
          type="text"
          placeholder="Inserir categoria"
          v-model.trim="words[index].category"
          @input="showWordsError = false"
          :disabled="!isEditMode"
        />
        <input
          class="app-input word-input"
          type="text"
          placeholder="Inserir palavra"
          v-model.trim="words[index].word"
          @input="showWordsError = false"
          :disabled="!isEditMode"
        />
        <button v-if="isEditMode" class="btn-icon word-action" @click="deleteWord(word.id)">
          X
        </button>
      </div>

      <p v-if="showWordsError" class="error-message">Categoria e palavra são obrigatórios</p>

      <div v-if="isEditMode" class="actions-container">
        <button class="btn btn-primary btn-small" @click="addNewWord">
          Adicionar palavra
        </button>
      </div>
    </div>

    <div class="actions-container">
      <button v-if="isEditMode" class="btn btn-secondary" @click="saveTeam">
        Guardar
      </button>
      <button v-else class="btn-icon" @click="toggleEditMode">
        <img src="../assets/svg/edit-round.svg" alt="Editar" />
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { nanoid } from 'nanoid';

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
      words: null,
      showNameError: false,
      showWordsError: false,
      isEditMode: true,
    };
  },
  computed: {
    isNameValid() {
      return this.name.length > 0;
    },
    areWordsValid() {
      return (
        this.team.words.length > 0 && this.team.words.every((word) => word.category && word.word)
      );
    },
  },
  created() {
    this.name = this.team.name;
    this.words = this.team.words;
  },
  /* watch: {
    team: {
      handler(newValue) {
        this.words = [...newValue.words];
      },
      immediate: true,
      deep: true,
    },
  }, */
  methods: {
    ...mapActions({
      updateTeam: 'teams/updateTeam',
      deleteTeamById: 'teams/deleteTeamById',
    }),
    addNewWord() {
      this.words.push({
        id: nanoid(),
        category: '',
        word: '',
      });

      this.showWordsError = false;
    },
    deleteWord(id) {
      const foundWordIndex = this.words.findIndex((word) => word.id === id);
      this.words.splice(foundWordIndex, 1);

      this.showWordsError = false;
    },
    deleteTeam() {
      this.deleteTeamById({
        id: this.team.id,
      });
    },
    saveTeam() {
      if (this.validation()) {
        this.updateTeam({
          id: this.team.id,
          name: this.name,
          words: this.words,
        });

        this.toggleEditMode();
      }
    },
    validation() {
      if (!this.isNameValid) {
        this.showNameError = true;
      }

      if (!this.areWordsValid) {
        this.showWordsError = true;
      }

      return this.isNameValid && this.areWordsValid;
    },
    toggleEditMode() {
      this.isEditMode = !this.isEditMode;
    },
  },
};
</script>
