import { defineStore } from 'pinia';
import { ref, onMounted, onUnmounted } from 'vue';

export const useClockStore = defineStore('clock', () => {
  const currentTime = ref(new Date());

  let timer: number | null = null;

  const updateTime = () => {
    currentTime.value = new Date();
  };

  onMounted(() => {
    updateTime();
    timer = window.setInterval(updateTime, 1000);
  });

  onUnmounted(() => {
    if (timer)
      clearInterval(timer);
  });

  return { currentTime };
})
