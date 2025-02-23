<script setup>
  import Navbar from './layout/Navbar.vue';
  import MyFooter from './layout/MyFooter.vue';
  import { RouterView } from 'vue-router';
</script>

<template>
  <div class="w-full min-h-screen flex bg-[#202D48]">
    <!-- Sidebar -->
    <nav class="w-1/6 min-w-[200px] max-w-[250px] h-full bg-[#202D48]">
      <Navbar />
    </nav>

    <!-- Main Content -->
    <main class="flex-grow bg-white rounded-l-2xl shadow-lg mt-4">
      <RouterView />
    </main>
  </div>

    <!-- Footer -->
    <footer class="w-full min-h-[80px] bg-[#C4D0EB] text-center flex items-center justify-center">
      <MyFooter />
    </footer>
</template>

<style>
@font-face {
  font-family: 'Pretendard';
  src: url('@/assets/fonts/PretendardVariable.woff2') format('woff2');
  font-weight: 100 900;
  font-style: normal;
}

body {
  font-family: 'Pretendard', sans-serif;
}
</style>
