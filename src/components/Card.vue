<script setup>
    const props = defineProps({
        title: { type: String, default: undefined }
    });
</script>

<template>
  <div class="w-95 w-sm-75 w-md-75 w-lg-70 w-xl-65">
    <p v-if="title">{{ title }}</p>
    <div class="bg-white rounded-2">
      <slot></slot>
    </div>
  </div>
</template>