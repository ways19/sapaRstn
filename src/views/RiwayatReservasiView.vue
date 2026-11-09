<template>
  <div class="max-w-4xl mx-auto space-y-4 sm:space-y-5" style="animation: fade-in 0.3s ease-out;">
    <!-- 1 Card Terpadu: Header Riwayat Reservasi + Integrasi BPJS Mobile JKN -->
    <div class="bg-gradient-to-br from-emerald-800 via-teal-800 to-emerald-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white shadow-md relative overflow-hidden space-y-3.5 sm:space-y-4">
      <!-- Dekorasi blur background modern -->
      <div class="absolute -right-10 -bottom-10 w-52 h-52 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
      <div class="absolute -left-12 -top-12 w-44 h-44 bg-emerald-400/15 rounded-full blur-2xl pointer-events-none"></div>

      <!-- Bagian Atas Card: Judul Halaman & Tombol Aksi (Refresh & Daftar Baru) -->
      <div class="relative z-10 flex items-center justify-between gap-2.5">
        <div class="space-y-0.5 min-w-0">
          <h2 class="text-lg sm:text-2xl font-black text-white tracking-tight truncate">Riwayat Reservasi</h2>
          <p class="text-[11px] sm:text-xs text-emerald-100/90 font-medium line-clamp-1">
            Jadwal pendaftaran umum & kontrol ulang BPJS
          </p>
        </div>

        <div class="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <!-- Tombol Refresh -->
          <button
            type="button"
            @click="refreshAll"
            :disabled="loading || bpjsLoading"
            class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-white/15 hover:bg-white/25 text-white border border-white/20 shadow-xs flex items-center justify-center transition-all active:scale-95 cursor-pointer disabled:opacity-50"
            title="Segarkan Riwayat"
          >
            <svg class="w-4 h-4" :class="loading || bpjsLoading ? 'animate-spin text-white' : ''" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
            </svg>
          </button>

          <!-- Tombol Daftar Baru (Rapih & tanpa double plus) -->
          <router-link
            to="/daftar-online"
            class="px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-white hover:bg-emerald-50 text-emerald-900 font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center gap-1.5 active:scale-95 shrink-0"
          >
            <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            <span>Daftar Baru</span>
          </router-link>
        </div>
      </div>

      <!-- Garis Pemisah Halus Elegan -->
      <div class="relative z-10 border-t border-white/15"></div>

      <!-- Bagian Bawah Card: Integrasi BPJS Kesehatan -->
      <div class="relative z-10 space-y-3">
        <!-- Header Info BPJS -->
        <div class="flex items-center justify-between gap-3">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/20 backdrop-blur-md border border-white/25 flex items-center justify-center shrink-0 shadow-xs">
              <svg class="w-4 h-4 sm:w-5 sm:h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-xs sm:text-sm font-extrabold text-white tracking-wide uppercase">INTEGRASI BPJS KESEHATAN</h3>
            </div>
          </div>

          <span class="px-2 py-0.5 rounded-full bg-emerald-500/30 text-[9px] sm:text-[10px] font-black text-emerald-100 uppercase tracking-wider border border-emerald-300/40 backdrop-blur-md shrink-0">
            RESMI
          </span>
        </div>

        <!-- Deskripsi Banner BPJS -->
        <p class="text-xs sm:text-[13px] text-emerald-100/95 leading-relaxed">
          Reservasi kontrol ulang untuk pasien BPJS Kesehatan / JKN dapat langsung dilakukan melalui aplikasi Mobile JKN.
        </p>

        <!-- Aksi Banner: Buka Mobile JKN & Info Rujukan BPJS -->
        <div class="flex items-center gap-3 pt-0.5 flex-wrap">
          <a
            :href="mobileJknUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="px-3.5 py-1.5 sm:py-2 rounded-xl bg-white text-emerald-900 font-extrabold text-xs shadow-xs hover:bg-emerald-50 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer border border-white/80"
            title="Buka aplikasi Mobile JKN"
          >
            <span>Buka Mobile JKN</span>
            <svg class="w-3.5 h-3.5 text-emerald-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>

          <button
            type="button"
            @click="showBpjsInfoModal = true"
            class="text-xs font-semibold text-emerald-100 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer py-1"
          >
            <svg class="w-4 h-4 text-emerald-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
            <span>Info Rujukan BPJS</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading && sortedReservasiList.length === 0" class="py-14 text-center flex flex-col items-center justify-center gap-2 text-slate-400 bg-white rounded-3xl border border-slate-100 shadow-xs">
      <svg class="w-8 h-8 animate-spin text-teal-600" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" class="opacity-25"/>
        <path d="M4 12a8 8 0 018-8" stroke="currentColor" stroke-width="3" stroke-linecap="round" class="opacity-75"/>
      </svg>
      <span class="text-xs font-semibold">Memuat riwayat reservasi...</span>
    </div>

    <!-- Daftar Kartu Reservasi Terpadu (Urutan: Hari H Paling Atas -> Terdekat Pelayanan -> Sudah Terlewat/Selesai) -->
    <div v-else-if="sortedReservasiList.length > 0" class="space-y-3.5">
      <div
        v-for="item in sortedReservasiList"
        :key="item.kodeBooking"
        @click="openDetailModal(item)"
        class="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 cursor-pointer space-y-3.5 group active:scale-[0.99]"
      >
        <!-- Baris Atas: Antrean Squircle + Info Poli, Dokter & Waktu -->
        <div class="flex items-start gap-3.5">
          <!-- Squircle Nomor Antrean -->
          <div
            :class="[
              'w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex flex-col items-center justify-center shrink-0 border transition-transform group-hover:scale-102',
              isExpired(item.TANGGALKUNJUNGAN, item.JAM_PRAKTEK) && !isHariIni(item.TANGGALKUNJUNGAN)
                ? 'bg-slate-100 border-slate-200/80 text-slate-700'
                : item.isBpjs
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-teal-50 border-teal-200 text-teal-950'
            ]"
          >
            <span
              class="text-[9px] font-bold uppercase tracking-wider leading-none"
              :class="
                isExpired(item.TANGGALKUNJUNGAN, item.JAM_PRAKTEK) && !isHariIni(item.TANGGALKUNJUNGAN)
                  ? 'text-slate-400'
                  : item.isBpjs
                    ? 'text-emerald-700'
                    : 'text-teal-700'
              "
            >
              ANTREAN
            </span>
            <span class="text-xl sm:text-2xl font-black tracking-tight leading-tight mt-0.5">
              {{ item.NOMOR_ANTRIAN || '-' }}
            </span>
          </div>

          <!-- Info Tengah: Nama Poli, Badge BPJS/Umum, Dokter, Tanggal -->
          <div class="flex-1 min-w-0 space-y-1">
            <div class="flex items-center justify-between gap-2">
              <h4 class="text-sm sm:text-base font-bold text-slate-800 truncate group-hover:text-teal-700 transition-colors">
                {{ item.namaPoli }}
              </h4>

              <!-- Badge BPJS vs UMUM -->
              <span
                v-if="item.isBpjs"
                class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 inline-flex items-center gap-1 shrink-0"
              >
                <svg class="w-3 h-3 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <span>BPJS</span>
              </span>
              <span
                v-else
                class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200 inline-flex items-center gap-1 shrink-0"
              >
                <svg class="w-3 h-3 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
                </svg>
                <span>UMUM</span>
              </span>
            </div>

            <!-- Dokter -->
            <p class="text-xs text-slate-600 font-semibold truncate">
              {{ item.namaDokter || '-' }}
            </p>

            <!-- Jadwal Pelayanan (🗓️ Hari ini / Nama Hari + Jam) -->
            <div class="flex items-center gap-1.5 text-xs text-slate-500 pt-0.5">
              <svg class="w-3.5 h-3.5 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span class="truncate font-medium">
                {{ formatJadwalDisplay(item.TANGGALKUNJUNGAN, item.JAM_PRAKTEK || item.ESTIMASI_PELAYANAN) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Detail Box Tengah: Kode Booking & Status / Surat Kontrol / Biaya -->
        <div class="p-3 rounded-xl bg-slate-50/80 border border-slate-100 text-xs space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-slate-400 font-medium">
              {{ item.isBpjs ? 'Kode Booking:' : 'Kode Reservasi:' }}
            </span>
            <span class="font-mono font-bold text-slate-800 tracking-wide">
              {{ item.kodeBooking || item.ID }}
            </span>
          </div>

          <div class="flex items-center justify-between">
            <!-- 1. BPJS dengan Nomor Surat Kontrol Resmi -->
            <template v-if="item.isBpjs && item.NO_REF_BPJS">
              <span class="text-slate-400 font-medium">No. Surat Kontrol:</span>
              <span class="font-mono font-bold text-emerald-700">{{ item.NO_REF_BPJS }}</span>
            </template>
            <!-- 2. BPJS Terbit & Aktif -->
            <template v-else-if="item.isBpjs">
              <span class="text-slate-400 font-medium">Surat Kontrol:</span>
              <span class="font-bold text-emerald-700 flex items-center gap-1">
                <svg class="w-3.5 h-3.5 text-emerald-600 inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Terbit & Aktif</span>
              </span>
            </template>
            <!-- 3. UMUM Aktif / Mendatang -->
            <template v-else-if="!isExpired(item.TANGGALKUNJUNGAN, item.JAM_PRAKTEK) || isHariIni(item.TANGGALKUNJUNGAN)">
              <span class="text-slate-400 font-medium">Biaya Registrasi:</span>
              <span class="font-bold text-emerald-700">Rp 45.000 (Kasir / QRIS)</span>
            </template>
            <!-- 4. Selesai / Terlewat -->
            <template v-else>
              <span class="text-slate-400 font-medium">Status Reservasi:</span>
              <span class="font-semibold text-slate-500">Selesai Pelayanan (Lalu)</span>
            </template>
          </div>
        </div>

        <!-- Tombol Aksi Bawah: Lihat Tiket (+ Batal jika UMUM Mendatang) -->
        <div>
          <!-- Case 1: UMUM Mendatang yang bisa dibatalkan -->
          <div v-if="!item.isBpjs && canCancel(item.TANGGALKUNJUNGAN)" class="flex items-center gap-2">
            <button
              type="button"
              @click.stop="openDetailModal(item)"
              class="flex-1 py-2.5 px-4 rounded-xl bg-[#005f56] hover:bg-[#004d46] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.99] cursor-pointer"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
              </svg>
              <span>Lihat Tiket</span>
            </button>
            <button
              type="button"
              @click.stop="confirmCancel(item)"
              :disabled="cancellingId === item.kodeBooking"
              class="px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-100/80 hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-slate-700 font-bold text-xs transition-all active:scale-[0.99] cursor-pointer shrink-0"
            >
              <span>{{ cancellingId === item.kodeBooking ? '...' : 'Batal' }}</span>
            </button>
          </div>

          <!-- Case 2: BPJS (Aktif / Hari Ini) -->
          <button
            v-else-if="item.isBpjs"
            type="button"
            @click.stop="openDetailModal(item)"
            class="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.99] cursor-pointer"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
            </svg>
            <span>Lihat Tiket</span>
          </button>

          <!-- Case 3: UMUM Hari Ini (Aktif tapi tidak bisa dibatalkan) -->
          <button
            v-else-if="!isExpired(item.TANGGALKUNJUNGAN, item.JAM_PRAKTEK) || isHariIni(item.TANGGALKUNJUNGAN)"
            type="button"
            @click.stop="openDetailModal(item)"
            class="w-full py-2.5 px-4 rounded-xl bg-[#005f56] hover:bg-[#004d46] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.99] cursor-pointer"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
            </svg>
            <span>Lihat Tiket</span>
          </button>

          <!-- Case 4: Sudah Terlewat / Selesai -->
          <button
            v-else
            type="button"
            @click.stop="openDetailModal(item)"
            class="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer"
          >
            <svg class="w-4 h-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
            </svg>
            <span>Lihat Tiket</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Empty History Card -->
    <div
      v-else
      class="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xs text-center flex flex-col items-center justify-center space-y-4"
    >
      <div class="w-16 h-16 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center">
        <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
          <path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>
        </svg>
      </div>
      <div class="space-y-1 max-w-sm">
        <h3 class="text-base font-bold text-slate-800">Belum Ada Riwayat Reservasi</h3>
        <p class="text-xs text-slate-400">
          Anda belum memiliki jadwal reservasi atau rencana kontrol aktif.
        </p>
      </div>
      <router-link
        to="/daftar-online"
        class="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#005f56] text-white text-xs font-bold hover:bg-[#004d46] transition-colors shadow-xs active:scale-95"
      >
        <span>Daftar Kunjungan Sekarang</span>
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
      </router-link>
    </div>

    <!-- Bottom Help Card (Sesuai Desain: Butuh Bantuan Check-in?) -->
    <div
      @click="showApmHelpModal = true"
      class="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between gap-3 cursor-pointer hover:border-emerald-300 transition-all active:scale-[0.99]"
    >
      <div class="flex items-center gap-3 min-w-0">
        <div class="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 font-bold">
          <svg class="w-5 h-5 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </div>
        <div class="min-w-0">
          <h4 class="text-xs sm:text-sm font-bold text-slate-800 truncate">Butuh Bantuan Check-in?</h4>
          <p class="text-[11px] text-slate-400 truncate">Panduan mesin anjungan mandiri & validasi antrean di RSUD</p>
        </div>
      </div>
      <svg class="w-4 h-4 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    </div>

    <!-- Official Footer Badge -->
    <div class="text-center pt-1 pb-3">
      <p class="text-[11px] text-slate-400 flex items-center justify-center gap-1.5 font-medium">
        <svg class="w-3.5 h-3.5 text-teal-600 inline shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
        <span>Layanan Reservasi Resmi RSUD R.A.A. Tjokronegoro Purworejo</span>
      </p>
    </div>

    <!-- Modal Detail Tiket & Barcode / QR Code Scanner -->
    <Teleport to="body">
      <transition name="fade">
        <div
          v-if="selectedTicket"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <div class="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-7 shadow-2xl space-y-4 text-center" style="animation: scale-up 0.3s cubic-bezier(0.16, 1, 0.3, 1);">
            <!-- Modal Header -->
            <div class="flex items-center justify-between pb-3 border-b border-gray-100">
              <div class="text-left">
                <span class="text-[10px] font-bold uppercase tracking-wider" :class="selectedTicket.isBpjs ? 'text-emerald-700' : 'text-teal-700'">
                  {{ selectedTicket.isBpjs ? 'Tiket Kontrol BPJS' : 'Tiket Reservasi' }}
                </span>
                <h3 class="text-base sm:text-lg font-black text-gray-800">Bukti Pendaftaran Rawat Jalan</h3>
              </div>
              <button
                @click="selectedTicket = null"
                class="w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 cursor-pointer"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            <!-- Barcode / QR Section -->
            <div v-if="!isExpired(selectedTicket.TANGGALKUNJUNGAN, selectedTicket.JAM_PRAKTEK) || isHariIni(selectedTicket.TANGGALKUNJUNGAN)">
              <div v-if="ticketQrDataUrl" class="mx-auto inline-block p-3 rounded-2xl border border-gray-200 bg-white shadow-xs">
                <img :src="ticketQrDataUrl" alt="QR Pendaftaran" class="w-36 h-36 object-contain" />
              </div>
              <div v-else>
                <BookingBarcode :code="selectedTicket.kodeBooking" />
              </div>
            </div>
            <div v-else class="p-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-gray-500 font-medium">
              ⏱️ Tiket telah selesai / waktu kunjungan telah terlewat.
            </div>

            <!-- Ticket details info -->
            <div
              class="p-4 sm:p-5 rounded-2xl text-left space-y-2.5 text-xs border bg-emerald-50/60 border-emerald-100"
            >
              <div class="flex items-center justify-between pb-2 border-b border-emerald-100">
                <span class="text-emerald-800 font-bold">Nomor Antrian:</span>
                <span class="text-2xl font-black tracking-wider text-emerald-700">
                  {{ selectedTicket.NOMOR_ANTRIAN || '-' }}
                </span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-500">Kode Booking:</span>
                <span class="font-bold text-gray-800 font-mono text-sm">{{ selectedTicket.kodeBooking }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-500">Nama Pasien:</span>
                <span class="font-bold text-gray-800">{{ selectedTicket.NAMA || authStore.namaPasien }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-500">No. Rekam Medis:</span>
                <span class="font-bold text-gray-800">RM {{ selectedTicket.NORM || authStore.userNorm }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-500">Tanggal Kunjungan:</span>
                <span class="font-bold text-gray-800">{{ formatTglIndo(selectedTicket.TANGGALKUNJUNGAN) }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-500">Estimasi Pelayanan:</span>
                <span class="font-bold text-emerald-800 flex items-center gap-1 font-mono">
                  <svg class="w-3.5 h-3.5 text-emerald-600 inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                  <span>{{ formatEstimasiTiket(selectedTicket) }}</span>
                </span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-500">Poliklinik:</span>
                <span class="font-bold text-gray-800">{{ selectedTicket.namaPoli || '-' }}</span>
              </div>
              <div class="flex items-start justify-between gap-2">
                <span class="text-gray-500 shrink-0">Dokter Spesialis:</span>
                <span class="font-bold text-gray-800 text-right flex-1 break-words leading-snug">{{ selectedTicket.namaDokter || '-' }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-500">Penjamin:</span>
                <span class="font-bold text-emerald-700">
                  {{ selectedTicket.isBpjs ? 'BPJS Kesehatan (JKN)' : (selectedTicket.caraBayar || 'UMUM (Bayar Mandiri)') }}
                </span>
              </div>
              <div v-if="selectedTicket.isBpjs && selectedTicket.NO_REF_BPJS" class="flex items-center justify-between">
                <span class="text-gray-500">No. Surat Kontrol:</span>
                <span class="font-mono font-bold text-emerald-700">{{ selectedTicket.NO_REF_BPJS }}</span>
              </div>
              <div v-if="!selectedTicket.isBpjs" class="flex items-center justify-between">
                <span class="text-gray-500">Biaya Registrasi:</span>
                <span class="font-bold text-emerald-700">Rp 45.000 (Kasir / QRIS)</span>
              </div>
            </div>

            <!-- Ketentuan Kehadiran -->
            <div class="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/70 text-left text-xs text-amber-900 space-y-1">
              <p class="font-bold flex items-center gap-1.5 text-amber-800">
                <svg class="w-4 h-4 text-amber-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <span>Ketentuan Kehadiran:</span>
              </p>
              <p class="text-[11px] leading-relaxed text-amber-700">
                Pasien diharapkan hadir paling lambat <strong>15 menit sebelum jam operasional poli dimulai</strong> untuk melakukan konfirmasi di Mesin APM atau Loket Pendaftaran Rawat Jalan.
              </p>
            </div>

            <!-- Close button -->
            <button
              type="button"
              @click="selectedTicket = null"
              class="w-full py-3 px-4 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              Tutup Tiket
            </button>
          </div>
        </div>
      </transition>
    </Teleport>

    <!-- Modal Panduan Info Rujukan BPJS -->
    <Teleport to="body">
      <transition name="fade">
        <div
          v-if="showBpjsInfoModal"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <div class="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-7 shadow-2xl space-y-4 text-left" style="animation: scale-up 0.3s cubic-bezier(0.16, 1, 0.3, 1);">
            <div class="flex items-center justify-between pb-3 border-b border-gray-100">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <svg class="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <div>
                  <span class="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">Panduan Pelayanan</span>
                  <h3 class="text-base font-black text-slate-800">Alur Rujukan & Kontrol BPJS</h3>
                </div>
              </div>
              <button
                @click="showBpjsInfoModal = false"
                class="w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 cursor-pointer"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            <div class="space-y-3 text-xs text-slate-600 leading-relaxed">
              <div class="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200/80 text-emerald-950 space-y-1">
                <p class="font-bold flex items-center gap-1.5 text-emerald-800">
                  <span>1. Surat Rujukan Faskes 1</span>
                </p>
                <p class="text-[11px] text-emerald-900/90 leading-relaxed">
                  Pastikan surat rujukan dari Puskesmas/Klinik Anda masih berstatus aktif (berlaku maksimal 90 hari) sebelum berobat.
                </p>
              </div>

              <div class="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 text-emerald-900 space-y-1">
                <p class="font-bold flex items-center gap-1.5 text-emerald-800">
                  <span>2. Surat Rencana Kontrol (SK)</span>
                </p>
                <p class="text-[11px] text-emerald-800/90 leading-relaxed">
                  Pasien kontrol lanjutan dijadwalkan oleh DPJP RSUD R.A.A. Tjokronegoro dan dapat didaftarkan langsung melalui aplikasi <strong>Mobile JKN</strong>.
                </p>
              </div>

              <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-700 space-y-1">
                <p class="font-bold flex items-center gap-1.5 text-slate-800">
                  <span>3. Check-in Hari H</span>
                </p>
                <p class="text-[11px] text-slate-600 leading-relaxed">
                  Pada hari H, lakukan check-in di Mesin Anjungan Pasien Mandiri (APM) rumah sakit dengan memindai QR Code atau sidik jari biometrik.
                </p>
              </div>
            </div>

            <button
              type="button"
              @click="showBpjsInfoModal = false"
              class="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
            >
              Saya Mengerti
            </button>
          </div>
        </div>
      </transition>
    </Teleport>

    <!-- Modal Panduan Check-in Mandiri APM -->
    <Teleport to="body">
      <transition name="fade">
        <div
          v-if="showApmHelpModal"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <div class="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-7 shadow-2xl space-y-4 text-left" style="animation: scale-up 0.3s cubic-bezier(0.16, 1, 0.3, 1);">
            <div class="flex items-center justify-between pb-3 border-b border-gray-100">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                  <svg class="w-5 h-5 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                </div>
                <div>
                  <span class="text-[10px] font-bold text-teal-700 uppercase tracking-wider block">Panduan APM</span>
                  <h3 class="text-base font-black text-slate-800">Cara Check-in Mandiri</h3>
                </div>
              </div>
              <button
                @click="showApmHelpModal = false"
                class="w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 cursor-pointer"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            <ol class="space-y-2.5 text-xs text-slate-600 list-decimal list-inside leading-relaxed">
              <li class="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                Kunjungi <strong>Mesin Anjungan Pasien Mandiri (APM)</strong> di lobby Gedung B lantai 1.
              </li>
              <li class="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                Pilih menu <strong>Konfirmasi Kedatangan / Check-in</strong>.
              </li>
              <li class="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                Pindai <strong>QR Code / Barcode</strong> yang ada di tiket SAPA RSTN ini, atau masukkan No. Rekam Medis (NORM).
              </li>
              <li class="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                Mesin APM akan mencetak struk Surat Eligibilitas Peserta (SEP) / bukti antrean poli. Langsung menuju poliklinik tujuan Anda.
              </li>
            </ol>

            <button
              type="button"
              @click="showApmHelpModal = false"
              class="w-full py-2.5 px-4 rounded-xl bg-[#005f56] hover:bg-[#004d46] text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
            >
              Tutup Panduan
            </button>
          </div>
        </div>
      </transition>
    </Teleport>

    <!-- Flash Message Toast Notification -->
    <Teleport to="body">
      <transition name="slide-down">
        <div
          v-if="flashMessage.show"
          class="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 pointer-events-auto"
        >
          <div
            class="p-4 rounded-2xl shadow-2xl border flex items-start gap-3.5 backdrop-blur-xl transition-all duration-300"
            :class="{
              'bg-emerald-600 text-white border-emerald-500 shadow-emerald-900/20': flashMessage.type === 'success',
              'bg-amber-500 text-white border-amber-400 shadow-amber-900/20': flashMessage.type === 'warning',
              'bg-red-600 text-white border-red-500 shadow-red-900/20': flashMessage.type === 'error',
              'bg-blue-600 text-white border-blue-500 shadow-blue-900/20': flashMessage.type === 'info'
            }"
          >
            <div class="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
              <svg v-if="flashMessage.type === 'success'" class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              <svg v-else-if="flashMessage.type === 'warning'" class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              <svg v-else class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
            </div>
            <div class="flex-1 space-y-0.5 text-left">
              <h4 class="text-sm font-extrabold tracking-tight">{{ flashMessage.title }}</h4>
              <p class="text-xs leading-relaxed opacity-95">{{ flashMessage.message }}</p>
            </div>
            <button
              type="button"
              @click="flashMessage.show = false"
              class="w-7 h-7 rounded-lg bg-white/15 hover:bg-white/25 flex items-center justify-center shrink-0 transition-colors -mr-1 -mt-1 cursor-pointer"
            >
              <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import QRCode from 'qrcode'
import api from '../services/api'
import { useAuthStore } from '../stores/auth'
import { PLAY_STORE_URL, APP_STORE_URL, getMobileJknUrl } from '../utils/mobileJkn'
import BookingBarcode from '../components/common/BookingBarcode.vue'

const mobileJknUrl = computed(() => getMobileJknUrl())
const authStore = useAuthStore()

const loading = ref(false)
const reservasiList = ref([])
const cancellingId = ref(null)
const selectedTicket = ref(null)
const ticketQrDataUrl = ref('')

// State modal tambahan
const showBpjsInfoModal = ref(false)
const showApmHelpModal = ref(false)

// State rencana kontrol BPJS
const bpjsKontrol = ref(null)
const bpjsLoading = ref(true)
const bpjsError = ref(false)

// Helper: Ambil string tanggal hari ini (YYYY-MM-DD)
function getTodayStr() {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function isHariIni(tglStr) {
  if (!tglStr) return false
  return tglStr.trim().startsWith(getTodayStr())
}

// Generate QR Code saat tiket dibuka jika belum ada atau untuk tiket BPJS
watch(selectedTicket, async (val) => {
  if (val && val.kodeBooking) {
    try {
      ticketQrDataUrl.value = await QRCode.toDataURL(String(val.kodeBooking), {
        margin: 1,
        width: 160,
        errorCorrectionLevel: 'H',
        color: { dark: val.isBpjs ? '#00704a' : '#005f56', light: '#ffffff' }
      })
    } catch (e) {
      ticketQrDataUrl.value = ''
    }
  } else {
    ticketQrDataUrl.value = ''
  }
})

// Flash Message State
const flashMessage = reactive({
  show: false,
  title: '',
  message: '',
  type: 'success'
})
let flashTimer = null

function showFlash(title, message, type = 'success') {
  if (flashTimer) clearTimeout(flashTimer)
  flashMessage.title = title
  flashMessage.message = message
  flashMessage.type = type
  flashMessage.show = true

  flashTimer = setTimeout(() => {
    flashMessage.show = false
  }, 4500)
}

async function fetchReservasi() {
  loading.value = true
  try {
    const response = await api.get('/daftar-umum/list-reservasi')
    if (response.data?.code === '200' && Array.isArray(response.data.data)) {
      reservasiList.value = response.data.data
    } else {
      reservasiList.value = []
    }
  } catch (err) {
    console.warn('Could not fetch reservasi list:', err)
    reservasiList.value = []
  } finally {
    loading.value = false
  }
}

async function fetchKontrolBpjs() {
  bpjsLoading.value = true
  bpjsError.value = false
  try {
    const response = await api.get('/resume-medis/kontrol-bpjs')
    const code = response.data?.code
    const data = response.data?.data

    const tidakAdaData =
      code !== '200' ||
      data === null ||
      data === undefined ||
      (Array.isArray(data) && data.length === 0) ||
      (typeof data === 'object' && !Array.isArray(data) && Object.keys(data).length === 0)

    if (code === '200' && !tidakAdaData) {
      bpjsKontrol.value = data
    } else {
      bpjsKontrol.value = null
      bpjsError.value = false
    }
  } catch (err) {
    console.warn('Gagal memuat rencana kontrol BPJS:', err)
    bpjsKontrol.value = null
    bpjsError.value = true
  } finally {
    bpjsLoading.value = false
  }
}

function refreshAll() {
  fetchReservasi()
  fetchKontrolBpjs()
}

/**
 * Cek apakah waktu pelayanan sudah lewat
 */
function isExpired(tglKunjungan, jamPraktek) {
  if (!tglKunjungan) return true
  const now = new Date()

  let endHour = 23
  let endMinute = 59

  if (jamPraktek && typeof jamPraktek === 'string') {
    const parts = jamPraktek.split('-')
    if (parts.length >= 2) {
      const endPart = parts[1].trim()
      const timeMatch = endPart.match(/(\d{1,2})[:.](\d{2})/)
      if (timeMatch) {
        endHour = parseInt(timeMatch[1], 10)
        endMinute = parseInt(timeMatch[2], 10)
      }
    } else {
      const timeMatch = jamPraktek.match(/(\d{1,2})[:.](\d{2})/)
      if (timeMatch) {
        endHour = parseInt(timeMatch[1], 10) + 1
        endMinute = parseInt(timeMatch[2], 10)
      }
    }
  }

  const parts = tglKunjungan.split('-').map(Number)
  if (parts.length < 3) return true
  const [year, month, day] = parts
  const serviceEndDateTime = new Date(year, month - 1, day, endHour, endMinute, 59)

  return now > serviceEndDateTime
}

function canCancel(tglKunjungan) {
  if (!tglKunjungan) return false
  const todayStr = getTodayStr()
  return tglKunjungan > todayStr
}

function openDetailModal(item) {
  selectedTicket.value = item
}

async function confirmCancel(item) {
  if (!confirm(`Apakah Anda yakin ingin membatalkan reservasi poli ${item.namaPoli} (Kode: ${item.kodeBooking})?`)) {
    return
  }

  cancellingId.value = item.kodeBooking

  try {
    const params = new URLSearchParams()
    params.append('kodeBooking', item.kodeBooking)

    const response = await api.post('/daftar-umum/batal', params)
    const res = response.data

    if (res.code === '200') {
      showFlash('Berhasil Dibatalkan', 'Reservasi pendaftaran Anda telah berhasil dibatalkan.', 'success')
      fetchReservasi()
    } else {
      showFlash('Gagal Membatalkan', res.message || 'Gagal membatalkan reservasi.', 'error')
    }
  } catch (err) {
    const msg = err.response?.data?.message || 'Terjadi kesalahan saat membatalkan reservasi.'
    showFlash('Terjadi Kesalahan', msg, 'error')
  } finally {
    cancellingId.value = null
  }
}

/**
 * Format Jam Estimasi untuk kebutuhan testing dan UI
 */
function formatJamEstimasi(jamStr) {
  if (!jamStr) return '-'
  return jamStr.slice(0, 5) // "09:50:00" -> "09:50"
}

/**
 * Format Estimasi Pelayanan untuk Detail Tiket Pasien
 */
function formatEstimasiTiket(ticket) {
  if (!ticket) return '-'
  if (ticket.ESTIMASI_PELAYANAN) {
    const raw = String(ticket.ESTIMASI_PELAYANAN).trim()
    if (raw.includes('-')) return raw.includes('WIB') ? raw : `${raw} WIB`
    return `${formatJamEstimasi(raw)} WIB`
  }
  if (ticket.JAM_PRAKTEK && ticket.JAM_PRAKTEK !== '-') {
    const raw = String(ticket.JAM_PRAKTEK).trim()
    return raw.includes('WIB') ? raw : `${raw} WIB`
  }
  return 'Sesuai Jam Praktik Dokter'
}

function formatTglIndo(tglStr) {
  if (!tglStr) return '-'
  try {
    const d = new Date(tglStr)
    if (isNaN(d.getTime())) return tglStr
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
    return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
  } catch (e) {
    return tglStr
  }
}

/**
 * Format Jadwal Display sesuai desain:
 * - Hari H: "Hari ini, 24 Mei 2025 (09:00 - 12:00)"
 * - Mendatang: "Jumat, 30 Mei 2025 (13:00 - 16:00)"
 * - Sudah Lewat: "Senin, 12 Mei 2025 (10:00 WIB) • Selesai"
 */
function formatJadwalDisplay(tglStr, jamStr) {
  if (!tglStr) return '-'
  const today = getTodayStr()
  const isToday = tglStr === today
  const expired = isExpired(tglStr, jamStr)

  const d = new Date(tglStr)
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
  const dayName = isNaN(d.getTime()) ? '' : days[d.getDay()]
  const dateFormatted = isNaN(d.getTime()) ? tglStr : `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`

  let datePrefix = ''
  if (isToday) {
    datePrefix = `Hari ini, ${dateFormatted}`
  } else if (dayName) {
    datePrefix = `${dayName}, ${dateFormatted}`
  } else {
    datePrefix = dateFormatted
  }

  let timePart = ''
  if (jamStr && typeof jamStr === 'string') {
    const cleanJam = jamStr.trim()
    timePart = ` (${cleanJam.includes('WIB') ? cleanJam : cleanJam + (cleanJam.includes('-') ? '' : ' WIB')})`
  }

  const expiredPart = expired && !isToday ? ' • Selesai' : ''

  return `${datePrefix}${timePart}${expiredPart}`
}

/**
 * Subtext pada squircle nomor antrean:
 * - Selesai (jika masa lalu)
 * - Est. HH:mm (jika ada estimasi)
 * - Pagi / Siang / Sore (berdasarkan jam)
 */
function getAntreanSubtext(item) {
  if (isExpired(item.TANGGALKUNJUNGAN, item.JAM_PRAKTEK) && !isHariIni(item.TANGGALKUNJUNGAN)) {
    return 'Selesai'
  }
  if (item.ESTIMASI_PELAYANAN) {
    return `Est. ${formatJamEstimasi(item.ESTIMASI_PELAYANAN)}`
  }
  if (item.JAM_PRAKTEK && typeof item.JAM_PRAKTEK === 'string') {
    const m = item.JAM_PRAKTEK.match(/(\d{1,2})[:.](\d{2})/)
    if (m) {
      const h = parseInt(m[1], 10)
      if (h < 12) return 'Pagi'
      if (h < 15) return 'Siang'
      return 'Sore'
    }
  }
  return 'Pagi'
}

/**
 * Pengurutan Reservasi Terpadu Sesuai Permintaan User:
 * 1. Layanan Hari H (Hari ini) ditampilkan PALING ATAS
 * 2. Layanan Mendatang diurutkan dari TANGGAL TERDEKAT pelayanan (Ascending)
 * 3. Layanan yang sudah terlewat / dilaksanakan diurutkan di paling bawah (Descending)
 */
const sortedReservasiList = computed(() => {
  const today = getTodayStr()
  const items = []
  const seenCodes = new Set()

  // 1. Masukkan data BPJS Kontrol jika ada
  if (bpjsKontrol.value && bpjsKontrol.value.ID) {
    const b = bpjsKontrol.value
    const bpjsItem = {
      isBpjs: true,
      kodeBooking: String(b.ID),
      ID: b.ID,
      NOMOR_ANTRIAN: b.NOMOR_ANTRIAN || '01',
      namaPoli: b.poli || 'Poliklinik Rawat Jalan',
      namaDokter: b.namaDokter || '-',
      TANGGALKUNJUNGAN: b.TANGGALKUNJUNGAN || today,
      JAM_PRAKTEK: b.ESTIMASI_PELAYANAN || '09:00 - 12:00',
      ESTIMASI_PELAYANAN: b.ESTIMASI_PELAYANAN,
      NO_REF_BPJS: b.NO_REF_BPJS || null,
      caraBayar: 'BPJS',
      raw: b
    }
    items.push(bpjsItem)
    seenCodes.add(String(b.ID))
  }

  // 2. Masukkan data reservasi umum
  for (const item of reservasiList.value) {
    const code = String(item.kodeBooking || item.ID || '')
    if (code && seenCodes.has(code)) continue
    if (code) seenCodes.add(code)

    const isBpjs = String(item.caraBayar || '').toUpperCase().includes('BPJS')
    items.push({
      ...item,
      isBpjs,
      kodeBooking: code,
      ID: code,
      NOMOR_ANTRIAN: item.NOMOR_ANTRIAN || '-',
      namaPoli: item.namaPoli || 'Poliklinik Rawat Jalan',
      namaDokter: item.namaDokter || '-',
      TANGGALKUNJUNGAN: item.TANGGALKUNJUNGAN,
      JAM_PRAKTEK: item.JAM_PRAKTEK || item.ESTIMASI_PELAYANAN || '-',
      ESTIMASI_PELAYANAN: item.ESTIMASI_PELAYANAN,
      NO_REF_BPJS: item.NO_REF_BPJS || null,
      caraBayar: item.caraBayar || 'UMUM'
    })
  }

  // 3. Logika Sorting Multi-Tier:
  return items.slice().sort((a, b) => {
    const tglA = a.TANGGALKUNJUNGAN || ''
    const tglB = b.TANGGALKUNJUNGAN || ''
    const expiredA = isExpired(tglA, a.JAM_PRAKTEK)
    const expiredB = isExpired(tglB, b.JAM_PRAKTEK)
    const isTodayA = tglA === today
    const isTodayB = tglB === today

    // Definisi Prioritas Grup:
    // Tier 0: Hari H (Hari ini) -> Tampil PALING ATAS
    // Tier 1: Jadwal Mendatang (tgl > today && belum lewat) -> Urut TANGGAL TERDEKAT (Ascending)
    // Tier 2: Sudah Terlewat / Dilaksanakan -> Tampil di bawah (Descending)
    const getTier = (isToday, tgl, expired) => {
      if (isToday) return 0
      if (tgl > today && !expired) return 1
      return 2
    }

    const tierA = getTier(isTodayA, tglA, expiredA)
    const tierB = getTier(isTodayB, tglB, expiredB)

    if (tierA !== tierB) {
      return tierA - tierB
    }

    // Jika sama-sama Hari H (Tier 0): urutkan berdasarkan jam pelayanan
    if (tierA === 0) {
      const jamA = a.ESTIMASI_PELAYANAN || a.JAM_PRAKTEK || ''
      const jamB = b.ESTIMASI_PELAYANAN || b.JAM_PRAKTEK || ''
      return jamA.localeCompare(jamB)
    }

    // Jika sama-sama Mendatang (Tier 1): urutkan ASCENDING (tanggal terdekat lebih dulu)
    if (tierA === 1) {
      if (tglA !== tglB) return tglA.localeCompare(tglB)
      const jamA = a.ESTIMASI_PELAYANAN || a.JAM_PRAKTEK || ''
      const jamB = b.ESTIMASI_PELAYANAN || b.JAM_PRAKTEK || ''
      return jamA.localeCompare(jamB)
    }

    // Jika sama-sama Selesai/Terlewat (Tier 2): urutkan DESCENDING (tanggal paling baru lebih dulu)
    if (tglA !== tglB) return tglB.localeCompare(tglA)
    return (b.ESTIMASI_PELAYANAN || '').localeCompare(a.ESTIMASI_PELAYANAN || '')
  })
})

onMounted(() => {
  fetchReservasi()
  fetchKontrolBpjs()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translate(-50%, -24px) scale(0.95);
}
</style>
