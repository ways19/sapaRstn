<template>
  <div class="min-h-screen bg-gray-50/80">
    <!-- Desktop & Tablet Sidebar (Hanya tampil jika bukan di halaman login) -->
    <AppSidebar
      v-if="showSidebar"
      :collapsed="false"
      :is-mobile="false"
      class="z-50"
    />

    <!-- Main area -->
    <div
      class="flex flex-col min-h-screen transition-all duration-300"
      :style="showSidebar ? 'margin-left: 256px' : ''"
    >
      <!-- Header -->
      <AppHeader />

      <!-- Content -->
      <main
        class="flex-1"
        :class="[
          isMobile ? 'px-4 pt-4 pb-24' : '',
          isTablet ? 'px-6 pt-6 pb-8' : '',
          isDesktop ? 'px-8 pt-6 pb-8' : ''
        ]"
      >
        <transition name="page" mode="out-in">
          <router-view />
        </transition>
      </main>
    </div>

    <!-- Bottom Nav (Mobile - Sembunyikan di halaman login) -->
    <BottomNav v-if="isMobile && route.path !== '/login'" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useResponsive } from '../composables/useResponsive'
import AppHeader from '../components/common/AppHeader.vue'
import AppSidebar from '../components/common/AppSidebar.vue'
import BottomNav from '../components/common/BottomNav.vue'

const route = useRoute()
const { isMobile, isTablet, isDesktop } = useResponsive()

const showSidebar = computed(() => {
  // Sembunyikan sidebar di halaman login agar tampilan bersih dan terpusat
  if (route.path === '/login') return false
  // Tampilkan di desktop dan tablet (layar >= 768px)
  return isDesktop.value || isTablet.value
})
</script>
