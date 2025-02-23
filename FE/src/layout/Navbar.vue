<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/useAuthStore";
import { RouterLink, useRouter } from "vue-router";

const authStore = useAuthStore();
const { isLogIn } = storeToRefs(authStore);
const router = useRouter();

const logout = () => {
  authStore.logout();
  router.push("/");
};
</script>

<template>
  <div class="flex flex-col h-screen px-4 py-5">
    <div>
      <RouterLink to="/">
        <h1 class="lg-text-5xl text-3xl font-extrabold text-white mt-2">Todolist</h1>
      </RouterLink>
    </div>
    <hr class="border-2 border-white my-4">

    <!-- 로그인 O -->
    <div v-if="isLogIn" class="flex flex-col flex-grow">
      <div class="flex flex-col flex-grow">
        <div class="flex items-center gap-2 hover:bg-[#334977] hover:font-semibold duration-150 rounded-2xl px-4 py-2">
          <font-awesome-icon :icon="['fas', 'list-check']" class="text-white"/>
          <RouterLink to="/todos" class="text-white text-2xl">My Todo</RouterLink>
        </div>
        <div>
          <p class="text-white text-xl px-4 py-2">업데이트 예정...</p>
        </div>
      </div>
      <button @click="logout" class="w-2/3 bg-transparent border-2 border-white text-white 
      hover:bg-white hover:text-[#334977] hover:cursor-pointer duration-150 font-bold 
      text-2xl rounded-xl py-3 text-center">
        Logout
      </button>
    </div>

    <!-- 로그인 X -->
    <div v-else class="w-full flex justify-center mt-4">
      <RouterLink to="/login" class="w-2/3 bg-transparent border-2 border-white text-white 
      hover:bg-white hover:text-[#334977] hover:cursor-pointer duration-150 font-bold 
      text-2xl rounded-xl py-3 text-center">
        Login
      </RouterLink>
    </div>
  </div>
</template>
