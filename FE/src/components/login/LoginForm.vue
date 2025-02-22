<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
import AuthForm from './AuthForm.vue';
import { useAuthStore } from '@/store/useAuthStore';

const authStore = useAuthStore();
const router = useRouter();

const email = ref("");
const password = ref("");

const login = async () => {
  try {
    const user = await authStore.login(email.value, password.value);
    console.log(user)
    if (user) {
      console.log("Login successful:", user.uid, user.email);
      router.push("/");
    }
  } catch (error) {
    console.error("Login failed:", error);
  }
};
</script>

<template>
  <div class="flex flex-col items-center w-2/3 h-2/3 bg-[#F2F6FF] p-10 border-2 border-[#DEE6F4] rounded-2xl">
    <AuthForm title="Please Login" buttonText="Log In" :onSubmit="login">
      <div class="flex flex-col gap-4 w-2/3">
        <input 
          v-model="email"
          id="email" 
          type="text" 
          class="border-2 border-[#DEE6F4] px-4 py-3 bg-white flex-grow rounded-xl" 
          placeholder="Email"
        >
        <input
          v-model="password"
          id="password" 
          type="password" 
          class="border-2 border-[#DEE6F4] px-4 py-3 bg-white flex-grow rounded-xl" 
          placeholder="Password"
        >
      </div>
    </AuthForm>
    <div class="w-full flex justify-center mt-4">
      <a href="/signup" class="w-2/3 bg-transparent border-2 border-[#202D48] text-[#202D48] hover:bg-[#202D48] hover:text-white hover:cursor-pointer duration-150 font-bold text-2xl rounded-xl py-3 text-center">
        Go To Sign Up
      </a>
    </div>
  </div>
</template>

<style scoped>
</style>