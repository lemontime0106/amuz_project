<script setup>
import { ref, defineProps, defineEmits, onMounted } from "vue";

const props = defineProps(["todo"]);
const emit = defineEmits(["moveToNextStage", "moveToPreviousStage", "editTodo", "deleteTodo"]);

const getNextStage = () => {
  if (props.todo.stage === "To Start") return "'In Progress'";
  if (props.todo.stage === "In Progress") return "'Completed'";
  return "";
};

const getPreviousStage = () => {
  if (props.todo.stage === "Completed") return "'In Progress'";
  if (props.todo.stage === "In Progress") return "'To Start'";
  return "";
}

const showMenu = ref(false);

const toggleMenu = (event) => {
  event.stopPropagation();
  showMenu.value = !showMenu.value;
};

const closeMenu = () => {
  showMenu.value = false;
};

onMounted(() => {
  window.addEventListener("click", closeMenu);
});


</script>

<template>
  <div class="bg-white p-4 rounded-xl shadow-md border border-gray-200 relative">
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-2">
        <!-- 우선순위 표시 -->
        <span v-if="props.todo.stage !== 'Completed'"
          class="px-2 py-1 text-xs font-semibold rounded-lg inline-block"
          :class="{
            'bg-red-500 text-white': todo.priority === 'High',
            'bg-yellow-400 text-gray-800': todo.priority === 'Medium',
            'bg-green-500 text-white': todo.priority === 'Low',
          }"
        >
          {{ todo.priority }}
        </span>
        <h3 class="text-lg font-semibold text-gray-800">{{ todo.title }}</h3>
      </div>
      
      <!-- 햄버거 버튼 -->
      <div class="relative">
        <button @click="toggleMenu" class="text-gray-600 hover:text-gray-900">
          <font-awesome-icon :icon="['fas', 'ellipsis-v']" />
        </button>

        <!-- 메뉴 -->
        <div
          v-if="showMenu"
          @click.stop
          class="absolute right-0 top-6 bg-white shadow-md border rounded-lg w-28 z-20"
        >
          <button 
            @click="emit('editTodo', todo); showMenu = false;" 
            class="block w-full text-left px-4 py-2 hover:bg-gray-200 text-gray-700 rounded-t-lg"
          >
            Edit
          </button>
          <button 
            @click="emit('deleteTodo', todo.title); showMenu = false;" 
            class="block w-full text-left px-4 py-2 hover:bg-red-200 text-red-600 rounded-b-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <p class="text-gray-600 text-sm mt-2">{{ todo.description }}</p>

    <div class="mt-3 flex gap-2">
      <button
        v-if="todo.stage !== 'To Start'"
        @click="emit('moveToPreviousStage', todo)"
        class="text-white py-1 rounded-lg hover:bg-gray-700 transition"
        :class="todo.stage === 'Completed' ? 'w-full bg-gray-500' : 'w-1/2 bg-gray-500'"
      >
        Move to {{ getPreviousStage() }}
      </button>

      <button
        v-if="todo.stage !== 'Completed'"
        @click="emit('moveToNextStage', todo)"
        class="text-white py-1 rounded-lg hover:bg-blue-700 transition"
        :class="todo.stage === 'To Start' ? 'w-full bg-blue-500' : 'w-1/2 bg-blue-500'"
      >
        Move to {{ getNextStage() }}
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>
