<template>
  <div
    class="team-container"
    :class="{ 'is-invalid': !this.team.isValid, 'is-editing': isEditMode }"
  >
    <div class="section-title-container">
      <h3 class="section-title section-title--xxs">Equipa</h3>
      <button class="btn-icon title-action" @click="deleteTeam">X</button>
    </div>

    <div class="body-container">
      <input
        class="app-input name-input"
        type="text"
        placeholder="Nome da equipa"
        v-model.trim="name"
        @input="showNameError = false"
        :disabled="!isEditMode"
      />
      <p v-if="showNameError" class="error-message">Nome obrigatório</p>

      <h3 v-if="words.length > 0" class="title">Palavras</h3>

      <div class="sub-titles">
        <h3 class="section-title section-title--xxs">Categoria</h3>
        <h3 class="section-title section-title--xxs">Palavra</h3>
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
          @input="showWordsError === true ? (showWordsError = false) : false"
          :disabled="!isEditMode"
        />
      </div>

      <p v-if="showWordsError" class="error-message">Palavra obrigatória</p>
    </div>

    <div class="actions-container">
      <button v-if="isEditMode" class="btn btn--primary" @click="saveTeam">Guardar</button>
      <button v-else class="btn-icon" @click="toggleEditMode">
        <img src="../assets/svg/edit-round.svg" alt="Editar" />
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { nanoid } from "nanoid";
import { stringNormalize, stringRemoveTildeAndCarrot } from "../utils/utils";

export default {
  name: "Team",
  props: {
    team: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      name: "",
      words: {},
      showNameError: false,
      showWordsError: false,
      isEditMode: null,
    };
  },
  computed: {
    ...mapGetters({
      allCategories: ["categories/getAllCategories"],
    }),
  },
  watch: {
    allCategories: {
      handler(newCategories) {
        this.handleNewCategories(newCategories);
      },
    },
  },
  created() {
    if (this.team.name) {
      this.name = this.team.name;
    }

    if (this.team.words.length === 0) {
      //* new team
      this.isEditMode = true;
      this.handleNewCategories(this.allCategories);
    } else {
      //* existing team
      this.isEditMode = false;
      this.handleExistingWords(this.team.words);
    }
  },
  methods: {
    ...mapActions({
      updateTeam: "teams/updateTeam",
      deleteTeamById: "teams/deleteTeamById",
      setTeamToInvalidById: "teams/setTeamToInvalidById",
    }),
    /*     addNewWord() {
      this.words.push({
        id: nanoid(),
        category: "",
        word: "",
      });

      this.showWordsError = false;
    }, */
    deleteTeam() {
      this.deleteTeamById({
        id: this.team.id,
      });
    },
    saveTeam() {
      const { name } = this;
      let words = Object.values(this.words);

      words = words.map((word) => {
        word.name = stringRemoveTildeAndCarrot(word.name);
        word.parsedName = stringNormalize(word.name);
        return word;
      });

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
    handleNewCategories(categories) {
      categories.forEach((category) => {
        if (!this.words[category.id]) {
          this.words[category.id] = {
            id: nanoid(),
            name: "",
            parsedName: "",
            category,
          };

          this.isEditMode = true;
          this.setTeamToInvalidById(this.team);
        }
      });

      // eslint-disable-next-line
      for (const word in this.words) {
        const x = categories.findIndex((category) => category.id === word);
        if (x === -1) {
          delete this.words[word];
        }
      }
    },
    handleExistingWords(words) {
      words.forEach((word) => {
        this.words[word.category.id] = {
          ...word,
        };
      });
    },
  },
};
</script>
