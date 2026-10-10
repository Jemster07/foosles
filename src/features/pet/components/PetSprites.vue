<script setup lang="ts">
import { usePetStore } from '@/features/pet/store/usePetStore';
import { useClockStore } from '@/features/clock/store/useClockStore';
import { storeToRefs } from 'pinia';
import { watch } from 'vue';

const petStore = usePetStore();
const clockStore = useClockStore();

const filePath = '/spriteSheet.json';
const loadKey = 'neutral'; // Will be determined by the PetStats component

const { currentSprite, spriteGroup_shed, spriteKeys_shed, assetsLoaded, cnt } = storeToRefs(petStore);
const { parseSprites, renderNextFrame } = petStore;

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
      <pre>{{ spriteGroup_shed }}</pre>
      <pre>{{ spriteKeys_shed }}</pre>
      <div>
        <p>Assets Loaded: {{ assetsLoaded }}</p>
        <p>Frame Count: {{ cnt }}</p>
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
