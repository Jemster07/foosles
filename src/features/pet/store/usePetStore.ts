import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useLocalJSONParser, type NestedSpriteDict } from '@/composables/useLocalJSONParser';

export const usePetStore = defineStore('pet', () => {
  const { dictionary, loadJSON } = useLocalJSONParser();

  const spriteKeys = ref<string[]>([]);
  const currentSprite = ref<string>('');
  const currentAction = ref<string>('neutral');

  const parseSprites = async (filePath: string) => {
    if (!filePath) return;

    try {
      const parsedData = (await loadJSON(filePath)) as NestedSpriteDict;

      if (parsedData) {
        dictionary.value = parsedData;
        currentAction.value = 'neutral'; // Will need to be passed into the ParseSprites function from the petSprites.vue as a parameter

        const spriteGroup = parsedData[currentAction.value];

        if (spriteGroup) {
          spriteKeys.value = Object.keys(spriteGroup);

          const firstFrameKey = spriteKeys.value[0];
          if (firstFrameKey) {
            currentSprite.value = spriteGroup[firstFrameKey] || '';
          }
        }
      }
    } catch (err) {
      console.error("Failed to parse sprites:", err);
    }
  };

  return { spriteKeys, currentSprite, currentAction, dictionary, parseSprites };
});
