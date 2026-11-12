import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './assets/css/main.css'
import { registerSW } from 'virtual:pwa-register'

const CURRENT_BUILD_ID = typeof __APP_BUILD_ID__ !== 'undefined' ? __APP_BUILD_ID__ : ''
const VERSION_RELOAD_KEY = 'sapa_rstn_reloaded_build'
let isReloadingForUpdate = false
let lastUpdateCheckAt = 0

function triggerReloadOnce(buildId) {
  if (isReloadingForUpdate) return
  if (buildId) {
    try {
      if (sessionStorage.getItem(VERSION_RELOAD_KEY) === buildId) return
      sessionStorage.setItem(VERSION_RELOAD_KEY, buildId)
    } catch {
      // Abaikan jika sessionStorage tidak tersedia
    }
  }
  isReloadingForUpdate = true
  window.location.reload()
}

async function clearRuntimeCaches() {
  if ('caches' in window) {
    try {
      const names = await caches.keys()
      await Promise.all(names.map((name) => caches.delete(name)))
    } catch {
      // Abaikan kegagalan hapus cache
    }
  }
}

async function checkServerVersion(registration) {
  if (!navigator.onLine || !CURRENT_BUILD_ID) return
  const now = Date.now()
  if (now - lastUpdateCheckAt < 30 * 1000) return
  lastUpdateCheckAt = now

  try {
    await registration?.update()
  } catch {
    // Abaikan jika gagal cek SW (misal jaringan lambat/offline)
  }

  try {
    const res = await fetch(`/version.json?t=${now}`, { cache: 'no-store' })
    if (!res.ok) return
    const data = await res.json()
    if (data?.buildId && data.buildId !== CURRENT_BUILD_ID) {
      await clearRuntimeCaches()
      await registration?.update().catch(() => {})
      triggerReloadOnce(data.buildId)
    }
  } catch {
    // Abaikan saat offline
  }
}

if ('serviceWorker' in navigator) {
  let hadController = Boolean(navigator.serviceWorker.controller)
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!hadController) {
      hadController = true
      return
    }
    triggerReloadOnce()
  })
}

// Register PWA Service Worker & aktifkan pengecekan update otomatis
registerSW({
  immediate: true,
  onRegisteredSW(_swUrl, registration) {
    if (!registration) return

    const runCheck = () => checkServerVersion(registration)
    runCheck()

    setInterval(runCheck, 5 * 60 * 1000)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') runCheck()
    })
    window.addEventListener('focus', runCheck)
    window.addEventListener('online', runCheck)
  }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
