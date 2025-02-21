<script setup>
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps({
  todo: {
    default: () => ({ title: "", description: "", priority: "Medium" }),
  },
});

const emit = defineEmits(["update:todo"]);
</script>

<template>
  <div class="flex flex-col gap-4">
    <!-- 제목 입력 -->
    <input
      type="text"
      :value="props.todo.title"
      @input="emit('update:todo', { ...props.todo, title: $event.target.value })"
      placeholder="Title"
      class="w-full border-2 rounded-lg px-4 py-2 mb-3"
    />

    <!-- 설명 입력 -->
    <textarea
      :value="props.todo.description"
      @input="emit('update:todo', { ...props.todo, description: $event.target.value })"
      placeholder="Description"
      class="w-full border-2 rounded-lg px-4 py-2 mb-3 min-h-30"
    ></textarea>

    <!-- 우선순위 선택 -->
    <div class="flex gap-4 items-center">
      <p class="text-black font-bold px-4 py-2">Priority</p>
      <select
        :value="props.todo.priority"
        @change="emit('update:todo', { ...props.todo, priority: $event.target.value })"
        class="w-full border-2 rounded-lg px-4 py-2"
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
    </div>
  </div>
</template>

<style scoped>
</style>
