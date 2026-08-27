import { defineStore } from 'pinia';
import { ref, onMounted, watch } from 'vue';
import { useLocalFileReader } from '@/composables/useLocalFileReader';

export const usePetStore = defineStore('pet', () => {
  const { lines, error, isLoading, loadFile } = useLocalFileReader();

  const activeSprite = ref<string>();
  activeSprite.value = lines.value[0];

  watch(lines, (newLines) => {
    if (newLines.length > 0) {
      activeSprite.value = newLines[0];
    }
  });

  onMounted(() => {
    loadFile('/spriteSheet.txt');
  });

  return { activeSprite };
});
