<script setup>
    import BaseLayout from "./layouts/BaseLayout.vue";
    import { computed, reactive } from 'vue';
    import { useRoute } from 'vue-router';
    
    const routes = reactive({
        "/new-address": "ثبت آدرس",
        "/view-addresses": "مشاهده آدرس‌ها"
    });

    const route = useRoute();
    const path = computed(() => route.fullPath);
</script>

<template dir="rtl">
  <BaseLayout>
    <template #nav>
      <router-link v-for="(title, route) in routes" :to="route" :key="title"
      :class="['text-decoration-none fw-semibold', path.includes(route) ? 'text-primary-green' : 'text-text-color']">
        {{ title }}
      </router-link>
    </template>
    <template #main>
      <router-view></router-view>
    </template>
  </BaseLayout>
</template>