import { ref } from 'vue';

export type AnimationFrames = Record<string, string>;
export type NestedSpriteDict = Record<string, AnimationFrames>;

export function useLocalJSONParser() {
  const error = ref<string | null>(null);
  const isLoading = ref<boolean>(false);

  const loadJSON = async (filePath: string) => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await fetch(filePath);

      if (!response.ok) {
        throw new Error(`Failed to load JSON: ${response.statusText}`);
      }

      const data: NestedSpriteDict = await response.json();

      return data;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error parsing asset file';
      console.error('[useAssetParser Error]:', error.value);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    error,
    isLoading,
    loadJSON
  };
}
