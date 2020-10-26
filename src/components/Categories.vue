<template>
  <div>
    <div class="title-container">
      <h2 class="title">Categorias *</h2>
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

      <div v-if="isEditMode" class="actions-container">
        <button class="btn btn-primary btn-small" @click="addNewCategory">
          Adicionar categoria
        </button>
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
      isEditMode: true,
    };
  },
  computed: {
    ...mapGetters({
      allCategories: ['categories/getAllCategories'],
    }),
  },
  created() {
    if (this.allCategories.length > 0) {
      this.categories = [...this.allCategories];
    } else {
      this.addNewCategory();
    }
  },
  methods: {
    ...mapActions({
      addCategories: 'categories/addCategories',
    }),
    addNewCategory() {
      this.categories.push({
        id: nanoid(),
        name: '',
      });
    },
    deleteCategory(id) {
      const foundCategoryIndex = this.categories.findIndex((category) => category.id === id);
      this.categories.splice(foundCategoryIndex, 1);
    },
    saveCategories() {
      if (this.validation()) {
        //* remove categories with no name
        this.categories = this.categories.filter((category) => category.name);

        this.addCategories(this.categories);

        this.toggleEditMode();
      }
    },
    validation() {
      const isValid = this.categories.length > 0
        && this.categories.some((category) => category.name);

      return isValid;
    },
    toggleEditMode() {
      this.isEditMode = !this.isEditMode;
    },
  },
};
</script>
