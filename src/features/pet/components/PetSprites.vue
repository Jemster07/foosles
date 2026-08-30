<script setup lang="ts">
import { usePetStore } from '@/features/pet/store/usePetStore';
import { storeToRefs } from 'pinia';
import { ref, onMounted, watch } from 'vue';

const petStore = usePetStore();
const { spriteArray } = storeToRefs(petStore);
const { parseSprites } = petStore;

const spriteSheetPath = ref<string>('');

onMounted(() => {
  spriteSheetPath.value = '/spriteSheet_neutral.txt'; // Temporary value assignment, replace with result from petStats logic
});

// Watch for time changes to update the sprite animation
// watch(
//   () => clockStore.currentTime,
//   (newTime) => {
//     applyRotations(newTime);
//   }
// );

watch(
  spriteSheetPath,
  async (newSheetPath) => {
    if (newSheetPath) {
      await parseSprites(newSheetPath);
      console.log('Updated array inside watch:', spriteArray.value);
    }
  }
);
</script>

<template>
  <div>
    <div>
      <h1>PetSprites</h1>
    </div>
  </div>
</template>
