<script setup lang="ts">
import { usePetStore } from '@/features/pet/store/usePetStore';
import { useClockStore } from '@/features/clock/store/useClockStore';
import { storeToRefs } from 'pinia';
import { ref, onMounted, watch } from 'vue';

const petStore = usePetStore();
const clockStore = useClockStore();

const { spriteKeys, dictionary, currentSprite } = storeToRefs(petStore);
const { parseSprites } = petStore;

const spriteSheetPath = ref<string>('');
const assetsLoaded = ref<boolean>(false);
const cnt = ref<number>(0);

onMounted(() => {
  spriteSheetPath.value = '/spriteSheet.json'; // Temporary value assignment, replace with result from petStats logic
});

watch(
  () => clockStore.currentTime,
  () => {
    if (!assetsLoaded.value) return;
    if (spriteKeys.value.length === 0) return;

    const nextKey = spriteKeys.value[cnt.value % spriteKeys.value.length];

    if (nextKey) {
      currentSprite.value = dictionary.value[nextKey] || '';
      cnt.value++;
    }
  }
);

watch(
  spriteSheetPath,
  async (newSheetPath) => {
    if (newSheetPath) {
      await parseSprites(newSheetPath);
      assetsLoaded.value = true;
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
