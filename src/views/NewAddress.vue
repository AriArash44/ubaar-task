<script setup>
    import { ref } from 'vue';
    const step = ref(1);
</script>

<template>
  <div v-if="step!==3" class="position-absolute bottom-0 bg-white w-100
  d-flex justify-content-center p-3">
    <button @click.prevent="step++" class="bg-primary-green border-0 pr-48px pl-48px py-1
    cursor-pointer text-white rounded" type="sumbit">ثبت و ادامه</button>
  </div>
</template>