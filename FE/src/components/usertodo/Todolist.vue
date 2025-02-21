<script setup>
import { ref, computed } from "vue";
import TodoItems from "./TodoItems.vue";
import Modal from "./Modal.vue";
import AddTodoForm from "./AddTodoForm.vue";
import EditTodoForm from "./EditTodoForm.vue";
import { useTodoStore } from "@/store/useTodoStore";

const todoStore = useTodoStore();

const filteredTodos = computed(() => todoStore.filteredTodos);

const moveToNextStage = (todo) => {
  todoStore.moveToNextStage(todo);
};

const moveToPreviousStage = (todo) => {
  todoStore.moveToPreviousStage(todo);
}

const showAddModal = ref(false);
const newTodo = ref({
  title: "",
  description: "",
  priority: "Medium",
});

const addNewTodo = () => {
  if (!newTodo.value.title.trim()) return;
  todoStore.addTodo(newTodo.value);
  newTodo.value = { title: "", description: "", priority: "Medium" };
  showAddModal.value = false;
}

const showEditModal = ref(false);
const editingTodo = ref(null);

const editTodo = (todo) => {
  editingTodo.value = JSON.parse(JSON.stringify(todo));
  showEditModal.value = true;
};

const saveTodo = () => {
  if (!editingTodo.value || !editingTodo.value.title.trim()) return;
  todoStore.editTodo(editingTodo.value);
  showEditModal.value = false;
};

const deleteTodo = (todoId) => {
  todoStore.deleteTodo(todoId);
};
</script>

<template>
  <div class="flex w-full items-start space-x-4">
    <!-- To Start -->
    <div class="w-1/3 flex flex-col">
      <div class="flex items-center space-x-2">
        <span class="w-3 h-3 rounded-full bg-blue-500"></span>
        <span>To Start</span>
      </div>
      <div class="h-full bg-[#F2F6FF] rounded-2xl min-h-[70vh] p-4 space-y-2">
        <template v-if="filteredTodos.filter(todo => todo.stage === 'To Start').length > 0">
          <TodoItems 
            v-for="(item, index) in filteredTodos.filter(todo => todo.stage === 'To Start')" 
            :key="index" 
            :todo="item" 
            @moveToNextStage="moveToNextStage"
            @deleteTodo="deleteTodo(item.id)"
            @editTodo="editTodo"
          />
        </template>
        <p v-else class="text-gray-500 text-center text-lg py-4">No search results</p>

        <button 
          @click="showAddModal = true"
          class="border-2 border-dashed rounded-xl border-gray-400 text-gray-500 hover:text-black hover:border-black duration-150 w-full text-3xl font-bold flex justify-center items-center gap-4 px-4 py-3"
        >
          <font-awesome-icon :icon="['fas', 'plus']" />
          <p>
            Add Todo
          </p>
        </button>
      </div>
    </div>

    <!-- In Progress -->
    <div class="w-1/3 flex flex-col">
      <div class="flex items-center space-x-2">
        <span class="w-3 h-3 rounded-full bg-yellow-500"></span>
        <span>In Progress</span>
      </div>
      <div class="h-full bg-[#F2F6FF] rounded-2xl min-h-[70vh] p-4 space-y-2">
        <template v-if="filteredTodos.filter(todo => todo.stage === 'In Progress').length > 0">
          <TodoItems 
            v-for="(item, index) in filteredTodos.filter(todo => todo.stage === 'In Progress')" 
            :key="index" 
            :todo="item" 
            @moveToNextStage="moveToNextStage"
            @moveToPreviousStage="moveToPreviousStage"
            @deleteTodo="deleteTodo(item.id)"
            @editTodo="editTodo"
          />
        </template>
        <p v-else class="text-gray-500 text-center text-lg py-4">No search results</p>
      </div>
    </div>

    <!-- Completed -->
    <div class="w-1/3 flex flex-col">
      <div class="flex items-center space-x-2">
        <span class="w-3 h-3 rounded-full bg-green-500"></span>
        <span>Completed</span>
      </div>
      <div class="h-full bg-[#F2F6FF] rounded-2xl min-h-[70vh] p-4 space-y-2">
        <template v-if="filteredTodos.filter(todo => todo.stage === 'Completed').length > 0">
          <TodoItems 
            v-for="(item, index) in filteredTodos.filter(todo => todo.stage === 'Completed')" 
            :key="index" 
            :todo="item"
            @moveToPreviousStage="moveToPreviousStage"
            @deleteTodo="deleteTodo(item.id)"
            @editTodo="editTodo"
          />
        </template>
        <p v-else class="text-gray-500 text-center text-lg py-4">No search results</p>
      </div>
    </div>
  </div>

  <!-- Todo 추가 모달 -->
  <Modal 
    :show="showAddModal" 
    title="Add New Todo"
    @close="showAddModal = false"
    @confirm="addNewTodo"
  >
    <AddTodoForm v-model:todo="newTodo" />
  </Modal>

  <!-- 수정 모달 -->
  <Modal :show="showEditModal" title="Edit Todo" @close="showEditModal = false" @confirm="saveTodo">
    <EditTodoForm v-model:todo="editingTodo" />
  </Modal>
</template>

<style scoped>

</style>
