<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useClockStore } from '@/features/clock/store/useClockStore';

const clockStore = useClockStore();

const hourHand = ref<HTMLElement>();
const minuteHand = ref<HTMLElement>();
const secondHand = ref<HTMLElement>();

const applyRotations = (date: Date) => {
    if (!hourHand.value || !minuteHand.value || !secondHand.value)
        return;

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const hourDeg = (hours % 12) * 30 + minutes * 0.5;
    const minuteDeg = minutes * 6 + seconds * 0.1;
    const secondDeg = seconds * 6;

    hourHand.value.style.transform = `rotate(${hourDeg}deg)`;
    minuteHand.value.style.transform = `rotate(${minuteDeg}deg)`;
    secondHand.value.style.transform = `rotate(${secondDeg}deg)`;
};

watch(
    () => clockStore.currentTime,
    (newTime) => {
        applyRotations(newTime);
    }
);

onMounted(() => {
    applyRotations(clockStore.currentTime);
});
</script>

<template>
    <div class="clock-face">
        <div :ref="(el) => hourHand = el as HTMLElement" class="hand hour-hand"></div>
        <div :ref="(el) => minuteHand = el as HTMLElement" class="hand minute-hand"></div>
        <div :ref="(el) => secondHand = el as HTMLElement" class="hand second-hand"></div>
        <div class="center-cap"></div>
    </div>
</template>

<style scoped>
.clock-face {
    position: relative;
    width: 200px;
    height: 200px;
    border: 4px solid #333;
    border-radius: 50%;
    background: #fff;
    margin: 20px auto;
}

.hand {
    position: absolute;
    bottom: 50%;
    left: 50%;
    transform-origin: bottom center;
    background: #111;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}

.hour-hand {
    width: 6px;
    height: 50px;
    margin-left: -3px;
}

.minute-hand {
    width: 4px;
    height: 75px;
    margin-left: -2px;
}

.second-hand {
    width: 2px;
    height: 85px;
    margin-left: -1px;
    background: #ff0000;
}

.center-cap {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 12px;
    height: 12px;
    background: #333;
    border-radius: 50%;
    transform: translate(-50%, -50%);
}
</style>