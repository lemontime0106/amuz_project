<script setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  show: Boolean,
  title: String,
});

const emit = defineEmits(["close", "confirm"]);
</script>

<template>
  <transition name="modal">
    <div 
      v-if="show" 
      class="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50"
    >
      <div class="modal-content bg-white p-6 rounded-2xl shadow-lg w-1/3 h-1/2 flex flex-col justify-between">
        <div class="flex justify-between items mb-4">
          <h2 class="text-xl font-semibold">{{ title }}</h2>
          <button @click="emit('close')" class="text-gray-500 text-xl">&times;</button>
        </div>

        <slot></slot>

        <button 
          @click="emit('confirm')"
          class="w-full bg-[#1E2A47] text-white py-2 rounded-lg mt-4">
          Confirm
        </button>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease-out;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
