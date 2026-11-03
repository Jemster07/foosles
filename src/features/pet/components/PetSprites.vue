<script setup lang="ts">
import { usePetStore } from '@/features/pet/store/usePetStore';
import { useClockStore } from '@/features/clock/store/useClockStore';
import { storeToRefs } from 'pinia';
import { computed, watch } from 'vue';

const petStore = usePetStore();
const clockStore = useClockStore();

const filePath = '/spriteSheet.json';
const gridMin = -3;
const gridMax = 3;

const loadKey = 'neutral'; // Will be determined by the PetStats component
const shedLevel = 3; // Will be determined by the PetStats component

const { currentSprite, currentPosition, shedPositions, assetsLoaded, cnt } = storeToRefs(petStore);
const { parseSprites, getShedSprites, updateSpritePosition, updateShedPositions } = petStore;

const shedSprites = computed(() => getShedSprites(shedLevel));

const shedItems = computed(() => {
  return shedSprites.value.map((sprite, index) => ({
    sprite,
    position: shedPositions.value[index] ?? 0
  }));
});

const gridRange = computed(() => {
  const range: number[] = [];
  for (let i = gridMin; i <= gridMax; i++) {
    range.push(i);
  }
  return range;
});

const initSprites = async () => {
  await parseSprites(filePath, loadKey);

  assetsLoaded.value = true;
  updateSpritePosition(loadKey, gridMin, gridMax);
  updateShedPositions(shedLevel, gridMin, gridMax);
}
initSprites();

watch(
  () => clockStore.currentTime,
  () => {
    if (!assetsLoaded.value) return;
    updateSpritePosition(loadKey, gridMin, gridMax);
    updateShedPositions(shedLevel, gridMin, gridMax);
  }
);
</script>

<template>
  <div>
    <div>
      <h1>PetSprites</h1>

      <div class="play-field" :style="{ gridTemplateColumns: `repeat(${gridRange.length}, 70px)` }">
        <div v-for="pos in gridRange" :key="pos" class="grid">
          <pre v-show="currentPosition === pos" class="sprite-display">{{ currentSprite }}</pre>

          <template v-for="(shed, index) in shedItems" :key="index">
            <pre v-show="shed.position === pos" class="sprite-display">{{ shed.sprite }}</pre>
          </template>
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
.play-field {
  display: grid;
  gap: 0px;
  border: 1px solid black;
  width: max-content;
}

.grid {
  padding: 5px 0px;
  text-align: center;
  /* border: 1px solid black; */
}

.sprite-display {
  font-family: monospace;
  margin: 0;
}
</style>
