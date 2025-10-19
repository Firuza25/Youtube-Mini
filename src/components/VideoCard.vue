<template>
  <div class="video-card">
    <a :href="url" target="_blank">
      <img :src="thumbnail" alt="thumbnail" />
    </a>
    <h3>{{ title }}</h3>
    <p class="channel">{{ channel }}</p>
    <p class="views">{{ formattedViews }}</p>
    <button @click="$emit('liked')">❤ Like</button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: String,
  channel: String,
  views: [String, Number],
  thumbnail: String,
  url: String
})

const formattedViews = computed(() => {
  const v = Number(props.views) || 0
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(1) + 'M views'
  if (v >= 1_000) return (v / 1_000).toFixed(1) + 'K views'
  return v + ' views'
})
</script>

<style scoped>
.video-card {
  width: 240px;
  border-radius: 6px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}
.video-card:hover { transform: scale(1.03); }
.video-card img { width: 100%; height: 140px; object-fit: cover; }
h3 { font-size: 14px; margin: 8px; }
.channel, .views { font-size: 12px; color: #555; margin: 0 8px; }
button {
  margin: 8px;
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  background: #ff4d4d;
  color: white;
  cursor: pointer;
}
button:hover { background: #e60000; }
.dark .video-card { background: #222; color: white; }
.dark .channel, .dark .views { color: #ccc; }
</style>
