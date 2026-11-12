<template>
  <div class="flex flex-col gap-6 md:gap-8 max-w-7xl mx-auto" style="animation: fade-in 0.4s ease-out;">
    <!-- Welcome Card for Logged In User -->
    <div
      v-if="authStore.isAuthenticated"
      class="rounded-3xl overflow-hidden relative shadow-lg shadow-emerald-950/10 border border-emerald-800/30"
      style="background: linear-gradient(135deg, #064e3b 0%, #059669 50%, #0d9488 100%);"
    >
      <div class="absolute -top-12 -right-12 w-56 h-56 bg-white/10 rounded-full blur-sm pointer-events-none"></div>
      <div class="absolute -bottom-8 right-24 w-36 h-36 bg-white/5 rounded-full blur-sm pointer-events-none"></div>
      <div class="absolute top-1/2 left-1/3 w-20 h-20 bg-white/5 rounded-full pointer-events-none"></div>
      
      <div class="relative p-5 sm:p-7 md:p-9 flex items-center justify-between gap-6">
        <div class="space-y-2.5">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-emerald-50 text-xs font-semibold backdrop-blur-md border border-white/20 shadow-sm">
            <span>{{ greeting }}</span>
          </div>
          <h2 class="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            {{ authStore.namaPasien || ('Pasien RM ' + authStore.userNorm) }}
          </h2>
          <p class="text-emerald-100/90 text-xs sm:text-sm leading-relaxed max-w-2xl">
            Selamat datang di Portal Pasien RSUD R.A.A. Tjokronegoro. Akses seluruh layanan kesehatan dan informasi medis Anda dengan cepat.
          </p>
        </div>

        <div class="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/25 shrink-0 shadow-inner hidden sm:flex">
          <svg class="w-9 h-9 md:w-11 md:h-11 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- Welcome Card for Guest / Unauthenticated User -->
    <div
      v-else
      class="rounded-3xl overflow-hidden relative shadow-lg shadow-emerald-950/10 border border-emerald-800/30"
      style="background: linear-gradient(135deg, #064e3b 0%, #059669 50%, #0d9488 100%);"
    >
      <div class="absolute -top-12 -right-12 w-56 h-56 bg-white/10 rounded-full blur-sm pointer-events-none"></div>
      <div class="absolute -bottom-8 right-24 w-36 h-36 bg-white/5 rounded-full blur-sm pointer-events-none"></div>
      
      <div class="relative p-5 sm:p-7 md:p-9 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div class="space-y-2.5">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-emerald-50 text-xs font-semibold backdrop-blur-md border border-white/20 shadow-sm">
            <span>🏥 RSUD R.A.A. Tjokronegoro</span>
          </div>
          <h2 class="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Portal Pasien RSUD R.A.A. Tjokronegoro (SAPA RSTN)
          </h2>
          <p class="text-emerald-100/90 text-xs sm:text-sm leading-relaxed max-w-xl">
            Akses informasi jadwal dokter, ketersediaan tempat tidur, dan edukasi kesehatan. Masuk dengan No. Rekam Medis untuk pendaftaran dan rekam medis pasien umum.
          </p>
        </div>

        <router-link
          to="/login"
          class="self-start sm:self-center inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-emerald-800 font-bold text-xs sm:text-sm shadow-md hover:bg-emerald-50 transition-all duration-200 shrink-0 active:scale-95"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
          <span>Masuk Pasien</span>
        </router-link>
      </div>
    </div>

    <!-- Main Menu & Services Grid -->
    <div class="flex flex-col gap-3">
      <div class="flex items-center justify-between px-0.5">
        <div>
          <h3 class="text-xs sm:text-sm font-bold text-gray-700 uppercase tracking-wider">
            {{ authStore.isAuthenticated ? 'Menu Layanan Pasien' : 'Layanan Publik' }}
          </h3>
          <p class="text-[11px] sm:text-xs text-gray-400">
            {{ authStore.isAuthenticated ? 'Pilih menu layanan yang Anda butuhkan' : 'Menu informasi yang dapat diakses secara langsung' }}
          </p>
        </div>
      </div>

      <!-- Menu Grid: Frameless modern icon-first layout -->
      <div
        class="grid gap-y-4 gap-x-2 sm:gap-4 md:gap-5 py-1"
        :class="authStore.isAuthenticated ? 'grid-cols-4 sm:grid-cols-4 md:grid-cols-8' : 'grid-cols-4 sm:grid-cols-4'"
      >
        <router-link
          v-for="menu in displayedMenus"
          :key="menu.to"
          :to="menu.to"
          class="group flex flex-col items-center text-center justify-start gap-2 py-1 px-1 active:scale-95 transition-transform"
        >
          <!-- Icon Tile -->
          <div
            class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-all duration-200 group-hover:scale-105 group-hover:shadow-md shadow-sm border border-black/5"
            :class="menu.bgClass"
          >
            <component
              :is="menu.iconComponent"
              class="w-6 h-6 sm:w-7 sm:h-7 transition-transform"
              :class="menu.iconClass"
            />
          </div>

          <!-- Menu Label -->
          <span
            class="text-[11px] sm:text-xs font-semibold text-gray-700 group-hover:text-emerald-700 transition-colors leading-tight text-center max-w-[80px] sm:max-w-[100px]"
          >
            {{ menu.label }}
          </span>
        </router-link>
      </div>
    </div>

    <!-- Login Invitation Card (If Guest) -->
    <div v-if="!authStore.isAuthenticated" class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-5 sm:p-7 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="space-y-1.5">
        <div class="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[11px] font-bold">
          🔒 Fitur Khusus Pasien Terdaftar
        </div>
        <h3 class="text-base sm:text-lg font-bold">Ingin Melakukan Pendaftaran Online & Cek Antrian?</h3>
        <p class="text-xs text-gray-300 max-w-lg leading-relaxed">
          Masuk dengan Nomor Rekam Medis & Tanggal Lahir untuk mengakses Pendaftaran Poli, Riwayat Reservasi, Antrean Apotek, dan Hasil Radiologi.
        </p>
      </div>
      <router-link
        to="/login"
        class="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold transition-all duration-200 shrink-0 shadow-sm active:scale-95"
      >
        <span>Masuk Sekarang</span>
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
      </router-link>
    </div>

    <!-- Info Cards Section (Only for Logged In User) -->
    <div v-if="authStore.isAuthenticated" class="grid md:grid-cols-2 gap-5 sm:gap-6">
      <!-- Status Card -->
      <div class="p-5 sm:p-7 border border-gray-100/90 rounded-2xl shadow-sm bg-white flex flex-col gap-4">
        <div class="flex items-center justify-between gap-2">
          <div class="flex items-center gap-3 min-w-0">
            <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <div class="min-w-0">
              <h3 class="font-bold text-gray-800 text-sm sm:text-base">Status Antrian Hari Ini</h3>
              <p class="text-[11px] text-gray-400 truncate">Informasi antrian poliklinik &amp; apotek</p>
            </div>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <button
              type="button"
              @click="fetchDashboardSummary(true)"
              :disabled="loadingSummary"
              class="w-7 h-7 rounded-lg bg-gray-50 hover:bg-emerald-50 text-gray-400 hover:text-emerald-600 flex items-center justify-center transition-colors cursor-pointer disabled:opacity-50"
              title="Muat ulang status antrian"
            >
              <svg class="w-3.5 h-3.5" :class="loadingSummary ? 'animate-spin text-emerald-600' : ''" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
            </button>
            <router-link to="/antrian-farmasi" class="text-xs font-semibold text-emerald-600 hover:text-emerald-700">
              Cek Antrian &rarr;
            </router-link>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loadingSummary && !antrianFarmasi && todayPoliQueues.length === 0" class="bg-gray-50/80 border border-gray-100 rounded-xl p-6 flex flex-col items-center justify-center gap-2 text-gray-400">
          <svg class="w-6 h-6 animate-spin text-emerald-600" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" class="opacity-25"/><path d="M4 12a8 8 0 018-8" stroke="currentColor" stroke-width="3" stroke-linecap="round" class="opacity-75"/></svg>
          <span class="text-xs font-medium">Memuat status antrian...</span>
        </div>

        <!-- Active Queue List (Farmasi + Poli Hari Ini) -->
        <div v-else-if="antrianFarmasi || todayPoliQueues.length > 0" class="space-y-3">
          <!-- Antrian Farmasi Aktif -->
          <router-link
            v-if="antrianFarmasi"
            to="/antrian-farmasi"
            class="block rounded-xl p-4 bg-gradient-to-br from-teal-50/90 to-emerald-50/60 border border-teal-100 hover:border-teal-300 transition-all group"
          >
            <div class="flex items-start justify-between gap-3">
              <div class="space-y-1 min-w-0">
                <span class="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-teal-700">
                  <span class="w-2 h-2 rounded-full" :class="farmasiStatusMeta.dotClass"></span>
                  Antrean Apotek
                </span>
                <p class="text-2xl font-black text-teal-800 tracking-tight leading-none">
                  {{ antrianFarmasi.loket }}-{{ antrianFarmasi.nomor }}
                </p>
                <p class="text-xs font-medium text-teal-700/90">
                  {{ getLoketLabel(antrianFarmasi.loket) }}
                </p>
              </div>
              <div class="flex flex-col items-end gap-1.5 shrink-0">
                <span
                  class="px-2.5 py-1 rounded-lg text-[11px] font-bold border"
                  :class="farmasiStatusMeta.badgeClass"
                >
                  {{ farmasiStatusMeta.label }}
                </span>
                <span class="text-[11px] text-gray-500 font-medium">
                  Panggilan: <strong class="text-gray-700">{{ antrianFarmasi.panggilanTerakhir || '-' }}</strong>
                </span>
              </div>
            </div>
          </router-link>

          <!-- Antrian Poliklinik Hari Ini -->
          <router-link
            v-for="item in todayPoliQueues.slice(0, 2)"
            :key="item.kodeBooking"
            to="/riwayat-reservasi"
            class="block rounded-xl p-3.5 bg-blue-50/50 border border-blue-100 hover:border-blue-300 transition-all"
          >
            <div class="flex items-center justify-between gap-3">
              <div class="flex items-center gap-3 min-w-0">
                <div class="w-12 h-12 rounded-xl bg-blue-600 text-white flex flex-col items-center justify-center shrink-0 shadow-xs">
                  <span class="text-[9px] font-semibold uppercase opacity-80 leading-none">Antrian</span>
                  <span class="text-base font-black leading-tight mt-0.5">{{ item.NOMOR_ANTRIAN || '-' }}</span>
                </div>
                <div class="min-w-0">
                  <div class="flex items-center gap-1.5">
                    <span class="text-[10px] font-bold uppercase tracking-wider text-blue-700">Poliklinik Hari Ini</span>
                    <span v-if="item.isBpjs" class="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[9px] font-bold">BPJS</span>
                  </div>
                  <p class="text-xs sm:text-sm font-bold text-gray-800 truncate">{{ item.namaPoli }}</p>
                  <p class="text-[11px] text-gray-500 truncate">{{ item.namaDokter }}</p>
                </div>
              </div>
              <div class="text-right shrink-0">
                <span class="inline-block px-2 py-0.5 rounded-md bg-white border border-blue-100 text-[11px] font-bold text-blue-700 font-mono">
                  {{ item.ESTIMASI_PELAYANAN ? formatJamEstimasi(item.ESTIMASI_PELAYANAN) + ' WIB' : (item.JAM_PRAKTEK || '-') }}
                </span>
                <p class="text-[10px] text-gray-400 mt-1 font-mono">{{ item.kodeBooking }}</p>
              </div>
            </div>
          </router-link>
        </div>

        <!-- Empty State -->
        <div v-else class="bg-gray-50/80 border border-gray-100 rounded-xl p-6 flex flex-col items-center justify-center text-center gap-2">
          <div class="w-10 h-10 rounded-full bg-gray-200/60 flex items-center justify-center text-gray-400">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/>
            </svg>
          </div>
          <p class="text-gray-600 font-semibold text-xs sm:text-sm">Tidak ada antrian aktif saat ini</p>
          <p class="text-gray-400 text-[11px]">
            {{ farmasiWaitingMsg || 'Daftar pemeriksaan untuk mendapatkan nomor antrian' }}
          </p>
        </div>
      </div>

      <!-- Jadwal Card -->
      <div class="p-5 sm:p-7 border border-gray-100/90 rounded-2xl shadow-sm bg-white flex flex-col gap-4">
        <div class="flex items-center justify-between gap-2">
          <div class="flex items-center gap-3 min-w-0">
            <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <div class="min-w-0">
              <h3 class="font-bold text-gray-800 text-sm sm:text-base">Jadwal Reservasi</h3>
              <p class="text-[11px] text-gray-400 truncate">Kunjungan atau kontrol dokter berikutnya</p>
            </div>
          </div>
          <router-link to="/riwayat-reservasi" class="text-xs font-semibold text-emerald-600 hover:text-emerald-700 shrink-0">
            Lihat Semua &rarr;
          </router-link>
        </div>

        <!-- Loading State -->
        <div v-if="loadingSummary && upcomingReservasi.length === 0" class="bg-gray-50/80 border border-gray-100 rounded-xl p-6 flex flex-col items-center justify-center gap-2 text-gray-400">
          <svg class="w-6 h-6 animate-spin text-amber-500" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" class="opacity-25"/><path d="M4 12a8 8 0 018-8" stroke="currentColor" stroke-width="3" stroke-linecap="round" class="opacity-75"/></svg>
          <span class="text-xs font-medium">Memuat jadwal reservasi...</span>
        </div>

        <!-- Upcoming Reservation List -->
        <div v-else-if="upcomingReservasi.length > 0" class="space-y-2.5">
          <router-link
            v-for="item in upcomingReservasi.slice(0, 3)"
            :key="item.kodeBooking"
            to="/riwayat-reservasi"
            class="block rounded-xl p-3.5 border transition-all hover:shadow-xs"
            :class="item.isToday ? 'bg-emerald-50/60 border-emerald-200 hover:border-emerald-300' : 'bg-gray-50/70 border-gray-100 hover:border-amber-200'"
          >
            <div class="flex items-start justify-between gap-3">
              <div class="min-w-0 space-y-1">
                <div class="flex flex-wrap items-center gap-1.5">
                  <span
                    v-if="item.isToday"
                    class="px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-bold"
                  >
                    Hari Ini
                  </span>
                  <span
                    class="px-2 py-0.5 rounded-md text-[10px] font-bold"
                    :class="item.isBpjs ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'"
                  >
                    {{ item.isBpjs ? 'Kontrol BPJS' : (item.caraBayar || 'UMUM') }}
                  </span>
                  <span class="text-[11px] font-mono font-bold text-gray-500">
                    #{{ item.kodeBooking }}
                  </span>
                </div>
                <p class="text-xs sm:text-sm font-bold text-gray-800 truncate">{{ item.namaPoli }}</p>
                <p class="text-[11px] text-gray-500 truncate">{{ item.namaDokter }}</p>
                <p class="text-[11px] font-semibold" :class="item.isToday ? 'text-emerald-700' : 'text-amber-700'">
                  {{ formatJadwalDisplay(item.TANGGALKUNJUNGAN, item.ESTIMASI_PELAYANAN || item.JAM_PRAKTEK) }}
                </p>
              </div>
              <div class="px-2.5 py-1.5 rounded-xl bg-white border border-gray-200/80 text-center shrink-0 min-w-[54px]">
                <span class="block text-[9px] font-semibold text-gray-400 uppercase">No.</span>
                <span class="text-sm font-black text-gray-800">{{ item.NOMOR_ANTRIAN || '-' }}</span>
              </div>
            </div>
          </router-link>
        </div>

        <!-- Empty State -->
        <div v-else class="bg-gray-50/80 border border-gray-100 rounded-xl p-6 flex flex-col items-center justify-center text-center gap-2">
          <div class="w-10 h-10 rounded-full bg-gray-200/60 flex items-center justify-center text-gray-400">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
            </svg>
          </div>
          <p class="text-gray-600 font-semibold text-xs sm:text-sm">Belum ada jadwal terdaftar</p>
          <p class="text-gray-400 text-[11px]">
            <template v-if="allReservasi.length > 0">
              Terdapat {{ allReservasi.length }} riwayat kunjungan sebelumnya di halaman Reservasi.
            </template>
            <template v-else>
              Jadwal kontrol dokter Anda akan ditampilkan di sini
            </template>
          </p>
        </div>
      </div>
    </div>

    <!-- Contact & Info Banner -->
    <div class="p-5 sm:p-6 bg-emerald-50/70 border border-emerald-200/70 rounded-2xl">
      <div class="flex items-start gap-3.5">
        <div class="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
        </div>
        <div class="space-y-1">
          <p class="text-emerald-900 font-bold text-xs sm:text-sm">Pusat Layanan & Bantuan RSUD</p>
          <p class="text-emerald-700 text-xs sm:text-sm leading-relaxed">
            Informasi layanan rawat jalan, jadwal dokter, maupun bantuan teknis dapat menghubungi Customer Care RSUD R.A.A. Tjokronegoro Purworejo.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, h, onMounted, onUnmounted, watch } from 'vue'
