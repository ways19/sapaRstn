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

      <!-- Menu Grid: Frameless modern icon-first layout (4 kolom konsisten 12 menu) -->
      <div
        class="grid grid-cols-4 gap-y-5 gap-x-2 sm:gap-y-6 sm:gap-x-4 py-2"
      >
        <router-link
          v-for="menu in displayedMenus"
          :key="menu.to"
          :to="menu.to"
          class="group flex flex-col items-center text-center justify-start gap-2 py-1 px-1 active:scale-95 transition-transform"
        >
          <!-- Icon Tile (Squircle Modern) -->
          <div
            class="w-[58px] h-[58px] sm:w-[66px] sm:h-[66px] rounded-[22px] flex items-center justify-center transition-all duration-200 group-hover:scale-105 group-hover:shadow-md shadow-xs"
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
            class="text-[11px] sm:text-xs font-medium text-slate-800 group-hover:text-emerald-700 transition-colors leading-tight text-center max-w-[80px]"
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

// Helper pembentuk komponen SVG kustom presisi tinggi
function createSvgIcon(elements, customViewBox = '0 0 24 24') {
  return {
    render() {
      return h('svg', {
        viewBox: customViewBox,
        fill: 'none',
        stroke: 'currentColor',
        'stroke-width': '1.8',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        class: 'w-6 h-6 sm:w-7 sm:h-7'
      }, elements)
    }
  }
}

