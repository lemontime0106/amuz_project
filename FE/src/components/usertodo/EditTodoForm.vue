<script setup>
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update:todo"]);

const editableTodo = computed({
  get: () => props.todo,
  set: (updatedTodo) => {
    emit("update:todo", { ...updatedTodo, id: props.todo.id });
  },
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <!-- 제목 입력 -->
    <input
      type="text"
      v-model="editableTodo.title"
      placeholder="Title"
      class="w-full border-2 rounded-lg px-4 py-2 mb-3"
    />

    <!-- 설명 입력 -->
    <textarea
      v-model="editableTodo.description"
      placeholder="Description"
      class="w-full border-2 rounded-lg px-4 py-2 mb-3 h-24"
    ></textarea>

    <!-- 우선순위 선택 -->
    <div class="flex gap-4 items-center">
      <p class="text-black font-bold px-4 py-2">Priority</p>
      <select
        v-model="editableTodo.priority"
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
