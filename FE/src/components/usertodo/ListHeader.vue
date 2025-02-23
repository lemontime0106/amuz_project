<script setup>
import { computed } from "vue";
import { useAuthStore } from "@/store/useAuthStore";

const authStore = useAuthStore();

const userEmail = computed(() => authStore.getUserEmail || "User");
</script>

<template>
  <div>
    <p class="text-gray-500 font-semibold">
      {{ userEmail }} 's DashBoard
    </p>
  </div>
</template>

<style scoped></style>
