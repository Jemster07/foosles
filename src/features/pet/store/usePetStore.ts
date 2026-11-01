import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useLocalJSONParser, type AnimationFrames, type NestedSpriteDict } from '@/composables/useLocalJSONParser';

export const usePetStore = defineStore('pet', () => {
  const { loadJSON } = useLocalJSONParser();

  const assetsLoaded = ref<boolean>(false);
  const cnt = ref<number>(0);

  const currentSprite = ref<string>('');
  const spriteDict = ref<NestedSpriteDict>({});
  const spriteKeys = ref<string[]>([]);

  const shedGroup = ref<AnimationFrames>();
  const shedKeys = ref<string[]>();

  const parseSprites = async (filePath: string, loadKey: string) => {
    if (!filePath) return;

    try {
      const parsedData = (await loadJSON(filePath)) as NestedSpriteDict;

      if (parsedData) {
        spriteDict.value = parsedData;
        const spriteGroup = parsedData[loadKey];

        if (spriteGroup) {
          spriteKeys.value = Object.keys(spriteGroup);

          const firstFrameKey = spriteKeys.value[0];
          if (firstFrameKey) {
            currentSprite.value = spriteGroup[firstFrameKey] || '';
          }
        }

        if (shedGroup.value === undefined) {
          shedGroup.value = parsedData['shed'];

          if (shedGroup.value) {
            shedKeys.value = Object.keys(shedGroup.value);
          }
        }
      }
    } catch (err) {
      console.error("Failed to parse sprites:", err);
    }
  };

  const renderNextFrame = (loadKey: string) => {
    if (spriteKeys.value.length === 0) return;

    const activeAnimation = spriteDict.value[loadKey];
    if (!activeAnimation) return;

    const nextFrameKey = spriteKeys.value[cnt.value % spriteKeys.value.length];

    if (nextFrameKey) {
      currentSprite.value = activeAnimation[nextFrameKey] || '';
      cnt.value++;
    }
  };

  const getShedSprites = (shedLevel: number): string[] => {
    if (!shedGroup.value || !shedKeys.value || shedKeys.value.length === 0) return [];

    const shedSpriteArray: string[] = [];

    for (let i = 0; i < shedLevel; i++) {
      const frameIndex = (cnt.value + i) % shedKeys.value.length;
      const targetKey = shedKeys.value[frameIndex] || '';

      shedSpriteArray.push(shedGroup.value[targetKey] || '');
    }

    return shedSpriteArray;
  };

  return {
    assetsLoaded,
    cnt,
    currentSprite,
    parseSprites,
    renderNextFrame,
    getShedSprites
  };
});
