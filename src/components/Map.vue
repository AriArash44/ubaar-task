<script setup>
import { onMounted } from 'vue';
    const position = defineModel({
        lat: 35.69,
        long: 51.42
    });
    let map = null;
    let marker = null;
    onMounted(() => {
        map = L.map("map").setView([35.69, 51.42], 13);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
        marker = L.marker([35.69, 51.42]).addTo(map);
        map.on("moveend", () => {
            const center = map.getCenter();
            marker.setLatLng([center.lat, center.lng]);
            position.value.lat = center.lat;
            position.value.long = center.lng;
        });
    });
</script>

<template>
  <div id="map" style="height: 500px; width: 100%;"></div>
</template>