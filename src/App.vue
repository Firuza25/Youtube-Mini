<template>
  <div :class="['app', { dark: isDark }]">
    <header class="top-bar">
      <div class="logo">
        <img class="logo-svg" src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png"
          alt="MiniTube Logo" width="40" height="30" />
        <span>MiniTube</span>
      </div>

      <div class="search-bar">
        <input v-model="searchQuery" placeholder="Search" />
        <button @click="sortByViews">Sort by Views</button>
      </div>

      <button class="theme-btn" @click="toggleTheme">
        <component 
          :is="isDark ? Sun : Moon" 
          class="w-5 h-5" 
          style="stroke: currentColor" 
        />
      </button>
    </header>

    <div class="info-bar">
      <button class="info-btn">Found videos: {{ filteredVideos.length }}</button>
      <button class="info-btn">Total Likes: {{ totalLikes }}</button>
    </div>

    <div v-if="loading" class="loading">Loading videos…</div>

    <div v-else>
      <div v-if="filteredVideos.length" class="video-grid">
        <VideoCard 
          v-for="v in filteredVideos" 
          :key="v.id" 
          :title="v.snippet.title" 
          :channel="v.snippet.channelTitle"
          :views="v.statistics.viewCount" 
          :thumbnail="v.snippet.thumbnails.medium.url" 
          :url="v.url"
          @liked="handleLike" 
        />
      </div>
      <p v-else class="no-videos">No videos found.</p>
    </div>

    <div v-if="error" class="error">Error: {{ error }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useVideos } from './composables/useVideos'
import VideoCard from './components/VideoCard.vue'
import { Sun, Moon } from "lucide-vue-next"

const { allVideos, fetchVideos, loading, error, sortByViews } = useVideos()
const searchQuery = ref('')
const totalLikes = ref(0)
const isDark = ref(false)

const handleLike = () => totalLikes.value++

onMounted(() => fetchVideos())

const filteredVideos = computed(() => {
  if (!searchQuery.value) return allVideos.value
  return allVideos.value.filter(v =>
    v.snippet.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    v.snippet.channelTitle.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const toggleTheme = () => isDark.value = !isDark.value
</script>


<style scoped>

.app {
  font-family: Arial, sans-serif;
  background: #f9f9f9;
  color: #111;
  min-height: 100vh;
  padding-top: 70px;
  transition: background 0.3s, color 0.3s;
}

.dark {
  background: #181818;
  color: white;
}


.top-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-bottom: 1px solid #ccc;
  z-index: 100;
}

.dark .top-bar {
  background: #202020;
}

/* Поиск */
.search-bar {
  flex: 1;
  display: flex;
  justify-content: center;
  gap: 8px;
}

.search-bar input {
  width: 50%;
  padding: 6px 12px;
  border-radius: 2px;
  border: 1px solid #ccc;
}
.theme-btn {
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
}


.theme-btn {
  color: black; 
}
.dark .theme-btn {
  color: white;
}


.search-bar button {
  padding: 6px 12px;
  border: none;
  border-radius: 2px;
  background: #ff0000;
  color: white;
  cursor: pointer;
}

.search-bar button:hover {
  background: #cc0000;
}

.info-bar {
  display: flex;
  gap: 16px;
  justify-content: center;
  /* по центру */
  margin: 20px 0;
}

.info-btn {
  background: #ff0000;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.info-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

.dark .info-btn {
  background: #e60000;
  color: white;
}


.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo span {
  font-weight: bold;
  font-size: 20px;
}


.info-bar {
  margin: 20px;
  display: flex;
  gap: 20px;
}


.video-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  padding: 0 20px 20px 20px;
}

.loading,
.no-videos,
.error {
  text-align: center;
  margin: 20px;
  font-size: 18px;
}
</style>
