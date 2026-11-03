import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useLocalJSONParser, type AnimationFrames, type NestedSpriteDict } from '@/composables/useLocalJSONParser';
import { shuffleArray } from '@/utils/arrayUtils';

export const usePetStore = defineStore('pet', () => {
  const { loadJSON } = useLocalJSONParser();

  const assetsLoaded = ref<boolean>(false);
  const cnt = ref<number>(0);
  const currentPosition = ref<number>(0);
  const shedPositions = ref<number[]>([]);

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

  const renderNextFrame = (loadKey: string, directionKey: number) => {
    if (spriteKeys.value.length === 0) return;

    const activeAnimation = spriteDict.value[loadKey];
    if (!activeAnimation) return;

    const nextFrameKey = spriteKeys.value[directionKey];

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

  const updateSpritePosition = (loadKey:string, gridMin: number, gridMax: number) => {
    if (assetsLoaded.value === false) return;

    const randomNum = Math.floor(Math.random() * 10);
    const isOdd = randomNum % 2 !== 0;

    if (isOdd && currentPosition.value > gridMin) {
      currentPosition.value--;
      renderNextFrame(loadKey, 2);
    } else if (!isOdd && currentPosition.value < gridMax) {
      currentPosition.value++;
      renderNextFrame(loadKey, 1);
    } else {
      renderNextFrame(loadKey, 0);
    }
  }

  const updateShedPositions = (shedLevel: number, gridMin: number, gridMax: number) => {
    if (assetsLoaded.value === false) return;

    if (shedPositions.value.length !== shedLevel) {
      const availableSlots: number[] = [];

      for (let i = gridMin; i <= gridMax; i++) {
        if (i !== currentPosition.value) availableSlots.push(i);
      }

      const shuffled = shuffleArray(availableSlots);
      shedPositions.value = shuffled.slice(0, shedLevel);

      return;
    }

    const newPositions: number[] = [];

    for (let i = 0; i < shedPositions.value.length; i++) {
      const currentPos = shedPositions.value[i] ?? gridMin;

      const randomNum = Math.floor(Math.random() * 10);
      const isOdd = randomNum % 2 !== 0;

      let targetPos = currentPos;

      if (isOdd && currentPos > gridMin) {
        targetPos = currentPos - 1;
      } else if (!isOdd && currentPos < gridMax) {
        targetPos = currentPos + 1;
      }

      if (targetPos === currentPosition.value || newPositions.includes(targetPos)) {
        const allOpenSlots: number[] = [];

        for (let s = gridMin; s <= gridMax; s++) {
          if (s !== currentPosition.value && !newPositions.includes(s)) {
            allOpenSlots.push(s);
          }
        }

        if (allOpenSlots.length > 0) {
          const shuffledOpen = shuffleArray(allOpenSlots);
          targetPos = shuffledOpen[0] ?? gridMin;
        }
      }

      newPositions.push(targetPos);
    }

    shedPositions.value = newPositions;
  };

  return {
    assetsLoaded,
    cnt,
    currentSprite,
    currentPosition,
    shedPositions,
    parseSprites,
    getShedSprites,
    updateSpritePosition,
    updateShedPositions
  };
});
