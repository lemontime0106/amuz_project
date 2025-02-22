import { defineStore } from "pinia";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    user: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    getUser: (state) => state.user,
  },

  actions: {
    async register(email, password) {
      const auth = getAuth();
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.user = userCredential.user;
        console.log("Registration successful:", this.user);
      } catch (error) {
        console.error("Registration error:", error);
        throw error;
      }
    },

    async login(email, password) {
      const auth = getAuth();
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.user = userCredential.user;
        console.log("Login successful:", this.user);
        return this.user;
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      }
    },

    async logout() {
      const auth = getAuth();
      try {
        await signOut(auth);
        this.user = null;
        console.log("Logout successful");
      } catch (error) {
        console.error("Logout error:", error);
      }
    },
  },
});