import api from '../services/api'
import { useAuthStore } from '../stores/auth'
import {
  mergeAndSortReservasi,
  formatJadwalDisplay,
  formatJamEstimasi,
  getFarmasiStatusMeta,
  getLoketLabel
} from '../utils/reservasi'

const DASHBOARD_POLL_MS = 30000
const authStore = useAuthStore()

const loadingSummary = ref(false)
const antrianFarmasi = ref(null)
const farmasiWaitingMsg = ref('')
const reservasiList = ref([])
const bpjsKontrol = ref(null)
let dashboardPollTimer = null

const farmasiStatusMeta = computed(() => getFarmasiStatusMeta(antrianFarmasi.value?.status))
const allReservasi = computed(() => mergeAndSortReservasi(reservasiList.value, bpjsKontrol.value))
const todayPoliQueues = computed(() => allReservasi.value.filter((item) => item.isToday))
const upcomingReservasi = computed(() =>
  allReservasi.value.filter((item) => item.isToday || !item.isExpired)
)

async function fetchDashboardSummary(showLoading = true) {
  if (!authStore.isAuthenticated) return
  const norm = authStore.userNorm || authStore.userName
  if (showLoading) loadingSummary.value = true

  const [farmasiRes, reservasiRes, bpjsRes] = await Promise.allSettled([
    norm ? api.get('/publik/antrian-farmasi', { params: { norm } }) : Promise.resolve(null),
    api.get('/daftar-umum/list-reservasi'),
    api.get('/resume-medis/kontrol-bpjs')
  ])

  if (farmasiRes.status === 'fulfilled' && farmasiRes.value?.data) {
    const res = farmasiRes.value.data
    const isOk = String(res.code) === '200'
    if (isOk && res.data && res.data.loket && res.data.nomor) {
      antrianFarmasi.value = res.data
      farmasiWaitingMsg.value = ''
    } else {
      antrianFarmasi.value = null
      farmasiWaitingMsg.value = isOk && res.message ? res.message : ''
    }
  } else if (showLoading) {
    antrianFarmasi.value = null
    farmasiWaitingMsg.value = ''
  }

  if (
    reservasiRes.status === 'fulfilled' &&
    String(reservasiRes.value?.data?.code) === '200' &&
    Array.isArray(reservasiRes.value.data.data)
  ) {
    reservasiList.value = reservasiRes.value.data.data
  } else if (showLoading) {
    reservasiList.value = []
  }

  if (bpjsRes.status === 'fulfilled' && bpjsRes.value?.data) {
    const code = bpjsRes.value.data.code
    const data = bpjsRes.value.data.data
    const tidakAdaData =
      String(code) !== '200' ||
      data === null ||
      data === undefined ||
      (Array.isArray(data) && data.length === 0) ||
      (typeof data === 'object' && !Array.isArray(data) && Object.keys(data).length === 0)
    bpjsKontrol.value = !tidakAdaData ? data : null
  } else if (showLoading) {
    bpjsKontrol.value = null
  }

  if (showLoading) loadingSummary.value = false
}

