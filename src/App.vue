<template>
  <router-view />
  <PwaInstallBanner />
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'
import { setupInactivityWatcher, cleanupInactivityWatcher } from './utils/inactivity'
import PwaInstallBanner from './components/common/PwaInstallBanner.vue'

const router = useRouter()
const authStore = useAuthStore()

const handleInactivityTimeout = () => {
  if (authStore.isAuthenticated) {
    authStore.logout()
    router.push({ path: '/login', query: { timeout: '1' } })
  }
}

onMounted(() => {
  setupInactivityWatcher(handleInactivityTimeout)
})

onUnmounted(() => {
  cleanupInactivityWatcher()
})
</script>
