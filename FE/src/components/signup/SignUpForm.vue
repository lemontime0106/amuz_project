<script setup>
import AuthForm from '@/components/login/AuthForm.vue';

import { ref } from 'vue';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter, RouterLink } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const email = ref("")
const password = ref("")
const confirmPassword = ref("")

const register = async () => {
  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match!");
    return;
  }

  try {
    await authStore.register(email.value, password.value);
    alert("Sign up successful!");
    router.push("/login")
  } catch (e) {
    alert("Error: " + e.message)
  }
}

</script>

<template>
  <div class="flex flex-col items-center w-2/3 h-2/3 bg-[#F2F6FF] p-10 border-2 border-[#DEE6F4] rounded-2xl">
  <AuthForm title="Create an Account" buttonText="Sign Up" :onSubmit="register">
    <div class="flex flex-col gap-4 w-2/3">
      <input v-model="email" id="email" type="email" class="border-2 border-[#DEE6F4] px-4 py-3 bg-white flex-grow rounded-xl" placeholder="Email">
      <input v-model="password" id="password" type="password" class="border-2 border-[#DEE6F4] px-4 py-3 bg-white flex-grow rounded-xl" placeholder="Password">
      <input v-model="confirmPassword" id="confirm-password" type="password" class="border-2 border-[#DEE6F4] px-4 py-3 bg-white flex-grow rounded-xl" placeholder="Confirm Password">
    </div>
  </AuthForm>
  <div class="w-full flex justify-center mt-4">
      <RouterLink to="/login" class="w-2/3 bg-transparent border-2 border-[#202D48] text-[#202D48] hover:bg-[#202D48] hover:text-white hover:cursor-pointer duration-150 font-bold text-2xl rounded-xl py-3 text-center">
        Go To Log In
      </RouterLink>
    </div>
  </div>
</template>
