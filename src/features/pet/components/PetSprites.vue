<script setup lang="ts">
import { usePetStore } from '@/features/pet/store/usePetStore';
import { useClockStore } from '@/features/clock/store/useClockStore';
import { storeToRefs } from 'pinia';
import { computed, watch } from 'vue';

const petStore = usePetStore();
const clockStore = useClockStore();

const filePath = '/spriteSheet.json';
const loadKey = 'neutral'; // Will be determined by the PetStats component
const shedLevel = 3; // Will be determined by the PetStats component

const { currentSprite, assetsLoaded, cnt } = storeToRefs(petStore);
const { parseSprites, renderNextFrame, getShedSprites } = petStore;

const shedSprites = computed(() => getShedSprites(shedLevel));

const initSprites = async () => {
  await parseSprites(filePath, loadKey);

  assetsLoaded.value = true;
  renderNextFrame(loadKey);
}
initSprites();

watch(
  () => clockStore.currentTime,
  () => {
    if (!assetsLoaded.value) return;
    renderNextFrame(loadKey);
  }
);
</script>

<template>
  <div>
    <div>
      <h1>PetSprites</h1>
      <div class="play-field">
        <pre class="sprite-display" style="background: rgb(200, 115, 234)">{{ currentSprite }}</pre>
        <div v-for="(currentShedSprite, index) in shedSprites" :key="index">
          <pre class="sprite-display" style="background: rgb(115, 186, 234)">{{ currentShedSprite }}</pre>
        </div>
      </div>
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
}

.play-field {
  border: 1px solid black;
  width: 450px;
  padding: 10px;
}
</style>
