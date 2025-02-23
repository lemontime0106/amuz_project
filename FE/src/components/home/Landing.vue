<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const typingText1 = ref('');
const typingText2 = ref('');
const fullText1 = "To-Do-List";
const fullText2 = "생산성을 극대화하는 스마트한 일정 관리 도구";

let index1 = 0;
let index2 = 0;

const typeText1 = () => {
  if (index1 < fullText1.length) {
    typingText1.value += fullText1[index1];
    index1++;
    setTimeout(typeText1, 100);
  } else {
    setTimeout(typeText2, 100);
  }
};

const typeText2 = () => {
  if (index2 < fullText2.length) {
    typingText2.value += fullText2[index2];
    index2++;
    setTimeout(typeText2, 50);
  }
};

const goToTodos = () => {
  const isLogIn = !!localStorage.getItem("userAccessToken");
  if (isLogIn) {
    router.push("/todos");
  } else {
    router.push("/login");
  }
};

onMounted(() => {
  typeText1();
});
</script>

<template>
  <main class="flex flex-col items-center justify-center text-center">
    <!-- 헤더 섹션 -->
    <div class="flex flex-col items-center gap-4">
      <h1 class="text-5xl font-bold">{{ typingText1 }}<span class="animate-blink">|</span></h1>
      <h2 class="text-2xl min-h-[32px]">{{ typingText2 }}</h2>
      <h3 class="text-xl text-gray-600">
        "할 일을 정리하고, 우선순위를 설정하며, 목표를 달성하세요."
      </h3>
    </div>

    <!-- 메인 이미지 -->
    <div class="relative group w-2/3 mt-6">
      <img src="/main.png" alt="메인이미지" class="w-full transition-transform duration-150 group-hover:scale-105 group-hover:brightness-75 rounded-xl">
      <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button @click="goToTodos" class="bg-[#202D48] text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-[#334977] transition">
          바로가기
        </button>
      </div>
    </div>
  </main>
</template>

<style scoped>
.animate-blink {
  animation: blink 1s infinite;
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
