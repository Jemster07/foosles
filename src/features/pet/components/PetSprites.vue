<script setup lang="ts">
import { usePetStore } from '@/features/pet/store/usePetStore';
import { useClockStore } from '@/features/clock/store/useClockStore';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';

const petStore = usePetStore();
const clockStore = useClockStore();

const filePath = '/spriteSheet.json';
const loadKey = 'neutral'; // Will be determined by the PetStats component

const { spriteKeys, spriteDict, currentSprite, currentAction } = storeToRefs(petStore);
const { parseSprites } = petStore;

const assetsLoaded = ref<boolean>(false);
const cnt = ref<number>(0);

const renderNextFrame = () => {
  if (spriteKeys.value.length === 0) return;

  const activeAnimation = spriteDict.value[currentAction.value];
  if (!activeAnimation) return;

  const nextFrameKey = spriteKeys.value[cnt.value % spriteKeys.value.length];

  if (nextFrameKey) {
    currentSprite.value = activeAnimation[nextFrameKey] || '';
    cnt.value++;
  }
}

const initSprites = async () => {
  await parseSprites(filePath, loadKey);

  assetsLoaded.value = true;
  renderNextFrame();
}
initSprites();

watch(
  () => clockStore.currentTime,
  () => {
    if (!assetsLoaded.value) return;
    renderNextFrame();
  }
);
</script>

<template>
  <div>
    <div>
      <h1>PetSprites</h1>
      <div class="play-field">
        <pre class="sprite-display">{{ currentSprite }}</pre>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sprite-display {
  font-family: monospace;
  margin: 0;

  background: rgb(200, 115, 234);
}

.play-field {
  border: 1px solid black;
  width: 450px;
  padding: 10px;
}
</style>
