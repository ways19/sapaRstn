<template>
  <div class="min-h-screen bg-slate-50 py-6 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center font-sans antialiased">
    <!-- Container Utama -->
    <div class="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      
      <!-- Header Kop Rumah Sakit -->
      <div class="bg-gradient-to-r from-emerald-800 to-teal-700 text-white px-6 py-5 text-center relative shadow-sm">
        <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm mb-2 border border-white/20">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h1 class="text-base sm:text-lg font-extrabold uppercase tracking-wide">RSUD R.A.A. TJOKRONEGORO</h1>
        <p class="text-xs text-emerald-100 font-medium">Kabupaten Purworejo, Jawa Tengah</p>
        <div class="mt-2 inline-block px-3 py-0.5 rounded-full bg-emerald-900/60 text-[11px] font-semibold tracking-wider text-emerald-200 uppercase border border-emerald-400/30">
          Verifikasi Tanda Tangan Elektronik (TTE)
        </div>
      </div>

      <!-- State: Loading -->
      <div v-if="loading" class="p-10 text-center">
        <div class="inline-block animate-spin rounded-full h-10 w-10 border-4 border-emerald-600 border-t-transparent mb-4"></div>
        <p class="text-sm font-semibold text-slate-700">Memverifikasi keaslian dokumen...</p>
        <p class="text-xs text-slate-400 mt-1">Menghubungkan ke server SIMGoS RSUD R.A.A. Tjokronegoro</p>
      </div>

      <!-- State: Error / Dokumen Tidak Valid -->
      <div v-else-if="error || !dataDoc || !dataDoc.valid" class="p-6 sm:p-8 text-center">
        <div class="w-14 h-14 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 class="text-base font-bold text-slate-800">Verifikasi Gagal</h2>
        <p class="text-xs text-slate-600 mt-2 max-w-md mx-auto">
          {{ errorMsg || 'Dokumen medis tidak ditemukan atau belum terdaftar resmi dalam sistem rekam medis elektronik RSUD R.A.A. Tjokronegoro.' }}
        </p>
        <div class="mt-6">
          <router-link to="/" class="inline-flex items-center px-4 py-2 border border-slate-300 text-xs font-semibold rounded-lg text-slate-700 bg-white hover:bg-slate-50 transition">
            Kembali ke Beranda
          </router-link>
        </div>
      </div>

      <!-- State: Berhasil Terverifikasi -->
      <div v-else class="p-5 sm:p-6 space-y-5">
        
        <!-- Status Banner -->
        <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3.5">
          <div class="w-11 h-11 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div class="min-w-0">
            <div class="flex items-center gap-2">
              <span class="text-xs sm:text-sm font-extrabold text-emerald-900 uppercase">DOKUMEN ASLI & SAH</span>
              <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-200 text-emerald-800">TTE Terverifikasi</span>
            </div>
            <p class="text-[11px] sm:text-xs text-emerald-700 mt-0.5 leading-snug">
              Dokumen rekam medis elektronik ini tersimpan resmi dan sah di RSUD R.A.A Tjokronegoro.
            </p>
          </div>
        </div>

        <!-- Judul Dokumen -->
        <div class="text-center border-b border-slate-100 pb-3">
          <span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Jenis Dokumen Medis</span>
          <h2 class="text-sm sm:text-base font-extrabold text-slate-800 mt-0.5 uppercase">
            {{ dataDoc.judul_dokumen || 'DOKUMEN REKAM MEDIS ELEKTRONIK' }}
          </h2>
        </div>

        <!-- Tabel Detail Metadata Keabsahan -->
        <div class="bg-slate-50/70 border border-slate-200 rounded-xl divide-y divide-slate-200 text-xs text-slate-700">
          
          <!-- Data Pasien -->
          <div class="p-3 sm:p-3.5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
            <span class="text-slate-500 font-medium">Nama Pasien:</span>
            <span class="font-bold text-slate-900 text-sm">{{ dataDoc.nama_pasien || '-' }}</span>
          </div>

          <div class="p-3 sm:p-3.5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
            <span class="text-slate-500 font-medium">Nomor Rekam Medis (NORM):</span>
            <span class="font-mono font-bold text-slate-900 bg-slate-200/60 px-2 py-0.5 rounded">{{ dataDoc.norm || '-' }}</span>
          </div>

          <div class="p-3 sm:p-3.5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
            <span class="text-slate-500 font-medium">Nomor Registrasi / Kunjungan:</span>
            <span class="font-mono font-bold text-slate-900">{{ dataDoc.nopen || '-' }}</span>
          </div>

          <!-- Penandatangan -->
          <div class="p-3 sm:p-3.5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
            <span class="text-slate-500 font-medium">Penandatangan:</span>
            <span class="font-bold text-slate-900">
              {{ dataDoc.penanggung_jawab || '-' }} 
              <span v-if="dataDoc.hubungan" class="font-normal text-slate-500">({{ dataDoc.hubungan }})</span>
            </span>
          </div>

          <!-- Waktu Tanda Tangan -->
          <div class="p-3 sm:p-3.5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
            <span class="text-slate-500 font-medium">Waktu Tanda Tangan:</span>
            <span class="font-semibold text-slate-800">
              {{ formatWaktu(dataDoc.tanggal_persetujuan) }}
            </span>
          </div>

          <!-- Petugas / Dokter Pengesah -->
          <div class="p-3 sm:p-3.5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
            <span class="text-slate-500 font-medium">Petugas / Dokter Pengesah:</span>
            <span class="font-semibold text-slate-800">{{ dataDoc.petugas || 'Petugas RSUD' }}</span>
          </div>

          <!-- UUID & Hash Integritas Kriptografi -->
          <div class="p-3 sm:p-3.5 space-y-1">
            <div class="flex justify-between items-center text-[11px] text-slate-500">
              <span>Nomor Seri Dokumen (UUID):</span>
              <span class="font-mono font-bold text-slate-700 select-all">{{ dataDoc.doc_uuid || '-' }}</span>
            </div>
            <div class="text-[10px] text-slate-500 break-all">
              <span class="font-medium text-slate-400">SHA-256 Checksum: </span>
              <span class="font-mono text-slate-600 select-all">{{ dataDoc.hash_sha256 || '-' }}</span>
            </div>
          </div>
        </div>

        <!-- Catatan Kerahasiaan & Legal -->
        <div class="bg-amber-50 border border-amber-200/80 rounded-xl p-3.5 text-[11px] text-amber-900 leading-relaxed space-y-1.5">
          <div class="flex items-center gap-1.5 font-semibold text-amber-900">
            <svg class="w-4 h-4 text-amber-700 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Informasi Keabsahan Dokumen Medis:</span>
          </div>
          <p class="text-amber-800">
            Halaman ini memvalidasi keaslian tanda tangan elektronik pada lembar fisik dokumen rekam medis RSUD R.A.A. Tjokronegoro. Berkas digital asli hanya dapat diakses oleh pasien yang bersangkutan melalui portal resmi SAPA RSTN demi menjamin kerahasiaan rekam medis sesuai amanat Permenkes No. 24 Tahun 2022 dan UU ITE.
          </p>
        </div>

      </div>

      <!-- Footer Info -->
      <div class="bg-slate-100 border-t border-slate-200 px-6 py-3 text-center text-[11px] text-slate-500">
        &copy; 2026 RSUD R.A.A. Tjokronegoro Purworejo &bull; Sistem SAPA RSTN
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { verifyService } from '../services/verify'

