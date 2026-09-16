<template>
  <div class="max-w-4xl mx-auto space-y-6" style="animation: fade-in 0.3s ease-out;">
    <!-- Banner -->
    <div class="bg-gradient-to-r from-teal-600 via-emerald-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg shadow-teal-950/10 relative overflow-hidden">
      <div class="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
      <div class="relative z-10">
        <h2 class="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">Edukasi Kesehatan Pasien</h2>
        <p class="text-teal-100/90 text-xs sm:text-sm mt-1 max-w-xl">
          Pusat informasi, artikel medis, tips pola hidup sehat, dan panduan perawatan dari tenaga medis RSUD R.A.A. Tjokronegoro.
        </p>
      </div>
    </div>

    <!-- Under Development Card -->
    <div class="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-sm text-center flex flex-col items-center justify-center space-y-4">
      <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-teal-50 text-teal-600 flex items-center justify-center shadow-inner">
        <svg class="w-10 h-10 sm:w-12 sm:h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/>
          <path d="M6 6h10"/>
          <path d="M6 10h10"/>
          <path d="M6 14h6"/>
        </svg>
      </div>

      <div class="space-y-1.5 max-w-md">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200">
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          Fitur Dalam Pengembangan
        </div>
        <h3 class="text-lg sm:text-xl font-bold text-gray-800">Modul Edukasi Kesehatan Sedang Disiapkan</h3>
        <p class="text-xs sm:text-sm text-gray-500 leading-relaxed">
          Kami sedang menyiapkan artikel kesehatan terpercaya, video edukasi dokter spesialis, serta panduan praktis penanganan pertama untuk pasien dan keluarga.
        </p>
      </div>

      <!-- Preview topics planned -->
      <div class="w-full max-w-lg pt-4 border-t border-gray-100">
        <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Topik Yang Akan Hadir:</p>
        <div class="grid grid-cols-2 gap-2 text-left">
          <div class="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-2.5">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span class="text-xs font-medium text-gray-700">Pola Makan & Gizi Seimbang</span>
          </div>
          <div class="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-2.5">
            <span class="w-2 h-2 rounded-full bg-blue-500"></span>
            <span class="text-xs font-medium text-gray-700">Pencegahan Penyakit Jantung</span>
          </div>
          <div class="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-2.5">
            <span class="w-2 h-2 rounded-full bg-amber-500"></span>
            <span class="text-xs font-medium text-gray-700">Kesehatan Ibu & Tumbuh Kembang Anak</span>
          </div>
          <div class="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-2.5">
            <span class="w-2 h-2 rounded-full bg-purple-500"></span>
            <span class="text-xs font-medium text-gray-700">Tips Penggunaan Obat Rasional</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
