import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useClockStore } from '../../clock/store/useClockStore'

export const usePetStore = defineStore('pet', () => {
    const clockStore = useClockStore();

    return {  };
});