import { defineStore } from 'pinia';
import { ref, onMounted, onUnmounted } from 'vue';

export const useClockStore = defineStore('clock', () => {
    const currentTime = ref(new Date());

    let timer: number | null = null;

    const startClock = () => {
        timer = window.setInterval(() => {
            currentTime.value = new Date();
        }, 1000);
    };

    onMounted(() => startClock());
    onUnmounted(() => {
        if(timer){
            clearInterval(timer);
        }
    });

    return { currentTime };
})