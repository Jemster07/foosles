import { ref } from 'vue';

export type SpriteDict = Record<string, string>;

export function useLocalJSONParser() {
  const dictionary = ref<SpriteDict>({});
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const loadJSON = async (filePath: string): Promise<SpriteDict | null> => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await fetch(filePath);

      if (!response.ok) {
        throw new Error(`Failed to load JSON: ${response.statusText}`);
      }

      const data: SpriteDict = await response.json();
      dictionary.value = data;

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error parsing asset file';
      error.value = errorMessage;
      console.error('[useAssetParser Error]:', errorMessage);

      return null;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    dictionary,
    isLoading,
    error,
    loadJSON
  };
}
