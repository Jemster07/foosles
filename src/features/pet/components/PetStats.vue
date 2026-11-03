<script setup lang="ts">

</script>

<template>
  <div class="container">
    <div class="col">
      <h1>PetStats</h1>
    </div>
  </div>

  <div class="container">
    <div class="col">
      <select>
        <option selected>neutral</option>
        <option>blink</option>
        <option>down</option>
        <option>sad</option>
        <option>shocked</option>
        <option>sleep</option>
      </select>
    </div>

    <div class="col">
      <button>Apply</button>
    </div>
  </div>

  <div class="container">
    <div class="col">
      <button>Shed Less</button>
    </div>
    <div class="col">
      <button>Shed More</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  flex-wrap: nowrap;
}

.col {
  flex: 1 1 auto;
}
</style>
