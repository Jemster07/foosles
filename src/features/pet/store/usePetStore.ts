import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useLocalFileReader } from '@/composables/useLocalFileReader';

export const usePetStore = defineStore('pet', () => {
  const { lines, loadFile } = useLocalFileReader();

  const spriteArray = ref<string[]>([]);

  const parseSprites = async (filePath: string) => {
    if (!filePath) return;

    try {
      await loadFile(filePath);

      if (lines.value.length > 0) {
        spriteArray.value = lines.value;
      }
    } catch (err) {
      console.error("Failed to parse sprites:", err);
    }
  };

  return { spriteArray, parseSprites };
});
