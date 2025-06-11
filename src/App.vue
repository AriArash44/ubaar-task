<script setup>
    import BaseLayout from "./layouts/BaseLayout.vue";
    import { reactive } from 'vue';
    
    const routes = reactive({
        "/new-address": "ثبت آدرس",
        "/view-addresses": "مشاهده آدرس‌ها"
    });
</script>

<template dir="rtl">
  <BaseLayout>
    <template #nav>
      <router-link v-for="(title, route) in routes" :to="route" :key="title"
      class="text-decoration-none text-text-color fw-semibold">
        {{ title }}
      </router-link>
    </template>
    <template #main>
      <router-view></router-view>
    </template>
  </BaseLayout>
</template>