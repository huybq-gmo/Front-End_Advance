<!-- components/ApiFetcher.vue -->
<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const data = ref(null);

const fetchData = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const result = await response.json();
    data.value = result;
  } catch (error) {
    console.error("API Error:", error);
  }
};

onMounted(() => {
  fetchData(); // Gọi API ngay khi component mount
  console.log("📌 Component Mounted: Data fetched");
});

onUnmounted(() => {
  console.log("🛑 Component Unmounted: Cleanup done");
});
</script>

<template>
  <div>
    <h2>Data từ API:</h2>
    <pre>{{ data }}</pre>
  </div>
</template>
