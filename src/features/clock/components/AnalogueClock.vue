<script setup lang="ts">
import { computed } from 'vue';
import { useClockStore } from '@/features/clock/store/useClockStore';

const clockStore = useClockStore();

const getSpokeStyle = (n: number) => ({ transform: `rotate(${n * 30}deg)` });
const getTextStyle = (n: number) => ({ transform: `translateX(-50%) rotate(${-n * 30}deg)` });
const getTickStyle = (t: number) => ({ transform: `rotate(${t * 6}deg)` });

const handStyles = computed(() => {
  const date = clockStore.currentTime;
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const hourDeg = (hours % 12) * 30 + minutes * 0.5;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const secondDeg = seconds * 6;

  return {
    hour: {
      transform: `rotate(${hourDeg}deg)`,
      transition: hourDeg === 0 ? 'none' : 'transform 0.15s cubic-bezier(0.4, 2.08, 0.55, 0.44)'
    },
    minute: {
      transform: `rotate(${minuteDeg}deg)`,
      transition: minuteDeg === 0 ? 'none' : 'transform 0.15s cubic-bezier(0.4, 2.08, 0.55, 0.44)'
    },
    second: {
      transform: `rotate(${secondDeg}deg)`,
      transition: secondDeg === 0 ? 'none' : 'transform 0.15s cubic-bezier(0.4, 2.08, 0.55, 0.44)'
    }
  };
});
</script>

<template>
  <div class="clock-face">
    <div v-for="t in 60" :key="`tick-${t}`" class="tick-spoke" :style="getTickStyle(t)">
      <div class="tick-mark" :class="{ 'major-tick': t % 5 === 0 }"></div>
    </div>

    <div v-for="n in 12" :key="`num-${n}`" class="number-spoke" :style="getSpokeStyle(n)">
      <div class="number-text" :style="getTextStyle(n)">{{ n }}</div>
    </div>

    <div :style="handStyles.hour" class="hand hour-hand"></div>
    <div :style="handStyles.minute" class="hand minute-hand"></div>
    <div :style="handStyles.second" class="hand second-hand"></div>
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

.tick-spoke {
  position: absolute;
  top: 0;
  left: 50%;
  width: 2px;
  height: 50%;
  margin-left: -1px;
  transform-origin: bottom center;
}

.tick-mark {
  width: 100%;
  height: 4px;
  background: #bbb;
}

.tick-mark.major-tick {
  height: 8px;
  background: #666;
  width: 2px;
}

.number-spoke {
  position: absolute;
  top: 0;
  left: 50%;
  width: 20px;
  height: 50%;
  margin-left: -10px;
  transform-origin: bottom center;
}

.number-text {
  position: absolute;
  left: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  font-size: 14px;
  color: #333;
  margin-top: 10px;
  transform-origin: center center;
}

.hand {
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform-origin: bottom center;
  background: #111;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  z-index: 2;
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
  z-index: 3;
}
</style>
