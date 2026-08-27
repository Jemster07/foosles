import { ref } from 'vue';

export function useLocalFileReader() {
  const lines = ref<string[]>([]);
  const error = ref<string | null>(null);
  const isLoading = ref<boolean>(false);

  const loadFile = async (filePath: string) => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await fetch(filePath);

      if (!response.ok) {
        throw new Error(`Failed to load file: ${response.statusText}`);
      }

      const textData = await response.text();

      lines.value = textData.split(/\r?\n/);

    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An unknown error occurred';
      console.error(error.value);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    lines,
    error,
    isLoading,
    loadFile
  };
}
