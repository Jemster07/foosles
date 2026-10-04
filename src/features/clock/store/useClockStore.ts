import { defineStore } from 'pinia';
import { ref, onUnmounted } from 'vue';

export const useClockStore = defineStore('clock', () => {
  const currentTime = ref(new Date());

  const updateTime = () => {
    currentTime.value = new Date();
  };

    updateTime();
    const timer = window.setInterval(updateTime, 1000);

  onUnmounted(() => {
    if (timer)
      clearInterval(timer);
  });

  return { currentTime };
})