function stopDashboardPolling() {
  if (dashboardPollTimer) {
    clearInterval(dashboardPollTimer)
    dashboardPollTimer = null
  }
}

function startDashboardPolling() {
  stopDashboardPolling()
  if (!authStore.isAuthenticated) return
  dashboardPollTimer = setInterval(() => {
    if (authStore.isAuthenticated && document.visibilityState === 'visible') {
      fetchDashboardSummary(false)
    }
  }, DASHBOARD_POLL_MS)
}

function onDashboardVisibilityChange() {
  if (authStore.isAuthenticated && document.visibilityState === 'visible') {
    fetchDashboardSummary(false)
  }
}

onMounted(() => {
  document.addEventListener('visibilitychange', onDashboardVisibilityChange)
  if (authStore.isAuthenticated) {
    authStore.fetchProfile()
    fetchDashboardSummary(true)
    startDashboardPolling()
  }
})

onUnmounted(() => {
  stopDashboardPolling()
  document.removeEventListener('visibilitychange', onDashboardVisibilityChange)
})

watch(
  () => authStore.isAuthenticated,
  (loggedIn) => {
    if (loggedIn) {
      authStore.fetchProfile()
      fetchDashboardSummary(true)
      startDashboardPolling()
    } else {
      stopDashboardPolling()
      antrianFarmasi.value = null
      farmasiWaitingMsg.value = ''
      reservasiList.value = []
      bpjsKontrol.value = null
    }
  }
)

