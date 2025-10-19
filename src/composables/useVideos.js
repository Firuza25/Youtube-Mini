import { ref } from 'vue'
const PEXELS_API_KEY = 'WJQa646so0E0IGs6h6XDx0ubXCq8gdveaQWae1bQLgHC9PV6brmZ6yVJ'

export function useVideos() {
  const allVideos = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchVideos = async () => {
    loading.value = true
    error.value = null

    try {
      const videoPromises = Array.from({ length: 10 }, async (_, i) => {
        const response = await fetch(
          `https://api.pexels.com/v1/search?query=technology&per_page=1&page=${i + 1}`,
          { headers: { Authorization: PEXELS_API_KEY } }
        )
        const data = await response.json()
        const photo = data.photos[0]

        const imgUrl = photo?.src.medium || 'https://via.placeholder.com/320x180'
        const title = photo?.alt || `Video Tutorial #${i + 1}`
        const channelTitle = photo?.photographer || `Channel ${i + 1}`
        const photoUrl = photo?.url || 'https://www.pexels.com/'

        return {
          id: `photo_${i}`,
          url: photoUrl,
          snippet: { title, channelTitle, thumbnails: { medium: { url: imgUrl } } },
          statistics: { viewCount: Math.floor(Math.random() * 1000000) }
        }
      })

      const videos = await Promise.all(videoPromises)
      allVideos.value = videos
    } catch (err) {
      console.error(err)
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const sortByViewsFunc = () => {
    allVideos.value.sort(
      (a, b) => (Number(b.statistics.viewCount) || 0) - (Number(a.statistics.viewCount) || 0)
    )
  }

  return { allVideos, fetchVideos, loading, error, sortByViews: sortByViewsFunc }
}
