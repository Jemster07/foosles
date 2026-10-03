import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useLocalJSONParser } from '@/composables/useLocalJSONParser';

export const usePetStore = defineStore('pet', () => {
  const { dictionary, loadJSON } = useLocalJSONParser();

  const spriteKeys = ref<string[]>([]);
  const currentSprite = ref<string>('');

  const parseSprites = async (filePath: string) => {
    if (!filePath) return;

    try {
      const parsedData = await loadJSON(filePath);

      if (parsedData) {
        spriteKeys.value = Object.keys(parsedData)

        if(spriteKeys.value[0]) {
          currentSprite.value = parsedData[spriteKeys.value[0]] ?? '';
        }
      }
    } catch (err) {
      console.error("Failed to parse sprites:", err);
    }
  };

  return { spriteKeys, currentSprite, dictionary, parseSprites };
});
