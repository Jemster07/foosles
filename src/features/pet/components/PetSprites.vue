<script setup lang="ts">
import { usePetStore } from '@/features/pet/store/usePetStore';
import { useClockStore } from '@/features/clock/store/useClockStore';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';

const petStore = usePetStore();
const clockStore = useClockStore();

const { spriteKeys, dictionary, currentSprite, currentAction } = storeToRefs(petStore);
const { parseSprites } = petStore;

const assetsLoaded = ref<boolean>(false);
const cnt = ref<number>(0);

const renderNextFrame = () => {
  if (spriteKeys.value.length === 0) return;

  const activeAnimation = dictionary.value[currentAction.value];
  if (!activeAnimation) return;

  const nextFrameKey = spriteKeys.value[cnt.value % spriteKeys.value.length];

  if (nextFrameKey) {
    currentSprite.value = activeAnimation[nextFrameKey] || '';
    cnt.value++;
  }
}

const initSprites = async () => {
  await parseSprites('/spriteSheet.json'); // Will need to pass in the pet's current action/mood

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
      <pre class="sprite-display">{{ currentSprite }}</pre>
    </div>
  </div>
</template>

<style scoped>
.sprite-display {
  font-family: monospace;
  margin: 0;
}
</style>
