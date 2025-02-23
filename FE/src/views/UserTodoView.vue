<script setup>
import TodoHeader from '@/components/usertodo/TodoHeader.vue';
import Todolist from '@/components/usertodo/Todolist.vue';
import ListHeader from '../components/usertodo/ListHeader.vue';
</script>

<template>
  <div class="flex flex-col px-10 py-6">
    <ListHeader />
    <hr class="text-gray-300 border-2 mt-4 mb-4">
    <div>
      <TodoHeader />
      <Todolist />
    </div>
  </div>
</template>


<style scoped>

</style>
