import { defineStore } from "pinia";

export const useTodoStore = defineStore("todoStore", {
  state: () => ({
    searchQuery: "",
    sortOrder: "desc",
    todos: JSON.parse(localStorage.getItem("todos")) || [
      {
        id: 1,
        title: "Vue 공부",
        description: "Vue 3 Composition API 학습하기",
        priority: "High",
        stage: "To Start",
      },
      {
        id: 2,
        title: "Tailwind 적용",
        description: "Tailwind CSS 적용",
        priority: "Medium",
        stage: "To Start",
      },
      {
        id: 3,
        title: "API 연동",
        description: "Axios, Vuex, Vue Router, JWT, JWT-Decode",
        priority: "Low",
        stage: "To Start",
      },
    ],
  }),

  getters: {
    // 우선순위 매핑
    priorityOrder: () => ({
      High: 1,
      Medium: 2,
      Low: 3,
    }),

    // 검색어
    filteredTodos: (state) => {
      let result = state.todos;

      if (state.searchQuery) {
        result = result.filter(
          (todo) =>
            todo.title
              .toLowerCase()
              .includes(state.searchQuery.toLowerCase()) ||
            todo.description
              .toLowerCase()
              .includes(state.searchQuery.toLowerCase())
        );
      }

      return result.sort((a, b) => {
        const order = state.priorityOrder;
        return state.sortOrder === "asc"
          ? order[a.priority] - order[b.priority]
          : order[b.priority] - order[a.priority];
      });
    },

    toStartTodos: (state) =>
      state.todos.filter((todo) => todo.stage === "To Start"),
    inProgressTodos: (state) =>
      state.todos.filter((todo) => todo.stage === "In Progress"),
    completedTodos: (state) =>
      state.todos.filter((todo) => todo.stage === "Completed"),
  },

  actions: {
    setSearchQuery(query) {
      this.searchQuery = query;
    },

    toggleSortOrder() {
      this.sortOrder = this.sortOrder === "desc" ? "asc" : "desc";
    },

    addTodo(newTodo) {
      const id = Date.now().toString();
      this.todos.push({ id, ...newTodo, stage: "To Start" });
      this.saveToLocalStorage();
    },

    editTodo(updatedTodo) {
      const index = this.todos.findIndex((todo) => todo.id === updatedTodo.id);
      if (index !== -1) {
        this.todos[index] = { ...updatedTodo };
        this.saveToLocalStorage();
      }
    },

    deleteTodo(todoId) {
      this.todos = this.todos.filter((todo) => todo.id !== todoId);
      this.saveToLocalStorage();
    },

    moveToNextStage(todo) {
      const index = this.todos.findIndex((t) => t.id === todo.id);
      if (index !== -1) {
        if (this.todos[index].stage === "To Start") {
          this.todos[index].stage = "In Progress";
        } else if (this.todos[index].stage === "In Progress") {
          this.todos[index].stage = "Completed";
        }
        this.saveToLocalStorage();
      }
    },

    moveToPreviousStage(todo) {
      const index = this.todos.findIndex((t) => t.id === todo.id);
      if (index !== -1) {
        if (this.todos[index].stage === "In Progress") {
          this.todos[index].stage = "To Start";
        } else if (this.todos[index].stage === "Completed") {
          this.todos[index].stage = "In Progress";
        }
        this.saveToLocalStorage();
      }
    },

    saveToLocalStorage() {
      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
  },
});