// 1. Daftar Online: Dokumen dengan badge lingkaran tambah (+) di sudut kanan bawah
const iconDaftarOnline = createSvgIcon([
  h('path', { d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h5' }),
  h('path', { d: 'M14 2v5h5' }),
  h('path', { d: 'M7 9h7' }),
  h('path', { d: 'M7 13h4' }),
  h('circle', { cx: '17', cy: '17', r: '4', stroke: 'currentColor', 'stroke-width': '1.8' }),
  h('path', { d: 'M17 15v4' }),
  h('path', { d: 'M15 17h4' })
])

// 2. Jadwal Dokter: Kalender dengan binder rings dan badge lingkaran jam
const iconJadwalDokter = createSvgIcon([
  h('path', { d: 'M8 2v3' }),
  h('path', { d: 'M16 2v3' }),
  h('path', { d: 'M20 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7' }),
  h('path', { d: 'M22 11V6a2 2 0 0 0-2-2' }),
  h('path', { d: 'M2 9h20' }),
  h('path', { d: 'M6.5 13h.01' }),
  h('path', { d: 'M10.5 13h.01' }),
  h('path', { d: 'M6.5 17h.01' }),
  h('circle', { cx: '17', cy: '17', r: '4', stroke: 'currentColor', 'stroke-width': '1.8' }),
  h('path', { d: 'M17 15.2v2l1.5.8' })
])

// 3. Reservasi: Clipboard berkas dengan centang dan badge lingkaran centang
const iconReservasi = createSvgIcon([
  h('path', { d: 'M9 3H7a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h5' }),
  h('path', { d: 'M15 3h2a2 2 0 0 1 2 2v6' }),
  h('rect', { x: '9', y: '2', width: '6', height: '3', rx: '1' }),
  h('path', { d: 'M8 11.5l2 2 4.5-4.5' }),
  h('circle', { cx: '17', cy: '17', r: '4', stroke: 'currentColor', 'stroke-width': '1.8' }),
  h('path', { d: 'M15.5 17l1 1 2-2' })
])

// 4. e-Consent: Perisai pelindung dengan badge lingkaran centang
const iconEConsent = createSvgIcon([
  h('path', { d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' }),
  h('circle', { cx: '12', cy: '11.5', r: '3.6', stroke: 'currentColor', 'stroke-width': '1.6' }),
  h('path', { d: 'M10.7 11.5l1 1 1.8-1.8' })
])

// 5. Antrean Apotek: Botol obat/sirup dengan tutup dan lambang palang farmasi
const iconAntreanApotek = createSvgIcon([
  h('rect', { x: '8.5', y: '2', width: '7', height: '2.5', rx: '1' }),
  h('rect', { x: '5', y: '6.5', width: '14', height: '15', rx: '3.5' }),
  h('path', { d: 'M12 10.5v6' }),
  h('path', { d: 'M9 13.5h6' }),
  h('path', { d: 'M15.5 4.5l3.2 2.2' })
])

// 6. Radiologi: Kotak frame sinar-X dengan radiasi sinar 8 arah
const iconRadiologi = createSvgIcon([
  h('rect', { x: '3', y: '3', width: '18', height: '18', rx: '4.5' }),
  h('circle', { cx: '12', cy: '12', r: '2.8' }),
  h('path', { d: 'M12 5.5v2.2' }),
  h('path', { d: 'M12 16.3v2.2' }),
  h('path', { d: 'M5.5 12h2.2' }),
  h('path', { d: 'M16.3 12h2.2' }),
  h('path', { d: 'M7.5 7.5l1.6 1.6' }),
  h('path', { d: 'M14.9 14.9l1.6 1.6' }),
  h('path', { d: 'M7.5 16.5l1.6-1.6' }),
  h('path', { d: 'M14.9 9.1l1.6-1.6' })
])

// 7. Laboratorium: Tabung Erlenmeyer reaksi kimia & level cairan
const iconLaboratorium = createSvgIcon([
  h('path', { d: 'M9 3h6' }),
  h('path', { d: 'M10 3v5.5L4.8 18.2A2 2 0 0 0 6.5 21h11a2 2 0 0 0 1.7-2.8L14 8.5V3' }),
  h('path', { d: 'M7.2 15h9.6' }),
  h('circle', { cx: '9.8', cy: '17.8', r: '0.8', fill: 'currentColor' }),
  h('circle', { cx: '14.2', cy: '16.8', r: '0.8', fill: 'currentColor' })
])

// 8. Resume Medis: Map berkas rekam medis dengan lambang palang kesehatan
const iconResumeMedis = createSvgIcon([
  h('path', { d: 'M3 7v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-7l-2-2H5a2 2 0 0 0-2 2z' }),
  h('circle', { cx: '13', cy: '14.5', r: '3.6', stroke: 'currentColor', 'stroke-width': '1.6' }),
  h('path', { d: 'M13 12.8v3.4' }),
  h('path', { d: 'M11.3 14.5h3.4' })
])

// 9. Tagihan: Lembar bukti tagihan/kuitansi berigi dengan koin "Rp"
const iconTagihan = {
  render() {
    return h('svg', {
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '1.8',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      class: 'w-6 h-6 sm:w-7 sm:h-7'
    }, [
      h('path', { d: 'M14 2H6a2 2 0 0 0-2 2v16l2.5-1.5L9 20l2.5-1.5V13' }),
      h('path', { d: 'M14 2v5h5' }),
      h('path', { d: 'M19 7v6' }),
      h('path', { d: 'M7 8h4' }),
      h('path', { d: 'M7 12h2' }),
      h('circle', { cx: '16.5', cy: '16.5', r: '4.5', stroke: 'currentColor', 'stroke-width': '1.8' }),
      h('text', {
        x: '16.5',
        y: '18.1',
        'text-anchor': 'middle',
        'font-size': '4.2',
        'font-family': 'sans-serif',
        'font-weight': 'bold',
        fill: 'currentColor',
        stroke: 'none'
      }, 'Rp')
    ])
  }
}

// 10. Info Kamar: Tempat tidur rawat inap dengan bantal dan tiang infus
const iconInfoKamar = createSvgIcon([
  h('path', { d: 'M2 13v6' }),
  h('path', { d: 'M18 14v5' }),
  h('path', { d: 'M2 15h16' }),
  h('path', { d: 'M5 12.5a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1.5H5v-1.5z' }),
  h('path', { d: 'M10 13v-1a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2' }),
  h('path', { d: 'M21 5v14' }),
  h('path', { d: 'M19.5 5h3' }),
  h('rect', { x: '20', y: '7', width: '2', height: '2.5', rx: '0.5' })
])

// 11. Edukasi: Buku terbuka dengan pita pembatas bacaan
const iconEdukasi = createSvgIcon([
  h('path', { d: 'M12 20V7' }),
  h('path', { d: 'M12 20c-2.5-1.5-6-1.5-9 0V6c3-1.5 6.5-1.5 9 0' }),
  h('path', { d: 'M12 20c2.5-1.5 6-1.5 9 0V6c-3-1.5-6.5-1.5-9 0' }),
  h('path', { d: 'M10.2 3.8l1.8 2 1.8-2' })
])

// 12. Profil: Ikon profil pengguna / avatar akun pasien
const iconProfil = createSvgIcon([
  h('path', { d: 'M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2' }),
  h('circle', { cx: '12', cy: '7', r: '4' })
])

// Ikon Lainnya: Grid 2x2 persegi membulat (opsional / cadangan)
const iconLainnya = {
  render() {
    return h('svg', {
      viewBox: '0 0 24 24',
      fill: 'currentColor',
      class: 'w-6 h-6 sm:w-7 sm:h-7'
    }, [
      h('rect', { x: '4', y: '4', width: '6', height: '6', rx: '2' }),
      h('rect', { x: '14', y: '4', width: '6', height: '6', rx: '2' }),
      h('rect', { x: '4', y: '14', width: '6', height: '6', rx: '2' }),
      h('rect', { x: '14', y: '14', width: '6', height: '6', rx: '2' })
    ])
  }
}

// 12 Menu Utama Sesuai Desain Grid Modern SAPA RSTN
const allMenus = [
  {
    to: '/daftar-online',
    label: 'Daftar Online',
    description: 'Poli Rawat Jalan',
    bgClass: 'bg-emerald-500/10 border border-emerald-300/50 text-emerald-600',
    iconClass: 'text-emerald-600',
    iconComponent: iconDaftarOnline
  },
  {
    to: '/jadwal-dokter',
    label: 'Jadwal Dokter',
    description: 'Praktik Dokter Spesialis & Kuota',
    bgClass: 'bg-sky-500/10 border border-sky-300/50 text-sky-600',
    iconClass: 'text-sky-600',
    iconComponent: iconJadwalDokter
  },
  {
    to: '/riwayat-reservasi',
    label: 'Reservasi',
    description: 'Histori & Tiket',
    bgClass: 'bg-emerald-500/10 border border-emerald-300/50 text-emerald-600',
    iconClass: 'text-emerald-600',
    iconComponent: iconReservasi
  },
  {
    to: '/e-consent',
    label: 'e-Consent',
    description: 'Persetujuan Medis',
    bgClass: 'bg-teal-500/10 border border-teal-300/50 text-teal-600',
    iconClass: 'text-teal-600',
    iconComponent: iconEConsent
  },
  {
    to: '/antrian-farmasi',
    label: 'Antrean Apotek',
    description: 'Antrean Obat',
    bgClass: 'bg-blue-500/10 border border-blue-300/50 text-blue-600',
    iconClass: 'text-blue-600',
    iconComponent: iconAntreanApotek
  },
  {
    to: '/hasil-radiologi',
    label: 'Radiologi',
    description: 'Hasil Rontgen & USG',
    bgClass: 'bg-purple-500/10 border border-purple-300/50 text-purple-600',
    iconClass: 'text-purple-600',
    iconComponent: iconRadiologi
  },
  {
    to: '/hasil-laboratorium',
    label: 'Laboratorium',
    description: 'Hasil Tes & Darah',
    bgClass: 'bg-teal-500/10 border border-teal-300/50 text-teal-600',
    iconClass: 'text-teal-600',
    iconComponent: iconLaboratorium
  },
  {
    to: '/resume-medis',
    label: 'Resume Medis',
    description: 'Rawat Inap',
    bgClass: 'bg-sky-500/10 border border-sky-300/50 text-sky-600',
    iconClass: 'text-sky-600',
    iconComponent: iconResumeMedis
  },
  {
    to: '/tagihan-umum',
    label: 'Tagihan',
    description: 'Tagihan Pasien',
    bgClass: 'bg-amber-500/10 border border-amber-300/50 text-amber-600',
    iconClass: 'text-amber-600',
    iconComponent: iconTagihan
  },
  {
    to: '/info-tempat-tidur',
    label: 'Info Kamar',
    description: 'Ketersediaan Kamar Inap',
    bgClass: 'bg-teal-500/10 border border-teal-300/50 text-teal-600',
    iconClass: 'text-teal-600',
    iconComponent: iconInfoKamar
  },
  {
    to: '/edukasi',
    label: 'Edukasi',
    description: 'Informasi & Tips Kesehatan',
    bgClass: 'bg-indigo-500/10 border border-indigo-300/50 text-indigo-600',
    iconClass: 'text-indigo-600',
    iconComponent: iconEdukasi
  },
  {
    to: '/profil',
    label: 'Profile',
    description: 'Data Pasien & Akun',
    bgClass: 'bg-teal-500/10 border border-teal-300/50 text-teal-600',
    iconClass: 'text-teal-600',
    iconComponent: iconProfil
  }
]

// Seluruh 12 menu selalu ditampilkan agar tata letak 4 kolom (3 baris) selalu rapi & simetris
const displayedMenus = computed(() => allMenus)
</script>
