import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useLocalJSONParser, type AnimationFrames, type NestedSpriteDict } from '@/composables/useLocalJSONParser';

export const usePetStore = defineStore('pet', () => {
  const { loadJSON } = useLocalJSONParser();

  const assetsLoaded = ref<boolean>(false);
  const cnt = ref<number>(0);
  const currentSprite = ref<string>('');
  const spriteGroup_shed = ref<AnimationFrames>();
  const spriteKeys_shed = ref<string[]>([]);

  let spriteDict: NestedSpriteDict = {};
  let spriteKeys: string[] = [];
  let currentAction: string = 'neutral';

  const parseSprites = async (filePath: string, loadKey: string) => {
    if (!filePath) return;

    try {
      const parsedData = (await loadJSON(filePath)) as NestedSpriteDict;

      if (parsedData) {
        spriteDict = parsedData;
        currentAction = loadKey;

        const spriteGroup = parsedData[currentAction];

        if (spriteGroup) {
          spriteKeys = Object.keys(spriteGroup);

          const firstFrameKey = spriteKeys[0];
          if (firstFrameKey) {
            currentSprite.value = spriteGroup[firstFrameKey] || '';
          }

          if (spriteGroup_shed.value === undefined) {
            spriteGroup_shed.value = parsedData['shed'] || {};
            spriteKeys_shed.value = Object.keys(spriteGroup_shed.value || {});
          }
        }
      }
    } catch (err) {
      console.error("Failed to parse sprites:", err);
    }
  };

  const renderNextFrame = () => {
    if (spriteKeys.length === 0) return;

    const activeAnimation = spriteDict[currentAction];
    if (!activeAnimation) return;

    const nextFrameKey = spriteKeys[cnt.value % spriteKeys.length];

    if (nextFrameKey) {
      currentSprite.value = activeAnimation[nextFrameKey] || '';
      cnt.value++;
    }
  };

  return {
    assetsLoaded,
    cnt,
    currentSprite,
    spriteGroup_shed,
    spriteKeys_shed,
    parseSprites,
    renderNextFrame
  };
});
