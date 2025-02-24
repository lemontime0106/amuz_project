import { defineStore } from "pinia";
import { db } from "../firebaseConfig";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { useAuthStore } from "@/store/useAuthStore";

export const useTodoStore = defineStore("todoStore", {
  state: () => ({
    searchQuery: "",
    sortOrder: "desc",
    todos: [],
    priorityOrder: {
      High: 1,
      Medium: 2,
      Low: 3,
    },
  }),

  getters: {
    filteredTodos: (state) => {
      let result = [...state.todos];

      if (state.searchQuery.trim()) {
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
    toggleSortOrder() {
      this.sortOrder = this.sortOrder === "desc" ? "asc" : "desc";
    },

    setSearchQuery(query) {
      this.searchQuery = query;
    },

    async fetchTodos() {
      const authStore = useAuthStore();
      if (!authStore.user || !authStore.user.uid) return;

      const userId = authStore.user.uid;
      const todosRef = collection(db, `todos/${userId}/items`);
      try {
        const snapshot = await getDocs(todosRef);
        this.todos = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // console.log("fetch completed");
      } catch (error) {
        // console.log("fetch failed", error);
      }
    },

    async addTodo(newTodo) {
      const authStore = useAuthStore();
      if (!authStore.user || !authStore.user.uid) {
        // console.log("로그인 X");
        return;
      }

      const userId = authStore.user.uid;
      const todosRef = collection(db, `todos/${userId}/items`);

      try {
        const newTodoRef = doc(todosRef);
        await setDoc(newTodoRef, {
          ...newTodo,
          stage: "To Start",
          createdAt: new Date(),
        });

        // console.log("새 Todo 추가 완료:", newTodoRef.id);

        await this.fetchTodos();
      } catch (error) {
        // console.error("Todo 추가 중 오류 발생", error);
      }
    },

    async editTodo(updatedTodo) {
      const authStore = useAuthStore();
      if (!authStore.user || !authStore.user.uid) return;

      const userId = authStore.user.uid;
      const todoRef = doc(db, `todos/${userId}/items/${updatedTodo.id}`);
      await updateDoc(todoRef, updatedTodo);

      const index = this.todos.findIndex((todo) => todo.id === updatedTodo.id);
      if (index !== -1) this.todos[index] = updatedTodo;
    },

    async deleteTodo(todoId) {
      const authStore = useAuthStore();
      if (!authStore.user || !authStore.user.uid) return;

      const userId = authStore.user.uid;
      const todoRef = doc(db, `todos/${userId}/items/${todoId}`);
      await deleteDoc(todoRef);

      this.todos = this.todos.filter((todo) => todo.id !== todoId);
    },

    async moveToNextStage(todo) {
      const authStore = useAuthStore();
      if (!authStore.user || !authStore.user.uid) return;

      const userId = authStore.user.uid;
      const todoRef = doc(db, `todos/${userId}/items/${todo.id}`);
      const newStage = todo.stage === "To Start" ? "In Progress" : "Completed";
      await updateDoc(todoRef, { stage: newStage });

      const index = this.todos.findIndex((t) => t.id === todo.id);
      if (index !== -1) this.todos[index].stage = newStage;
    },

    async moveToPreviousStage(todo) {
      const authStore = useAuthStore();
      if (!authStore.user || !authStore.user.uid) return;

      const userId = authStore.user.uid;
      const todoRef = doc(db, `todos/${userId}/items/${todo.id}`);
      const newStage = todo.stage === "Completed" ? "In Progress" : "To Start";
      await updateDoc(todoRef, { stage: newStage });

      const index = this.todos.findIndex((t) => t.id === todo.id);
      if (index !== -1) this.todos[index].stage = newStage;
    },
  },
});
