<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { usePetStore } from '@/features/pet/store/usePetStore';

const petStore = usePetStore();

const { activeSprite } = storeToRefs(petStore);
</script>

<template>
    <div>
      <div>{{ activeSprite }}</div>
    </div>
</template>
