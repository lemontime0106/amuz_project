<script setup>
import { ref, watch } from "vue";
import { useTodoStore } from "@/store/useTodoStore"; 
import Modal from "./Modal.vue";
import NewTodoForm from "./AddTodoForm.vue";

const todoStore = useTodoStore();
const searchQuery = ref("");

watch(searchQuery, (newQuery) => {
  todoStore.setSearchQuery(newQuery);
})

const showModal = ref(false);
const newTodo = ref({
  title: "",
  description: "",
  priority: "Medium",
});

const addTodo = () => {
  if (!newTodo.value.title.trim()) return;
  todoStore.addTodo(newTodo.value);
  newTodo.value = { title: "", description: "", priority: "Medium" };
  showModal.value = false;
};
</script>

<template>
  <div class="flex flex-col">
    <div class="flex justify-between">
      <p class="text-4xl font-bold">My Todo</p>
      <button 
        @click="showModal = true"
        class="bg-[#334977] hover:bg-[#535353] duration-150 rounded-xl text-white px-4 py-2 flex items-center space-x-2">
        <font-awesome-icon :icon="['fas', 'circle-plus']" />
        <p>New Todo</p>
      </button>
    </div>

    <div class="flex justify-between my-4">
      <!-- 검색 필드 -->
      <div class="relative w-64">
        <input
          v-model="searchQuery"
          type="text"
          class="w-full border-2 border-[#C4D0EB] rounded-2xl px-4 py-2 pl-10"
          placeholder="Search"
        />
        <font-awesome-icon
          :icon="['fas', 'search']"
          class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      </div>
      <!-- 정렬 버튼 -->
      <div>
        <button
          @click="todoStore.toggleSortOrder"
          class="bg-[#334977] hover:bg-[#535353] duration-150 text-white px-4 py-2 rounded-xl"
        >
          {{ todoStore.sortOrder === "desc" ? "Sort: Low → High" : "Sort: High → Low" }}
        </button>
      </div>
    </div>

    <!-- New Todo 모달 -->
    <Modal 
      :show="showModal" 
      title="Add New Todo"
      @close="showModal = false"
      @confirm="addTodo"
    >
      <NewTodoForm v-model:todo="newTodo" />
    </Modal>
  </div>
</template>

<style scoped>
</style>
