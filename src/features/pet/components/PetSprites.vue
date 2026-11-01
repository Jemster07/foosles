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

const { currentSprite, assetsLoaded, cnt } = storeToRefs(petStore);
const { parseSprites, getShedSprites, updateSpritePosition } = petStore;

const shedSprites = computed(() => getShedSprites(shedLevel));

const initSprites = async () => {
  await parseSprites(filePath, loadKey);

  assetsLoaded.value = true;
  updateSpritePosition(loadKey, gridMin, gridMax);
}
initSprites();

watch(
  () => clockStore.currentTime,
  () => {
    if (!assetsLoaded.value) return;
    updateSpritePosition(loadKey, gridMin, gridMax);
  }
);
</script>

<template>
  <div>
    <div>
      <h1>PetSprites</h1>

      <div class="play-field">
        <div id="grid_-3" class="grid" style="background: rgb(115, 186, 234)">
          <pre class="sprite-display">{{ currentSprite }}</pre>
        </div>
        <div id="grid_-2" class="grid" style="background: rgb(200, 115, 234)">
          <pre class="sprite-display">{{ currentSprite }}</pre>
        </div>
        <div id="grid_-1" class="grid" style="background: rgb(115, 186, 234)">
          <pre class="sprite-display">{{ currentSprite }}</pre>
        </div>
        <div id="grid_0" class="grid" style="background: rgb(200, 115, 234)">
          <pre class="sprite-display">{{ currentSprite }}</pre>
        </div>
        <div id="grid_1" class="grid" style="background: rgb(115, 186, 234)">
          <pre class="sprite-display">{{ currentSprite }}</pre>
        </div>
        <div id="grid_2" class="grid" style="background: rgb(200, 115, 234)">
          <pre class="sprite-display">{{ currentSprite }}</pre>
        </div>
        <div id="grid_3" class="grid" style="background: rgb(115, 186, 234)">
          <pre class="sprite-display">{{ currentSprite }}</pre>
        </div>
      </div>
      <div>
        <p>Assets Loaded: {{ assetsLoaded }}</p>
        <p>Frame Count: {{ cnt }}</p>
        <p>Shed Sprites: {{ shedSprites }}</p>
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
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 0px;
  border: 1px solid black;
  width: 525px;
}

.grid {
  padding: 5px;
  text-align: center;
}
</style>
