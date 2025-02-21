<script setup>
  import { RouterLink } from 'vue-router';

</script>

<template>
  <div class="flex flex-col px-4 py-5">
    <div>
      <RouterLink to="/">
        <h1 class="lg-text-5xl text-3xl font-extrabold text-white mt-2">Todolist</h1>
      </RouterLink>
    </div>
    <hr class="border-2 border-white my-4">
    <div class="flex flex-col">
      <div class="flex items-center gap-2 hover:bg-[#334977] hover:font-semibold duration-150 rounded-2xl px-4 py-2">
        <font-awesome-icon :icon="['fas', 'list-check']" class="text-white"/>
        <RouterLink to="/todos" class="text-white text-2xl">My Todo</RouterLink>
      </div>
      <div>
        <p class="text-white text-xl px-4 py-2">
          업데이트 예정...
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
