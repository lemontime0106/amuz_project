<script setup>
defineProps({
  title: String,
  buttonText: String,
  onSubmit: Function,
});
</script>

<template>
  <div class="flex flex-col w-full h-full justify-center items-center gap-6">
    <h1 class="text-5xl font-bold">Welcome!</h1>
    <p class="text-2xl font-semibold">{{ title }}</p>
    <slot></slot>
    
    <button 
      class="w-2/3 bg-[#202D48] hover:bg-[#535353] hover:cursor-pointer duration-150 text-white font-bold text-2xl rounded-xl py-3"
      @click="onSubmit" 
    >
      {{ buttonText }}
    </button>
    
    <div class="flex items-center justify-center w-4/5 gap-4">
      <hr class="border-2 w-4/5 border-[#E2E8F4]">
      <span class="font-bold">OR</span>
      <hr class="border-2 w-4/5 border-[#E2E8F4]">
    </div>
  </div>
</template>
