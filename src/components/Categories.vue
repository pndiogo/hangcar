<template>
  <div>
    <div class="title-container">
      <h2 class="title">Categorias</h2>
      <button class="btn btn-primary" :disabled="!isEditMode" @click="addNewCategory">
        Adicionar categoria
      </button>
    </div>

    <div class="body-container">
      <div class="app-input-wrapper" v-for="category in categories" :key="category.id">
        <input
          class="app-input category-input"
          type="text"
          placeholder="Nome da categoria"
          v-model.trim="category.name"
          :disabled="!isEditMode"
        />
        <button v-if="isEditMode" class="btn-icon" @click="deleteCategory(category.id)">X</button>
      </div>
    </div>

    <div class="actions-container">
      <button v-if="isEditMode" class="btn btn-secondary" @click="saveCategories">
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
  name: 'Categories',
  data() {
    return {
      categories: [],
      isEditMode: null,
    };
  },
  computed: {
    ...mapGetters({
      allCategories: ['categories/getAllCategories'],
    }),
  },
  created() {
    if (this.allCategories.length > 0) {
      // existing categories
      this.isEditMode = false;
      this.categories = [...this.allCategories];
    } else {
      //* is new game
      this.isEditMode = true;
      this.addNewCategory();
    }
  },
  methods: {
    ...mapActions({
      updateCategories: 'categories/updateCategories',
      removeWordDeletedCategoryFromTeams: 'teams/removeWordDeletedCategoryFromTeams',
    }),
    addNewCategory() {
      this.categories.push({
        id: nanoid(),
        name: '',
      });
    },
    deleteCategory(id) {
      const foundCategoryIndex = this.categories.findIndex((category) => category.id === id);
      this.removeWordDeletedCategoryFromTeams(this.categories[foundCategoryIndex].id);
      this.categories.splice(foundCategoryIndex, 1);
    },
    saveCategories() {
      if (this.validation(this.categories)) {
        //* remove categories with no name
        this.categories = this.categories.filter((category) => category.name);

        this.updateCategories([...this.categories]);

        this.toggleEditMode();
      }
    },
    validation(categories) {
      const isValid = categories.length > 0
        && categories.some((category) => category.name);

      return isValid;
    },
    toggleEditMode() {
      this.isEditMode = !this.isEditMode;
    },
  },
};
</script>
