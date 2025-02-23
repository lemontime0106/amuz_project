import { defineStore } from "pinia";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    user: null,
    userAccessToken: localStorage.getItem("userAccessToken") || null,
    userEmail: localStorage.getItem("userEmail") || null,
    isLogIn: !!localStorage.getItem("userAccessToken"),
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    getUser: (state) => state.user,
    getUserEmail: (state) => state.userEmail,
    gerUserToken: (state) => state.userAccessToken,
    getUserId: (state) => state.user?.uid || null,
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
        // console.log("Login successful:", this.user);
        this.userAccessToken = await this.user.getIdToken();
        localStorage.setItem("userAccessToken", this.userAccessToken);
        this.isLogIn = true;
        localStorage.setItem("userEmail", this.user.email);
        this.userEmail = this.user.email;

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
        this.userAccessToken = null;
        this.userEmail = null;
        this.isLogIn = false;
        localStorage.removeItem("userAccessToken");
        console.log("Logout successful");
      } catch (error) {
        console.error("Logout error:", error);
      }
    },
    initAuth() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
          this.userAccessToken = user.getIdToken();
          this.isLogIn = true;
          console.log("loginstate : login :", user.uid);
        } else {
          this.user = null;
          this.userAccessToken = null;
          this.isLogIn = false;
          console.log("loginstate : logout");
        }
      });
    },
  },
});