const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 12) return '🌅 Selamat Pagi'
  if (hour < 15) return '☀️ Selamat Siang'
  if (hour < 18) return '🌇 Selamat Sore'
  return '🌙 Selamat Malam'
})

function createIcon(paths) {
  return {
    render() {
      return h('svg', {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      }, paths.map(d => h('path', { d })))
    }
  }
}

// Public Menus (Accessible without login)
const publicMenus = [
  {
    to: '/jadwal-dokter',
    label: 'Jadwal Dokter',
    description: 'Praktik Dokter Spesialis & Kuota',
    bgClass: 'bg-cyan-50 text-cyan-600',
    iconClass: 'text-cyan-600',
    iconComponent: createIcon(['M3 4h18v18H3z', 'M16 2v4', 'M8 2v4', 'M3 10h18'])
  },
  {
    to: '/info-tempat-tidur',
    label: 'Tempat Tidur',
    description: 'Ketersediaan Kamar Inap',
    bgClass: 'bg-amber-50 text-amber-600',
    iconClass: 'text-amber-600',
    iconComponent: createIcon(['M2 4v16', 'M22 4v16', 'M2 8h20', 'M2 16h20'])
  },
  {
    to: '/antrian-farmasi',
    label: 'Antrean Apotek',
    description: 'Cek Antrean Obat',
    bgClass: 'bg-teal-50 text-teal-600',
    iconClass: 'text-teal-600',
    iconComponent: createIcon(['M19.5 12.572l-7.5 7.428l-7.5-7.428A5 5 0 1 1 12 6.006a5 5 0 1 1 7.5 6.572'])
  },
  {
    to: '/edukasi',
    label: 'Edukasi',
    description: 'Informasi & Tips Kesehatan',
    bgClass: 'bg-indigo-50 text-indigo-600',
    iconClass: 'text-indigo-600',
    iconComponent: createIcon(['M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z', 'M6 6h10', 'M6 10h10'])
  }
]

