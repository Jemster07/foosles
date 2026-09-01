<script setup lang="ts">
import { usePetStore } from '@/features/pet/store/usePetStore';
import { useClockStore } from '@/features/clock/store/useClockStore';
import { storeToRefs } from 'pinia';
import { ref, onMounted, watch } from 'vue';

const petStore = usePetStore();
const clockStore = useClockStore();

const { spriteArray } = storeToRefs(petStore);
const { parseSprites } = petStore;

const spriteSheetPath = ref<string>('');
let assetsLoaded: boolean = false;
let cnt: number = 0;

const currentSprite = ref<string | undefined>(undefined);
currentSprite.value = "( '  ' )"; // Temporary default sprite, shows while sprite sheet parses

onMounted(() => {
  spriteSheetPath.value = '/spriteSheet_neutral.txt'; // Temporary value assignment, replace with result from petStats logic
});

watch(
  () => clockStore.currentTime,
  () => {
    if (!assetsLoaded) return;

    currentSprite.value = spriteArray.value[cnt % spriteArray.value.length];
    cnt++;
  }
);

watch(
  spriteSheetPath,
  async (newSheetPath) => {
    if (newSheetPath) {
      await parseSprites(newSheetPath);
      assetsLoaded = true;
    }
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