const route = useRoute()

const loading = ref(true)
const error = ref(false)
const errorMsg = ref('')
const dataDoc = ref(null)

const docUUID = computed(() => {
  return route.params.uuid || ''
})

function formatWaktu(val) {
  if (!val) return '-'
  try {
    const parts = val.split(' ')
    if (parts.length >= 2) {
      const [tgl, jam] = parts
      const [y, m, d] = tgl.split('-')
      const jamBersih = jam.length >= 5 ? jam.substring(0, 5) : jam
      const bulanNama = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
      const bIdx = parseInt(m, 10) - 1
      const bStr = bulanNama[bIdx] || m
      return `${parseInt(d, 10)} ${bStr} ${y} Pukul ${jamBersih} WIB`
    }
  } catch (e) {
    // Abaikan error format
  }
  return val
}

async function fetchVerification() {
  const uuid = docUUID.value
  if (!uuid) {
    loading.value = false
    error.value = true
    errorMsg.value = 'UUID dokumen tidak ditemukan pada tautan.'
    return
  }

  loading.value = true
  error.value = false
  errorMsg.value = ''

  try {
    const res = await verifyService.verifyDocument(uuid)
    if (res && res.valid) {
      dataDoc.value = res
    } else {
      error.value = true
      errorMsg.value = res?.message || 'Dokumen belum disahkan atau status tidak valid.'
    }
  } catch (err) {
    error.value = true
    const msg = err.response?.data?.message
    if (msg) {
      errorMsg.value = msg
    } else {
      errorMsg.value = 'Dokumen tidak ditemukan atau gagal terhubung ke server verifikasi RSUD.'
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchVerification()
})
</script>