// All Menus (Shown when logged in)
const allMenus = [
  {
    to: '/daftar-online',
    label: 'Daftar Online',
    description: 'Poli Rawat Jalan',
    bgClass: 'bg-emerald-50 text-emerald-600',
    iconClass: 'text-emerald-600',
    iconComponent: createIcon(['M12 5v14', 'M5 12h14'])
  },
  {
    to: '/jadwal-dokter',
    label: 'Jadwal Dokter',
    description: 'Praktik Dokter',
    bgClass: 'bg-cyan-50 text-cyan-600',
    iconClass: 'text-cyan-600',
    iconComponent: createIcon(['M3 4h18v18H3z', 'M16 2v4', 'M8 2v4', 'M3 10h18'])
  },
  {
    to: '/riwayat-reservasi',
    label: 'Reservasi',
    description: 'Histori & Tiket',
    bgClass: 'bg-teal-50 text-teal-600',
    iconClass: 'text-teal-600',
    iconComponent: createIcon(['M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2', 'M12 11h4', 'M12 16h4', 'M8 11h.01', 'M8 16h.01'])
  },
  {
    to: '/antrian-farmasi',
    label: 'Antrean Apotek',
    description: 'Antrean Obat',
    bgClass: 'bg-blue-50 text-blue-600',
    iconClass: 'text-blue-600',
    iconComponent: createIcon(['M19.5 12.572l-7.5 7.428l-7.5-7.428A5 5 0 1 1 12 6.006a5 5 0 1 1 7.5 6.572'])
  },
  {
    to: '/hasil-radiologi',
    label: 'Radiologi',
    description: 'Hasil Rontgen & USG',
    bgClass: 'bg-violet-50 text-violet-600',
    iconClass: 'text-violet-600',
    iconComponent: createIcon(['M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z', 'M2 12h3', 'M19 12h3', 'M12 2v3', 'M12 19v3'])
  },
  {
    to: '/hasil-laboratorium',
    label: 'Laboratorium',
    description: 'Hasil Tes & Darah',
    bgClass: 'bg-teal-50 text-teal-600',
    iconClass: 'text-teal-600',
    iconComponent: createIcon(['M10 2v7.31L4.68 18.2A2 2 0 0 0 6.4 21h11.2a2 2 0 0 0 1.72-2.8L14 9.31V2', 'M8.5 2h7', 'M7 16h10'])
  },
  {
    to: '/resume-medis',
    label: 'Resume Medis',
    description: 'Rawat Inap',
    bgClass: 'bg-sky-50 text-sky-600',
    iconClass: 'text-sky-600',
    iconComponent: createIcon(['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', 'M14 2v6h6', 'M16 13H8', 'M16 17H8'])
  },
  {
    to: '/tagihan-umum',
    label: 'Tagihan',
    description: 'Tagihan Pasien',
    bgClass: 'bg-orange-50 text-orange-600',
    iconClass: 'text-orange-600',
    iconComponent: createIcon(['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', 'M14 2v6h6', 'M9 15h6', 'M12 12v6'])
  },
  {
    to: '/info-tempat-tidur',
    label: 'Info Kamar',
    description: 'Tempat Tidur',
    bgClass: 'bg-amber-50 text-amber-600',
    iconClass: 'text-amber-600',
    iconComponent: createIcon(['M2 4v16', 'M22 4v16', 'M2 8h20', 'M2 16h20'])
  },
  {
    to: '/edukasi',
    label: 'Edukasi',
    description: 'Info Kesehatan',
    bgClass: 'bg-indigo-50 text-indigo-600',
    iconClass: 'text-indigo-600',
    iconComponent: createIcon(['M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z', 'M6 6h10', 'M6 10h10'])
  },
  {
    to: '/profil',
    label: 'Profil Saya',
    description: 'Data Pasien & Akun',
    bgClass: 'bg-rose-50 text-rose-600',
    iconClass: 'text-rose-600',
    iconComponent: createIcon(['M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2', 'M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z'])
  }
]

const displayedMenus = computed(() => {
  return authStore.isAuthenticated ? allMenus : publicMenus
})
</script>
