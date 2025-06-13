<script setup>
import { onMounted, ref } from 'vue';
    let lat = ref(null);
    let long = ref(null);
    let map = null;
    onMounted(() => {
        var map = L.map('map').setView([35.69, 51.42], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
    });
</script>

<template>
  <div id="map" style="height: 500px; width: 100%;"></div>
</template>