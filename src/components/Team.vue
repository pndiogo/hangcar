<template>
  <div class="team-container">
    <div class="title-container">
      <h3 class="title">Equipa</h3>
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
      <p v-if="showNameError" class="error-message">Nome é obrigatório</p>

      <h3 v-if="words.length > 0" class="title">Palavras</h3>

      <div class="sub-titles">
        <h4 class="sub-title">Categoria</h4>
        <h4 class="sub-title">Palavra</h4>
      </div>

      <div class="words" v-for="category in allCategories" :key="category.id">
        <input
          class="app-input word-input"
          type="text"
          placeholder="Categoria"
          disabled="true"
          :value="category.name"
        />
        <input
          v-model.trim="words[category.id].name"
          class="app-input word-input"
          type="text"
          placeholder="Inserir palavra"
          @input="showWordsError = false"
          :disabled="!isEditMode"
        />
      </div>

      <p v-if="showWordsError" class="error-message">Palavras são obrigatórias</p>
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
import { mapActions, mapGetters } from 'vuex';
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
      words: {},
      showNameError: false,
      showWordsError: false,
      isEditMode: true,
    };
  },
  computed: {
    ...mapGetters({
      allCategories: ['categories/getAllCategories'],
    }),
  },
  watch: {
    allCategories: {
      immediate: true,
      handler(newCategories) {
        newCategories.forEach((category) => {
          if (!this.words[category.id]) {
            this.words[category.id] = {
              id: nanoid(),
              name: '',
              category,
            };

            this.isEditMode = true;
            this.setTeamToInvalidById(this.team);
          }
        });

        // eslint-disable-next-line
        for (const word in this.words) {
          const x = newCategories.findIndex((category) => category.id === word);
          if (x === -1) {
            delete this.words[word];
          }
        }
      },
    },
  },
  created() {
    this.name = this.team.name;
  },
  methods: {
    ...mapActions({
      updateTeam: 'teams/updateTeam',
      deleteTeamById: 'teams/deleteTeamById',
      setTeamToInvalidById: 'teams/setTeamToInvalidById',
    }),
    addNewWord() {
      this.words.push({
        id: nanoid(),
        category: '',
        word: '',
      });

      this.showWordsError = false;
    },
    deleteTeam() {
      this.deleteTeamById({
        id: this.team.id,
      });
    },
    saveTeam() {
      const { name } = this;
      const words = Object.values(this.words);

      if (this.validation(name, words)) {
        this.updateTeam({
          id: this.team.id,
          name,
          words,
        });

        this.toggleEditMode();
      }
    },
    validation(name, words) {
      const isNameValid = name.length > 0;
      const areWordsValid = words.every((word) => word.name);

      if (!isNameValid) {
        this.showNameError = true;
      }

      if (!areWordsValid) {
        this.showWordsError = true;
      }

      return isNameValid && areWordsValid;
    },
    toggleEditMode() {
      this.isEditMode = !this.isEditMode;
    },
  },
};
</script>
