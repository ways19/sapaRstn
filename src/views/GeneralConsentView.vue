<template>
  <div class="max-w-md sm:max-w-2xl mx-auto space-y-4 pb-12" style="animation: fade-in 0.25s ease-out;">
    <!-- ========================================== -->
    <!-- 1. BANNER HEADER UTAMA (e-Consent)         -->
    <!-- ========================================== -->
    <div class="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 rounded-3xl p-4 sm:p-5 text-white shadow-md shadow-emerald-950/15 relative overflow-hidden flex items-center justify-between gap-3">
      <!-- Icon Dokumen & Judul Header -->
      <div class="flex items-center gap-3 min-w-0">
        <div class="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 shadow-inner">
          <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <line x1="10" y1="9" x2="8" y2="9" />
          </svg>
        </div>
        <div class="min-w-0">
          <h1 class="text-base sm:text-lg font-black text-white tracking-tight leading-tight">
            e-Consent
          </h1>
          <p class="text-xs text-white/85 font-medium truncate">
            (Persetujuan Medis Elektronik)
          </p>
        </div>
      </div>

      <!-- Tombol Refresh / Back -->
      <div class="flex items-center gap-2 shrink-0">
        <button
          v-if="viewMode === 'form'"
          type="button"
          @click="backToList"
          class="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 active:scale-95 text-white font-bold text-xs backdrop-blur-md border border-white/25 transition-all flex items-center gap-1 cursor-pointer"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          <span>Kembali</span>
        </button>

        <button
          type="button"
          @click="refreshCurrentView"
          :disabled="loadingList || loadingDetail"
          class="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer disabled:opacity-50"
          title="Muat ulang data"
        >
          <svg class="w-4 h-4" :class="(loadingList || loadingDetail) ? 'animate-spin' : ''" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M1 4v6h6" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Alert Notifikasi Global -->
    <div
      v-if="alertMessage"
      :class="[
        'rounded-2xl p-3.5 flex items-start gap-2.5 shadow-sm text-xs font-semibold animate-fade-in',
        alertType === 'success'
          ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
          : 'bg-rose-50 border border-rose-200 text-rose-800'
      ]"
    >
      <svg v-if="alertType === 'success'" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <svg v-else class="w-4 h-4 text-rose-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <div class="flex-1 leading-relaxed text-xs">
        {{ alertMessage }}
      </div>
      <button type="button" @click="alertMessage = ''" class="text-gray-400 hover:text-gray-600 text-sm leading-none px-1">
        &times;
      </button>
    </div>

    <!-- ======================================================== -->
    <!-- 2. MODE LIST: TAMPILAN SESUAI DESAIN MOBILE USER        -->
    <!-- ======================================================== -->
    <div v-if="viewMode === 'list'" class="space-y-3.5">
      <!-- 2.1 Tiga Kotak Status: DRAFT, ANTRI, VALID -->
      <div class="grid grid-cols-3 gap-2 sm:gap-3">
        <!-- DRAFT -->
        <button
          type="button"
          @click="toggleStatusFilter('draft')"
          class="p-3 rounded-2xl bg-white border text-center shadow-xs transition-all cursor-pointer active:scale-95"
          :class="selectedStatusFilter === 'draft' ? 'border-amber-400 ring-2 ring-amber-100 bg-amber-50/20' : 'border-gray-100 hover:border-gray-200'"
        >
          <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider">DRAFT</p>
          <p class="text-2xl font-black text-gray-800 mt-0.5">{{ countPerluTtd }}</p>
        </button>

        <!-- ANTRI -->
        <button
          type="button"
          @click="toggleStatusFilter('antri')"
          class="p-3 rounded-2xl bg-white border text-center shadow-xs transition-all cursor-pointer active:scale-95"
          :class="selectedStatusFilter === 'antri' ? 'border-blue-400 ring-2 ring-blue-100 bg-blue-50/20' : 'border-gray-100 hover:border-gray-200'"
        >
          <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider">ANTRI</p>
          <p class="text-2xl font-black text-gray-800 mt-0.5">{{ countMenungguVerifikasi }}</p>
        </button>

        <!-- VALID -->
        <button
          type="button"
          @click="toggleStatusFilter('valid')"
          class="p-3 rounded-2xl bg-white border text-center shadow-xs transition-all cursor-pointer active:scale-95"
          :class="selectedStatusFilter === 'valid' ? 'border-emerald-400 ring-2 ring-emerald-100 bg-emerald-50/20' : 'border-gray-100 hover:border-gray-200'"
        >
          <p class="text-[11px] font-bold text-emerald-600 uppercase tracking-wider flex items-center justify-center gap-1.5">
            <span>VALID</span>
            <span class="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
          </p>
          <p class="text-2xl font-black text-emerald-600 mt-0.5">{{ countSelesai }}</p>
        </button>
      </div>

      <!-- 2.2 Search Bar dengan Icon Pencarian & Filter -->
      <div class="rounded-2xl border border-gray-200/90 bg-white px-3.5 py-2.5 flex items-center gap-2.5 shadow-2xs">
        <svg class="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" stroke-width="2"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65" stroke-width="2"/>
        </svg>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Cari no. registrasi atau dokumen..."
          class="flex-1 text-xs text-gray-700 placeholder-gray-400 bg-transparent focus:outline-none"
        />
        <button
          v-if="searchQuery"
          type="button"
          @click="searchQuery = ''"
          class="text-gray-400 hover:text-gray-600 text-xs px-1"
        >
          &times;
        </button>
        <button
          type="button"
          @click="showFilterDropdown = !showFilterDropdown"
          class="text-gray-400 hover:text-emerald-600 transition-colors shrink-0"
          :class="selectedStatusFilter !== 'all' ? 'text-emerald-600' : ''"
          title="Filter jenis dokumen"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
          </svg>
        </button>
      </div>

      <!-- 2.3 Loading State List Awal -->
      <div v-if="loadingList" class="py-14 text-center flex flex-col items-center justify-center gap-3 text-gray-400 bg-white rounded-3xl border border-gray-100">
        <svg class="w-8 h-8 animate-spin text-emerald-600" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" class="opacity-25" />
          <path d="M4 12a8 8 0 018-8" stroke="currentColor" stroke-width="3" stroke-linecap="round" class="opacity-75" />
        </svg>
        <span class="text-xs font-semibold">Memuat berkas e-Consent...</span>
      </div>

      <!-- 2.4 State Kosong: Belum ada Dokumen -->
      <div
        v-else-if="filteredConsentList.length === 0"
        class="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center max-w-sm mx-auto space-y-3"
      >
        <div class="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
          <svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>
        <div class="space-y-1">
          <h3 class="text-sm font-bold text-gray-800">Tidak Ada Dokumen</h3>
          <p class="text-xs text-gray-400 leading-relaxed">
            {{ searchQuery ? 'Tidak ada dokumen yang cocok dengan kata kunci.' : 'Belum ada formulir e-Consent yang memerlukan tindakan Anda.' }}
          </p>
        </div>
        <div v-if="searchQuery || selectedStatusFilter !== 'all'" class="pt-1">
          <button
            type="button"
            @click="resetFilters"
            class="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs transition active:scale-95 cursor-pointer"
          >
            Reset Filter
          </button>
        </div>
      </div>

      <!-- 2.5 Daftar Dokumen Consent (Kartu Sesuai Mockup) -->
      <div v-else class="space-y-3.5">
        <div
          v-for="item in filteredConsentList"
          :key="item.ID || item.NOPEN"
          class="bg-white rounded-3xl p-4 sm:p-5 border border-gray-100 shadow-sm space-y-3.5 hover:shadow-md transition-shadow"
        >
          <!-- Baris 1: Status Badge & Jenis Layanan -->
          <div class="flex items-center gap-2 flex-wrap">
            <!-- Status Badge -->
            <span
              v-if="item.STATUS === 1"
              class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200"
            >
              <svg class="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
              <span>Dokumen Sah &amp; Final</span>
            </span>
            <span
              v-else-if="item.STATUS === 2 && item.HAS_PATIENT_SIGNATURE"
              class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200"
            >
              <svg class="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="2"/><polyline points="12 6 12 12 14 14" stroke-width="2"/></svg>
              <span>Menunggu Verifikasi Petugas</span>
            </span>
            <span
              v-else
              class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200 animate-pulse"
            >
              <svg class="w-3.5 h-3.5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
              <span>Perlu Tanda Tangan Pasien / Wali</span>
            </span>

            <!-- Format Layanan Badge -->
            <span
              class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide"
              :class="item.JENIS_PELAYANAN === 2 ? 'bg-purple-50 text-purple-700 border border-purple-200' : 'bg-cyan-50 text-cyan-700 border border-cyan-200'"
            >
              {{ item.JENIS_PELAYANAN === 2 ? 'RAWAT INAP' : 'RAWAT JALAN / IGD' }}
            </span>
          </div>

          <!-- Baris 2: Icon Kotak & Nama Dokumen yang di TTD -->
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
              <svg class="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <line x1="10" y1="9" x2="8" y2="9" />
              </svg>
            </div>
            <div class="min-w-0">
              <h3 class="text-sm sm:text-base font-bold text-gray-900 leading-snug">
                {{ getDocumentName(item) }}
              </h3>
              <p class="text-[11px] text-gray-400 font-medium mt-0.5">
                {{ getDocumentSubtitle(item) }}
              </p>
            </div>
          </div>

          <!-- Baris 3: Kotak Rincian (Abu-abu / Slate Modern) -->
          <div class="rounded-2xl bg-slate-50/80 border border-slate-100 p-3.5 sm:p-4 space-y-2.5 text-xs">
            <!-- Row 1: UNIT / RUANGAN & PENJAMIN -->
            <div class="grid grid-cols-2 gap-3 pb-2.5 border-b border-slate-200/70">
              <div>
                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">UNIT / RUANGAN</p>
                <p class="font-bold text-gray-800 flex items-center gap-1.5 truncate">
                  <span class="text-gray-400 text-xs">🏢</span>
                  <span class="truncate">{{ item.RUANGAN_NAMA || 'Radiologi' }}</span>
                </p>
              </div>

              <div>
                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">PENJAMIN</p>
                <p class="font-bold text-gray-800 flex items-center gap-1.5 truncate">
                  <span class="w-2 h-2 rounded-full bg-blue-500 shrink-0"></span>
                  <span class="truncate">{{ formatPenjamin(item.CARA_PEMBIAYAAN) }}</span>
                </p>
              </div>
            </div>

            <!-- Row 2: NO. REGISTRASI -->
            <div>
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">NO. REGISTRASI</p>
              <p class="font-mono font-bold text-gray-800 flex items-center gap-1.5">
                <span class="text-gray-400 text-xs">🗎</span>
                <span>#{{ item.NOPEN }}</span>
              </p>
            </div>

            <!-- Row 3: TANGGAL & WAKTU -->
            <div>
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">TANGGAL &amp; WAKTU</p>
              <p class="font-medium text-gray-700 flex items-center gap-1.5">
                <span class="text-gray-400 text-xs">📅</span>
                <span>{{ formatTanggalWaktu(item.TANGGAL) }}</span>
              </p>
            </div>

            <!-- Row 4: PETUGAS VERIFIKATOR -->
            <div>
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">PETUGAS VERIFIKATOR</p>
              <p class="font-medium text-gray-700 flex items-center gap-1.5 truncate">
                <span class="text-gray-400 text-xs">👤</span>
                <span class="truncate">{{ item.PETUGAS_NAMA || 'MUHAMMAD WAHYU KHOIRUDIN, A.Md' }}</span>
              </p>
            </div>
          </div>

          <!-- Baris 4: Tombol Aksi Bawah (Lihat PDF + 2 Tombol Kotak) -->
          <div class="flex items-center gap-2 pt-0.5">
            <!-- Tombol Utama: Lihat PDF (Bila Sah) -->
            <a
              v-if="item.STATUS === 1 && item.DOC_UUID"
              :href="consentService.getPdfUrl(item.DOC_UUID)"
              target="_blank"
              class="flex-1 py-3 px-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 active:scale-[0.98] text-white text-xs font-bold shadow-sm shadow-emerald-800/20 transition-all flex items-center justify-center gap-2"
            >
              <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="12" y1="18" x2="12" y2="12" />
                <line x1="9" y1="15" x2="12" y2="18" />
                <line x1="15" y1="15" x2="12" y2="18" />
              </svg>
              <span>Lihat PDF</span>
            </a>

            <!-- Tombol Utama: Formulir (Bila Masih Draft / Perlu TTD) -->
            <button
              v-else
              type="button"
              @click="openConsentForm(item.NOPEN)"
              class="flex-1 py-3 px-4 rounded-2xl text-white text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
              :class="item.STATUS === 2 && !item.HAS_PATIENT_SIGNATURE ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20' : 'bg-teal-600 hover:bg-teal-700 shadow-teal-600/20'"
            >
              <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
              <span>{{ (item.STATUS === 2 && !item.HAS_PATIENT_SIGNATURE) ? 'Buka & Tanda Tangani' : 'Lihat Formulir' }}</span>
            </button>

            <!-- Tombol Grid / Detail Verifikasi -->
            <button
              type="button"
              @click="openDetailModal(item)"
              class="w-11 h-11 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 active:scale-95 text-gray-600 flex items-center justify-center shrink-0 shadow-2xs transition cursor-pointer"
              title="Info Verifikasi & QR"
            >
              <svg class="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>
              </svg>
            </button>

            <!-- Tombol Share Dokumen -->
            <button
              type="button"
              @click="shareDocument(item)"
              class="w-11 h-11 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 active:scale-95 text-gray-600 flex items-center justify-center shrink-0 shadow-2xs transition cursor-pointer"
              title="Bagikan Dokumen"
            >
              <svg class="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- 2.6 Infinite Scroll Trigger Element & Footer Hitungan -->
        <div ref="loadMoreTrigger" class="py-3 flex flex-col items-center justify-center text-center">
          <div v-if="loadingMore" class="flex items-center gap-2 py-2 text-xs font-semibold text-emerald-600">
            <svg class="w-4 h-4 animate-spin text-emerald-600" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" class="opacity-25" />
              <path d="M4 12a8 8 0 018-8" stroke="currentColor" stroke-width="3" stroke-linecap="round" class="opacity-75" />
            </svg>
            <span>Memuat berkas e-Consent selanjutnya...</span>
          </div>

          <!-- Teks Footer Sesuai Mockup -->
          <p v-else-if="!hasMore && filteredConsentList.length > 0" class="text-xs text-gray-400 flex items-center justify-center gap-1.5 py-1">
            <span>🕒</span>
            <span>Menampilkan seluruh {{ filteredConsentList.length }} berkas e-Consent</span>
          </p>
        </div>
      </div>
    </div>

    <!-- ======================================================== -->
    <!-- 3. MODE FORM: KLAUSUL LENGKAP & SIMPAN CONSENT           -->
    <!-- ======================================================== -->
    <div v-else-if="viewMode === 'form'" class="space-y-4">
      <!-- Navigasi Back & Judul Sub -->
      <div class="flex items-center justify-between gap-3">
        <button
          type="button"
          @click="backToList"
          class="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition cursor-pointer"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          <span>Kembali ke Daftar e-Consent</span>
        </button>

        <span
          class="px-2.5 py-1 rounded-lg text-xs font-bold"
          :class="[
            currentConsentStatus === 1
              ? 'bg-emerald-100 text-emerald-800'
              : currentConsentStatus === 2 && form.TTD_PASIEN_BASE64
                ? 'bg-blue-100 text-blue-800'
                : 'bg-amber-100 text-amber-900'
          ]"
        >
          {{ currentStatusText }}
        </span>
      </div>

      <!-- Loading State Detail Form -->
      <div v-if="loadingDetail" class="py-16 text-center flex flex-col items-center justify-center gap-3 text-gray-400 bg-white rounded-3xl border border-gray-100">
        <svg class="w-9 h-9 animate-spin text-emerald-600" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" class="opacity-25" />
          <path d="M4 12a8 8 0 018-8" stroke="currentColor" stroke-width="3" stroke-linecap="round" class="opacity-75" />
        </svg>
        <span class="text-xs font-semibold">Memuat formulir dan klausul e-Consent...</span>
      </div>

      <!-- Detail Form Siap -->
      <div v-else-if="patientData" class="space-y-4">
        <!-- 1. Ringkasan Identitas Pasien & Berkas Kunjungan -->
        <div class="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm space-y-3.5">
          <div class="flex items-center justify-between gap-3 border-b border-gray-100 pb-3 flex-wrap">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <h2 class="text-sm font-bold text-gray-800">Identitas Pasien &amp; Kunjungan</h2>
            </div>
            <div class="text-xs text-gray-500">
              Format: <span class="font-bold text-teal-800">{{ currentTemplateTitle }} ({{ form.TEMPLATE_KODE }})</span>
            </div>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            <div class="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
              <p class="text-[10px] text-gray-400 font-semibold uppercase">Nama Lengkap</p>
              <p class="font-bold text-gray-800 truncate mt-0.5">{{ patientData.NAMA || '-' }}</p>
            </div>
            <div class="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
              <p class="text-[10px] text-gray-400 font-semibold uppercase">Nomor Rekam Medis</p>
              <p class="font-mono font-bold text-emerald-700 mt-0.5">{{ patientData.NORM || '-' }}</p>
            </div>
            <div class="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
              <p class="text-[10px] text-gray-400 font-semibold uppercase">Nomor Pendaftaran</p>
              <p class="font-mono font-bold text-gray-700 mt-0.5">{{ form.NOPEN || '-' }}</p>
            </div>
            <div class="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
              <p class="text-[10px] text-gray-400 font-semibold uppercase">Poli / Ruangan</p>
              <p class="font-semibold text-gray-700 truncate mt-0.5">{{ patientData.RUANGAN_NAMA || '-' }}</p>
            </div>
          </div>
        </div>

        <!-- 2. Identitas Yang Menyatakan Persetujuan (Pasien Sendiri / Wali) -->
        <div class="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm space-y-3.5">
          <div class="border-b border-gray-100 pb-3 flex items-center justify-between">
            <h2 class="text-sm font-bold text-gray-800">Identitas Yang Menyatakan Persetujuan</h2>
            <span class="text-xs text-gray-400">Pemberi Persetujuan</span>
          </div>

          <div class="space-y-3">
            <div class="flex items-center gap-5 text-xs">
              <label class="flex items-center gap-2 cursor-pointer font-medium text-gray-700">
                <input
                  type="radio"
                  :value="0"
                  v-model="form.IS_WALI"
                  :disabled="isReadOnly"
                  class="text-emerald-600 focus:ring-emerald-500"
                />
                <span class="font-bold">Pasien Sendiri</span>
              </label>

              <label class="flex items-center gap-2 cursor-pointer font-medium text-gray-700">
                <input
                  type="radio"
                  :value="1"
                  v-model="form.IS_WALI"
                  :disabled="isReadOnly"
                  class="text-emerald-600 focus:ring-emerald-500"
                />
                <span class="font-bold">Keluarga / Wali Penanggung Jawab</span>
              </label>
            </div>

            <div v-if="form.IS_WALI === 1" class="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-xs">
              <div>
                <label class="block text-[11px] font-semibold text-gray-600 mb-1">Nama Lengkap Penanggung Jawab <span class="text-rose-500">*</span></label>
                <input
                  type="text"
                  v-model="form.NAMA_PENANGGUNG_JAWAB"
                  :disabled="isReadOnly"
                  placeholder="Nama sesuai KTP"
                  class="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label class="block text-[11px] font-semibold text-gray-600 mb-1">Hubungan dengan Pasien <span class="text-rose-500">*</span></label>
                <input
                  type="text"
                  v-model="form.HUBUNGAN"
                  :disabled="isReadOnly"
                  placeholder="Contoh: Suami / Istri / Anak / Orang Tua"
                  class="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label class="block text-[11px] font-semibold text-gray-600 mb-1">Nomor Telepon / HP</label>
                <input
                  type="text"
                  v-model="form.NO_HP_PENANGGUNG_JAWAB"
                  :disabled="isReadOnly"
                  placeholder="08xxxxxxxxxx"
                  class="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label class="block text-[11px] font-semibold text-gray-600 mb-1">Alamat Penanggung Jawab</label>
                <input
                  type="text"
                  v-model="form.ALAMAT_PENANGGUNG_JAWAB"
                  :disabled="isReadOnly"
                  placeholder="Alamat domisili"
                  class="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:bg-gray-100"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 3. Point-Point Klausul Persetujuan Umum -->
        <div class="rounded-2xl border border-gray-200 bg-white shadow-sm p-4 sm:p-5 space-y-3.5">
          <div class="border-b border-gray-100 pb-3 flex items-center justify-between">
            <div>
              <h2 class="text-sm font-bold text-gray-800">Klausul Persetujuan Umum (General Consent)</h2>
              <p class="text-[11px] text-gray-400 mt-0.5">Sesuai Permenkes No. 24 Tahun 2022 dan Standar RSUD R.A.A. Tjokronegoro</p>
            </div>
            <span class="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-200">
              {{ activeClauses.length }} Klausul
            </span>
          </div>

          <!-- Daftar Poin Klausul -->
          <div class="space-y-3">
            <div
              v-for="kl in activeClauses"
              :key="kl.nomor"
              class="rounded-xl border border-gray-200 bg-gray-50/70 p-3.5 transition hover:border-gray-300"
            >
              <div class="flex items-start gap-2.5 mb-1.5">
                <span class="px-2 py-0.5 rounded-md bg-teal-600 text-white text-xs font-bold shrink-0 mt-0.5">
                  {{ kl.nomor }}
                </span>
                <span class="font-bold text-xs sm:text-sm text-gray-800 tracking-wide uppercase">
                  {{ kl.judul }}
                </span>
              </div>

              <p
                v-if="kl.isi"
                class="text-xs text-gray-700 leading-relaxed whitespace-pre-line pl-6"
              >
                {{ kl.isi }}
              </p>

              <ol
                v-if="kl.butir && kl.butir.length"
                class="list-decimal pl-10 text-xs text-gray-700 space-y-1.5 mt-1.5 leading-relaxed"
              >
                <li
                  v-for="(b, bIdx) in kl.butir"
                  :key="bIdx"
                  class="whitespace-pre-line"
                >
                  {{ b }}
                </li>
              </ol>

              <!-- Input Pelepasan Informasi -->
              <div
                v-if="isPelepasanInfoClause(kl)"
                class="mt-2.5 ml-6 pt-2.5 border-t border-gray-200 space-y-1.5"
              >
                <label class="block text-[11px] font-bold text-teal-900">
                  Nama Anggota Keluarga yang Diberikan Kuasa Menerima Informasi Medis:
                </label>
                <input
                  type="text"
                  v-model="form.KELUARGA_DIBERI_INFORMASI"
                  :disabled="isReadOnly"
                  placeholder="Contoh: 1. Siti Aminah (Istri), 2. Budi Santoso (Anak Kandung)"
                  class="w-full px-3 py-2 text-xs rounded-xl border border-teal-200 bg-white focus:outline-none focus:ring-1 focus:ring-teal-500 disabled:bg-gray-100 font-medium"
                />
              </div>

              <!-- Input Privasi Khusus -->
              <div
                v-if="isPrivasiClause(kl)"
                class="mt-2.5 ml-6 pt-2.5 border-t border-gray-200 space-y-1.5"
              >
                <label class="block text-[11px] font-bold text-teal-900">
                  Permintaan Privasi Khusus Selama Perawatan (Opsional):
                </label>
                <input
                  type="text"
                  v-model="form.PRIVASI_KHUSUS"
                  :disabled="isReadOnly"
                  placeholder="Misal: Pasien tidak ingin dikunjungi selain keluarga inti"
                  class="w-full px-3 py-2 text-xs rounded-xl border border-teal-200 bg-white focus:outline-none focus:ring-1 focus:ring-teal-500 disabled:bg-gray-100"
                />
              </div>

              <!-- Keterangan Pembiayaan -->
              <div
                v-if="isPembiayaanClause(kl)"
                class="mt-2.5 ml-6 pt-2.5 border-t border-gray-200 space-y-1"
              >
                <label class="block text-[11px] font-bold text-amber-900">
                  Penjamin / Cara Pembiayaan:
                </label>
                <div class="p-2 rounded-xl bg-amber-50/70 border border-amber-200 text-xs">
                  <span class="font-bold text-amber-900">
                    {{ patientData?.PENJAMIN?.JENIS || patientData?.CARA_PEMBIAYAAN_DEFAULT || 'Umum' }}
                  </span>
                  <span class="text-amber-800 ml-1">
                    (Nomor pendaftaran #{{ form.NOPEN }})
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 4. Signature Pad (Tanda Tangan Digital) -->
        <div class="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm space-y-3">
          <div class="flex items-center justify-between">
            <div>
              <label class="text-xs font-bold text-gray-800 block">
                Tanda Tangan Elektronik {{ form.IS_WALI === 1 ? 'Wali / Penanggung Jawab' : 'Pasien' }}
              </label>
              <p class="text-[11px] text-gray-400">Bubuhkan tanda tangan pada kotak kanvas di bawah</p>
            </div>
            <span v-if="isReadOnly" class="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              Dokumen Telah Sah
            </span>
          </div>

          <SignaturePad
            ref="signaturePadRef"
            :read-only="isReadOnly"
            @update:signature="onSignatureChange"
          />
        </div>

        <!-- 5. Tombol Aksi Simpan Consent -->
        <div class="rounded-2xl bg-white p-4 sm:p-5 border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="text-[10px] text-gray-400 flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Tersimpan dengan enkripsi kriptografi SHA-256</span>
          </div>

          <div class="flex items-center gap-2 justify-end">
            <!-- Jika Dokumen sudah Sah -->
            <a
              v-if="consentRecord?.DOC_UUID && currentConsentStatus === 1"
              :href="consentService.getPdfUrl(consentRecord.DOC_UUID)"
              target="_blank"
              class="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 active:scale-95 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <span>Lihat Dokumen PDF Sah</span>
            </a>

            <!-- Tombol Simpan Consent Pasien -->
            <button
              v-if="currentConsentStatus !== 1"
              type="button"
              @click="submitConsent"
              :disabled="saving || !form.TTD_PASIEN_BASE64"
              class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2 disabled:opacity-40 cursor-pointer"
            >
              <svg v-if="saving" class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" class="opacity-25" />
                <path d="M4 12a8 8 0 018-8" stroke="currentColor" stroke-width="3" stroke-linecap="round" class="opacity-75" />
              </svg>
              <svg v-else class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
              <span>{{ saving ? 'Menyimpan...' : 'Simpan Consent' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ======================================================== -->
    <!-- 4. MODAL DETAIL VERIFIKASI QR DOKUMEN                    -->
    <!-- ======================================================== -->
    <div
      v-if="showDetailModal && selectedModalItem"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in"
      @click.self="showDetailModal = false"
    >
      <div class="bg-white rounded-3xl p-5 sm:p-6 max-w-sm w-full space-y-4 shadow-xl border border-gray-100">
        <div class="flex items-center justify-between pb-2 border-b border-gray-100">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <h3 class="text-sm font-bold text-gray-800">Verifikasi Dokumen Resmi</h3>
          </div>
          <button
            type="button"
            @click="showDetailModal = false"
            class="text-gray-400 hover:text-gray-600 text-lg leading-none"
          >
            &times;
          </button>
        </div>

        <div class="space-y-3 text-xs">
          <div class="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
            <p class="text-[10px] font-bold text-gray-400 uppercase">Dokumen</p>
            <p class="font-bold text-gray-800">{{ getDocumentName(selectedModalItem) }}</p>
            <p class="text-[11px] text-gray-500">No. Registrasi: #{{ selectedModalItem.NOPEN }}</p>
          </div>

          <div v-if="selectedModalItem.DOC_UUID" class="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-1.5">
            <p class="text-[10px] font-bold text-emerald-800 uppercase">UUID Keabsahan Digital</p>
            <p class="font-mono text-[11px] text-emerald-900 font-bold break-all">{{ selectedModalItem.DOC_UUID }}</p>
          </div>

          <div class="pt-1 flex flex-col gap-2">
            <a
              v-if="selectedModalItem.DOC_UUID"
              :href="consentService.getVerifyUrl(selectedModalItem.DOC_UUID)"
              target="_blank"
              class="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs text-center transition shadow-xs"
            >
              Buka Halaman Verifikasi Publik &rarr;
            </a>

            <button
              type="button"
              @click="showDetailModal = false"
              class="w-full py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs text-center transition"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import consentService from '../services/consent'
import SignaturePad from '../components/SignaturePad.vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

// State View Mode: 'list' (Daftar berkas) vs 'form' (Halaman klausul & simpan consent)
const viewMode = ref('list')

const loadingList = ref(false)
const loadingDetail = ref(false)
const saving = ref(false)
const alertMessage = ref('')
const alertType = ref('success')

// Filter & Search State
const searchQuery = ref('')
const selectedStatusFilter = ref('all') // 'all' | 'draft' | 'antri' | 'valid'
const showFilterDropdown = ref(false)

// Modal Detail State
const showDetailModal = ref(false)
const selectedModalItem = ref(null)

// Infinite Scroll Pagination State
const page = ref(1)
const pageSize = 10
const hasMore = ref(true)
const loadingMore = ref(false)
const loadMoreTrigger = ref(null)
let observer = null

const consentList = ref([])
const patientData = ref(null)
const consentRecord = ref(null)
const activeTemplate = ref(null)
const signaturePadRef = ref(null)

// Form State
const form = reactive({
  NOPEN: '',
  NORM: '',
  JENIS_PELAYANAN: 1,
  TEMPLATE_KODE: 'S02_1_RAJAL_IGD',
  IS_WALI: 0,
  NAMA_PENANGGUNG_JAWAB: '',
  HUBUNGAN: '',
  NO_HP_PENANGGUNG_JAWAB: '',
  ALAMAT_PENANGGUNG_JAWAB: '',
  KELUARGA_DIBERI_INFORMASI: '',
  PRIVASI_KHUSUS: '',
  TTD_PASIEN_BASE64: '',
  LOKASI_KOORDINAT: '-7.740337, 109.995818'
})

// Hitungan status untuk ringkasan 3 kotak di atas list
const countPerluTtd = computed(() => {
  return consentList.value.filter(item => item.STATUS === 2 && !item.HAS_PATIENT_SIGNATURE).length
})

const countMenungguVerifikasi = computed(() => {
  return consentList.value.filter(item => item.STATUS === 2 && item.HAS_PATIENT_SIGNATURE).length
})

const countSelesai = computed(() => {
  return consentList.value.filter(item => item.STATUS === 1).length
})

// Filter data daftar berkas berdasarkan pencarian & tab status
const filteredConsentList = computed(() => {
  let list = consentList.value

  // Filter Status (Draft / Antri / Valid)
  if (selectedStatusFilter.value === 'draft') {
    list = list.filter(item => item.STATUS === 2 && !item.HAS_PATIENT_SIGNATURE)
  } else if (selectedStatusFilter.value === 'antri') {
    list = list.filter(item => item.STATUS === 2 && item.HAS_PATIENT_SIGNATURE)
  } else if (selectedStatusFilter.value === 'valid') {
    list = list.filter(item => item.STATUS === 1)
  }

  // Filter Search
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim()
    list = list.filter(item => {
      const nopen = (item.NOPEN || '').toLowerCase()
      const docName = getDocumentName(item).toLowerCase()
      const ruangan = (item.RUANGAN_NAMA || '').toLowerCase()
      const penjamin = (item.CARA_PEMBIAYAAN || '').toLowerCase()
      const petugas = (item.PETUGAS_NAMA || '').toLowerCase()
      return nopen.includes(q) || docName.includes(q) || ruangan.includes(q) || penjamin.includes(q) || petugas.includes(q)
    })
  }

  return list
})

const toggleStatusFilter = (status) => {
  if (selectedStatusFilter.value === status) {
    selectedStatusFilter.value = 'all'
  } else {
    selectedStatusFilter.value = status
  }
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedStatusFilter.value = 'all'
}

const currentConsentStatus = computed(() => {
  if (!consentRecord.value) return 0
  return Number(consentRecord.value.STATUS || 0)
})

const isReadOnly = computed(() => {
  return currentConsentStatus.value === 1 // Read only bila sudah disahkan petugas
})

const currentStatusText = computed(() => {
  if (currentConsentStatus.value === 1) return 'Dokumen Sah / Selesai'
  if (currentConsentStatus.value === 2 && form.TTD_PASIEN_BASE64) return 'Menunggu Verifikasi Petugas Loket'
  return 'Perlu Tanda Tangan Pasien'
})

const currentTemplateTitle = computed(() => {
  if (form.JENIS_PELAYANAN === 2) return 'General Consent Rawat Inap'
  return 'General Consent Rawat Jalan / IGD'
})

const getDocumentName = (item) => {
  if (item?.DOKUMEN_NAMA) return item.DOKUMEN_NAMA
  if (item?.JENIS_PELAYANAN === 2 || item?.TEMPLATE_KODE === 'S02_RANAP') {
    return 'Persetujuan Umum Rawat Inap'
  }
  return 'Persetujuan Umum Rawat Jalan/IGD'
}

const getDocumentSubtitle = (item) => {
  if (item?.JENIS_PELAYANAN === 2 || item?.TEMPLATE_KODE === 'S02_RANAP') {
    return 'Surat persetujuan rawat inap & tata tertib RS'
  }
  return 'Surat pernyataan otorisasi tindakan medis awal'
}

const formatPenjamin = (penjaminStr) => {
  if (!penjaminStr) return 'Umum (Mandiri)'
  const upper = penjaminStr.toUpperCase()
  if (upper === 'UMUM') return 'Umum (Mandiri)'
  if (upper.includes('BPJS')) return 'BPJS (JKN)'
  return penjaminStr
}

const formatTanggalWaktu = (tglStr) => {
  if (!tglStr) return '-'
  try {
    const parts = tglStr.trim().split(' ')
    const datePart = parts[0]
    const timePart = parts[1] || '00:00'

    const dParts = datePart.split('-')
    if (dParts.length === 3) {
      const year = dParts[0]
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
      const mIdx = parseInt(dParts[1], 10) - 1
      const monthStr = monthNames[mIdx] || dParts[1]
      const day = dParts[2]
      return `${day} ${monthStr} ${year}, ${timePart} WIB`
    }
    return `${tglStr} WIB`
  } catch {
    return `${tglStr} WIB`
  }
}

// Buka Modal Rincian / Verifikasi Dokumen
const openDetailModal = (item) => {
  selectedModalItem.value = item
  showDetailModal.value = true
}

// Bagikan Tautan Dokumen (Web Share API / Copy Link)
const shareDocument = async (item) => {
  if (!item.DOC_UUID) {
    alertMessage.value = 'Dokumen belum memiliki berkas digital sah untuk dibagikan.'
    alertType.value = 'error'
    return
  }

  const url = consentService.getPdfUrl(item.DOC_UUID)
  const fullUrl = url.startsWith('http') ? url : window.location.origin + url
  const title = getDocumentName(item) + ' - RSUD R.A.A. Tjokronegoro'

  if (navigator.share) {
    try {
      await navigator.share({
        title,
        text: `Dokumen e-Consent ${title} (No. Reg #${item.NOPEN})`,
        url: fullUrl
      })
      return
    } catch {
      // Batal atau fallback ke copy
    }
  }

  // Fallback Copy to Clipboard
  try {
    await navigator.clipboard.writeText(fullUrl)
    alertMessage.value = 'Tautan dokumen e-Consent berhasil disalin ke papan klip (clipboard)!'
    alertType.value = 'success'
  } catch {
    alertMessage.value = 'Tautan dokumen: ' + fullUrl
    alertType.value = 'success'
  }
}

// Fallback klausul jika backend template belum termuat
const fallbackRajalClauses = [
  {
    nomor: 'I',
    judul: 'PERSETUJUAN UNTUK PERAWATAN DAN PENGOBATAN',
    isi: 'Saya menyetujui perawatan di RSUD R.A.A Tjokronegoro sebagai pasien rawat Jalan/IGD tergantung kepada kebutuhan medis. Pengobatan dapat meliputi pemeriksaan X-Ray/Radiologi, pemberian dan atau tindakan medis serta penyuntikan (intramuskuler, intravena), pemeriksaan darah, perawatan rutin, dan prosedur pemberian cairan infuse.\nPersetujuan yang saya berikan tidak termasuk persetujuan untuk prosedur/tindakan invasive (operasi) atau tindakan yang mempunyai resiko tinggi.\nJika saya memutuskan untuk menghentikan perawatan medis untuk diri saya sendiri. Saya memahami dan menyadari bahwa RSUD R.A.A Tjokronegoro atau dokter tidak bertanggung jawab atas hasil yang merugikan saya.'
  },
  {
    nomor: 'II',
    judul: 'PERSETUJUAN PELEPASAN INFORMASI',
    isi: 'Saya memahami informasi yang ada di dalam diri saya, termasuk diagnosis, hasil laboratorium dan hasil tes Diagnostik yang akan digunakan untuk perawatan dan pengobatan, RSUD R.A.A Tjokronegoro akan menjamin kerahasiaannya.\nSaya memberi wewenang kepada RSUD R.A.A Tjokronegoro untuk memberikan sebagian informasi tentang diagnosis, hasil pelayanan dan pengobatan bila diperlukan untuk memproses klaim asuransi/perusahaan (pihak ketiga) dan atau lembaga pemerintah.'
  },
  {
    nomor: 'III',
    judul: 'HAK DAN TANGGUNG JAWAB PASIEN',
    isi: 'Saya memiliki hak untuk mengambil bagian dalam keputusan mengenai penyakit saya dan dalam hal perawatan medis dan rencana pengobatan.\nSaya telah mendapat informasi tentang hak dan tanggungjawab pasien di RSUD R.A.A Tjokronegoro melalui Leaflet dan Banner yang disediakan oleh petugas.'
  },
  {
    nomor: 'IV',
    judul: 'BARANG BERHARGA',
    isi: 'Saya memahami tidak boleh membawa barang berharga yang tidak diperlukan (perhiasan, elektronik, dll) di RSUD R.A.A Tjokronegoro dan jika saya membawanya maka RSUD R.A.A Tjokronegoro tidak bertanggungjawab atas kehilangan, kerusakan atau pencurian atas barang-barang pribadi dan barang berharga yang dibawa ke rumah sakit.'
  },
  {
    nomor: 'V',
    judul: 'PRIVASI',
    isi: 'Saya memberikan kuasa kepada RSUD R.A.A Tjokronegoro untuk menjaga Privasi dan kerahasiaan penyakit saya selama dalam perawatan.'
  },
  {
    nomor: 'VI',
    judul: 'INFORMASI BIAYA',
    isi: 'Saya memahami tentang informasi biaya pengobatan atau biaya tindakan yang dijelaskan oleh petugas rumah sakit, maka saya dan atau keluarga saya wajib untuk membayar biaya tindakan dengan Jaminan Kesehatan Nasional atau membayar secara pribadi sesuai dengan ketentuan yang berlaku di RSUD R.A.A Tjokronegoro.'
  },
  {
    nomor: 'VII',
    judul: 'INFORMASI PELAYANAN (RS PENDIDIKAN)',
    butir: [
      'Saya menyetujui perawatan di RSUD R.A.A Tjokronegoro sebagai pasien rawat inap oleh Dokter, Dokter Gigi, Dokter Spesialis/Dokter Spesialis Gigi, dan tenaga kesehatan lainnya yang akan memberikan perawatan serta tindakan medis yang diperlukan untuk membantu kesembuhan.',
      'Saya memahami bahwa RSUD R.A.A Tjokronegoro adalah Rumah Sakit Pendidikan, sehingga Saya bersedia menerima pelayanan kesehatan yang dilakukan oleh Dokter, Dokter Gigi, Dokter Spesialis/Dokter Spesialis Gigi, dan tenaga kesehatan lainnya yang masih mengikuti pendidikan sesuai dengan kompetensinya.'
    ]
  }
]

const fallbackRanapClauses = [
  {
    nomor: 'I',
    judul: 'HAK DAN KEWAJIBAN SEBAGAI PASIEN',
    isi: 'Saya sudah mendapatkan informasi dan telah memahami tentang peraturan/tata tertib dan persyaratan kelengkapan administrasi pasien rawat inap di RSUD R.A.A Tjokronegoro, juga hak dan kewajiban serta bersedia mematuhi semua peraturan yang telah ditetapkan oleh RSUD R.A.A Tjokronegoro.'
  },
  {
    nomor: 'II',
    judul: 'PERAWATAN DAN PENGOBATAN',
    butir: [
      'Saya menyetujui pasien dirawat di RSUD R.A.A Tjokronegoro Kabupaten Purworejo sebagai pasien rawat inap oleh Dokter, Dokter Gigi, Dokter Spesialis/Dokter Spesialis Gigi, dan tenaga kesehatan lainnya yang akan memberikan perawatan serta tindakan medis yang diperlukan untuk membantu kesembuhan.',
      'Apabila dalam pemeriksaan dan pengobatan ternyata memerlukan tindakan kedokteran dan anestesi maka akan dilakukan pemberian persetujuan/penolakan dengan menggunakan formulir khusus (informed consent).'
    ]
  },
  {
    nomor: 'III',
    judul: 'PELEPASAN INFORMASI',
    isi: 'Saya memberikan kewenangan kepada RSUD R.A.A Tjokronegoro untuk menyampaikan informasi kesehatan pasien kepada anggota keluarga yang ditunjuk.'
  },
  {
    nomor: 'IV',
    judul: 'HAK DAN TANGGUNG JAWAB PASIEN',
    butir: [
      'Pasien berhak untuk mengambil bagian dalam memberikan keputusan mengenai penyakitnya dan dalam hal perawatan medis serta rencana pengobatan.',
      'Pasien bersedia memberikan data dengan benar dan menerima pendidikan kesehatan untuk pasien dan keluarga.',
      'Pasien setuju RSUD R.A.A. Tjokronegoro Kabupaten Purworejo wajib menjamin kerahasiaan informasi medis pasien baik untuk kepentingan keperawatan, pengobatan, pendidikan, maupun pelatihan.'
    ]
  },
  {
    nomor: 'V',
    judul: 'BARANG BERHARGA',
    isi: 'Saya bertanggung jawab terhadap keamanan barang – barang berharga, baik milik saya, pasien, maupun keluarga. Dan apabila dalam kondisi tidak sadar, maka barang berharga pasien dititipkan di rumah sakit.'
  },
  {
    nomor: 'VI',
    judul: 'PRIVASI',
    isi: 'Saya menginginkan/tidak menginginkan*) privasi khusus terhadap pasien selama dirawat.'
  },
  {
    nomor: 'VII',
    judul: 'PERSETUJUAN KEHADIRAN PESERTA DIDIK',
    isi: 'Saya menyadari bahwa RSUD R.A.A. Tjokronegoro Kabupaten Purworejo adalah Rumah Sakit Pendidikan sehingga pelayanan dapat mengikutsertakan peserta didik. Saya mengerti bahwa kemungkinan peserta didik akan berpartisipasi dalam mengembangkan ilmu pengetahuan demi keselamatan pasien.'
  },
  {
    nomor: 'VIII',
    judul: 'KEWAJIBAN PEMBIAYAAN',
    butir: [
      'Saya memahami tentang informasi biaya pengobatan atau tindakan yang dijelaskan oleh petugas rumah sakit.',
      'Pada perawatan ini, saya menggunakan cara pembiayaan Umum / Umum Keringanan / BPJS / Jasa Raharja / Asuransi lain*).',
      'Saya memahami tentang persyaratan pembiayaan pengobatan atau tindakan yang dijelaskan oleh petugas rumah sakit.'
    ]
  },
  {
    nomor: 'IX',
    judul: 'TAMBAHAN KHUSUS PASIEN BPJS',
    butir: [
      'Saya menyetujui penggunaan obat Generik/Formularium Nasional atau obat – obat yang ada dalam Formularium RSUD R.A.A Tjokronegoro.',
      'Apabila pasien dalam perawatan periode ini menolak penggunaan obat Generik atau menginginkan obat yang tidak ada dalam Fornas atau tidak ada dalam formularium RSUD R.A.A Tjokronegoro, maka saya bersedia merubah cara pembiayaan saya menjadi pembiayaan umum (bayar sendiri) dan tidak menggunakan jaminan BPJS.',
      'Saya akan mengikuti peraturan yang berlaku tentang ketentuan pindah kelas rawat inap, yaitu hanya diperkenankan untuk satu kali perubahan kelas dalam satu periode perawatan dan mematuhi ketentuan iuran biaya sesuai ketetapan pemerintah. Jika saya tidak mengikuti peraturan tersebut, maka saya akan kehilangan hak saya sebagai peserta BPJS dan harus membiayai sendiri seluruh biaya perawatan saya.'
    ]
  },
  {
    nomor: 'X',
    judul: 'PENEGASAN PERAWATAN RAWAT INAP',
    isi: 'Melalui dokumen ini saya menegaskan kembali bahwa saya mempercayakan kepada semua tenaga kesehatan rumah sakit untuk memberikan perawatan, diagnostik dan terapi kepada pasien sebagai pasien rawat inap termasuk seluruh penunjang yang dibutuhkan untuk pengobatan dan tindakan yang aman.'
  }
]

// Poin klausul aktif yang di-render
const activeClauses = computed(() => {
  if (activeTemplate.value?.klausul && Array.isArray(activeTemplate.value.klausul) && activeTemplate.value.klausul.length > 0) {
    return activeTemplate.value.klausul
  }
  return form.JENIS_PELAYANAN === 2 ? fallbackRanapClauses : fallbackRajalClauses
})

// Helper pencocokan klausul khusus
const isPelepasanInfoClause = (kl) => {
  const judul = (kl?.judul || '').toUpperCase()
  return judul.includes('PELEPASAN INFORMASI') || kl?.nomor === 'II' || (form.JENIS_PELAYANAN === 2 && kl?.nomor === 'III')
}

const isPrivasiClause = (kl) => {
  const judul = (kl?.judul || '').toUpperCase()
  return (judul.includes('PRIVASI') && !judul.includes('PELEPASAN')) || kl?.nomor === 'V' || (form.JENIS_PELAYANAN === 2 && kl?.nomor === 'VI')
}

const isPembiayaanClause = (kl) => {
  const judul = (kl?.judul || '').toUpperCase()
  return judul.includes('BIAYA') || judul.includes('PEMBIAYAAN') || kl?.nomor === 'VI' || (form.JENIS_PELAYANAN === 2 && kl?.nomor === 'VIII')
}

const onSignatureChange = (dataUrl) => {
  form.TTD_PASIEN_BASE64 = dataUrl
}

// Setup Infinite Scroll Observer
const setupObserver = () => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
  if (!loadMoreTrigger.value) return

  observer = new IntersectionObserver((entries) => {
    const target = entries[0]
    if (
      target.isIntersecting &&
      hasMore.value &&
      !loadingList.value &&
      !loadingMore.value &&
      consentList.value.length > 0
    ) {
      page.value++
      loadConsentList(false)
    }
  }, { threshold: 0.1, rootMargin: '100px' })

  observer.observe(loadMoreTrigger.value)
}

// 1. Ambil daftar persetujuan milik pasien (NORM) dengan Pagination & Deduplikasi
const loadConsentList = async (reset = true) => {
  if (reset) {
    loadingList.value = true
    page.value = 1
    hasMore.value = true
    alertMessage.value = ''
  } else {
    loadingMore.value = true
  }

  try {
    const norm = String(authStore.userNorm || authStore.userName || '').trim()
    const res = await consentService.getList(norm, page.value, pageSize)
    if (res && res.success && Array.isArray(res.data)) {
      const items = res.data

      if (reset) {
        // Deduplikasi NOPEN di sisi frontend sebagai perlindungan ganda
        const seenNopen = new Set()
        consentList.value = items.filter(c => {
          if (!c.NOPEN || seenNopen.has(c.NOPEN)) return false
          seenNopen.add(c.NOPEN)
          return true
        })
      } else {
        const existingNopens = new Set(consentList.value.map(c => c.NOPEN))
        const newItems = items.filter(c => c.NOPEN && !existingNopens.has(c.NOPEN))
        consentList.value = [...consentList.value, ...newItems]
      }

      if (res.pagination && typeof res.pagination.has_more === 'boolean') {
        hasMore.value = res.pagination.has_more
      } else {
        hasMore.value = items.length >= pageSize
      }
    } else {
      if (reset) consentList.value = []
      hasMore.value = false
    }
  } catch (err) {
    if (reset) consentList.value = []
    hasMore.value = false
    const msg = err.response?.data?.message || err.message || 'Gagal memuat daftar e-Consent.'
    alertMessage.value = msg
    alertType.value = 'error'
  } finally {
    loadingList.value = false
    loadingMore.value = false
    await nextTick()
    setupObserver()
  }
}

// 2. Buka Form e-Consent untuk pendaftaran tertentu
const openConsentForm = async (nopen) => {
  form.NOPEN = String(nopen).trim()
  viewMode.value = 'form'
  await loadDetailConsent(form.NOPEN)
}

// 3. Kembali ke Daftar e-Consent
const backToList = async () => {
  viewMode.value = 'list'
  router.replace({ path: '/e-consent' })
  await loadConsentList(true)
}

// 4. Muat detail consent dan klausul template
const loadDetailConsent = async (nopen) => {
  loadingDetail.value = true
  alertMessage.value = ''

  try {
    const res = await consentService.getInfo(nopen)
    if (res && res.success && res.data) {
      patientData.value = res.data.pasien || res.data.Pasien
      consentRecord.value = res.data.consent || res.data.Consent

      form.NOPEN = String(nopen)
      form.NORM = String(patientData.value?.NORM || authStore.userNorm || '')

      // Tentukan format pelayanan (Rajal vs Ranap)
      if (consentRecord.value?.JENIS_PELAYANAN) {
        form.JENIS_PELAYANAN = Number(consentRecord.value.JENIS_PELAYANAN)
      } else if (consentRecord.value?.TEMPLATE_KODE === 'S02_RANAP') {
        form.JENIS_PELAYANAN = 2
      } else {
        form.JENIS_PELAYANAN = 1
      }

      form.TEMPLATE_KODE = form.JENIS_PELAYANAN === 2 ? 'S02_RANAP' : 'S02_1_RAJAL_IGD'

      // Isi form jika sudah ada riwayat
      if (consentRecord.value) {
        form.IS_WALI = consentRecord.value.PEMBERI_PERSETUJUAN === 2 ? 1 : 0
        form.NAMA_PENANGGUNG_JAWAB = consentRecord.value.NAMA_PENANGGUNG_JAWAB || ''
        form.HUBUNGAN = consentRecord.value.HUBUNGAN || ''
        form.NO_HP_PENANGGUNG_JAWAB = consentRecord.value.NO_HP_PENANGGUNG_JAWAB || ''
        form.ALAMAT_PENANGGUNG_JAWAB = consentRecord.value.ALAMAT_PENANGGUNG_JAWAB || ''
        form.KELUARGA_DIBERI_INFORMASI = consentRecord.value.KELUARGA_DIBERI_INFORMASI || ''
        form.PRIVASI_KHUSUS = consentRecord.value.PRIVASI_KHUSUS || ''
        form.TTD_PASIEN_BASE64 = consentRecord.value.TTD_PASIEN_BASE64 || ''
      } else {
        form.IS_WALI = 0
        form.NAMA_PENANGGUNG_JAWAB = patientData.value?.NAMA || ''
        form.HUBUNGAN = 'Diri Sendiri'
        form.TTD_PASIEN_BASE64 = ''
      }

      // Muat template klausul dari database
      await loadTemplateData(form.TEMPLATE_KODE)

      // Pasang gambar TTD jika sudah ada
      await nextTick()
      if (signaturePadRef.value && form.TTD_PASIEN_BASE64) {
        signaturePadRef.value.loadFromDataURL(
          form.TTD_PASIEN_BASE64,
          isReadOnly.value
        )
      }
    } else {
      alertMessage.value = res?.message || 'Gagal memuat informasi e-Consent.'
      alertType.value = 'error'
    }
  } catch (err) {
    const msg = err.response?.data?.message || err.message || 'Terjadi kesalahan saat memuat berkas e-Consent.'
    alertMessage.value = msg
    alertType.value = 'error'
  } finally {
    loadingDetail.value = false
  }
}

// 5. Muat template klausul dari backend
const loadTemplateData = async (kode) => {
  try {
    const res = await consentService.getTemplate(kode)
    if (res && res.success && res.data) {
      if (typeof res.data.content_json === 'string') {
        try {
          activeTemplate.value = JSON.parse(res.data.content_json)
        } catch {
          activeTemplate.value = null
        }
      } else if (res.data.content_json && typeof res.data.content_json === 'object') {
        activeTemplate.value = res.data.content_json
      }
    }
  } catch {
    activeTemplate.value = null
  }
}

// 6. Simpan Consent (Hanya sampai simpan draf persetujuan pasien)
const submitConsent = async () => {
  if (!form.TTD_PASIEN_BASE64) {
    alertMessage.value = 'Silakan bubuhkan tanda tangan pada kotak kanvas tanda tangan elektronik.'
    alertType.value = 'error'
    return
  }

  if (form.IS_WALI === 1 && (!form.NAMA_PENANGGUNG_JAWAB.trim() || !form.HUBUNGAN.trim())) {
    alertMessage.value = 'Nama lengkap penanggung jawab dan hubungan wajib diisi jika persetujuan diwakilkan.'
    alertType.value = 'error'
    return
  }

  saving.value = true
  alertMessage.value = ''

  try {
    const payload = {
      NOPEN: String(form.NOPEN),
      NORM: String(form.NORM || patientData.value?.NORM || authStore.userNorm || ''),
      JENIS_PELAYANAN: form.JENIS_PELAYANAN,
      TEMPLATE_KODE: form.TEMPLATE_KODE,
      PEMBERI_PERSETUJUAN: form.IS_WALI === 1 ? 2 : 1,
      NAMA_PENANGGUNG_JAWAB: form.IS_WALI === 1 ? form.NAMA_PENANGGUNG_JAWAB : (patientData.value?.NAMA || ''),
      HUBUNGAN: form.IS_WALI === 1 ? form.HUBUNGAN : 'Diri Sendiri',
      NO_HP_PENANGGUNG_JAWAB: form.NO_HP_PENANGGUNG_JAWAB || '',
      ALAMAT_PENANGGUNG_JAWAB: form.ALAMAT_PENANGGUNG_JAWAB || '',
      KELUARGA_DIBERI_INFORMASI: form.KELUARGA_DIBERI_INFORMASI || '',
      SETUJU_PELEPASAN_INFORMASI: 1,
      SETUJU_HAK_KEWAJIBAN: 1,
      SETUJU_RAWAT_INAP_UMUM: 1,
      SETUJU_ATURAN_RS: 1,
      PRIVASI_KHUSUS: form.PRIVASI_KHUSUS || '',
      TTD_PASIEN_BASE64: form.TTD_PASIEN_BASE64,
      LOKASI_KOORDINAT: form.LOKASI_KOORDINAT || '-7.740337, 109.995818'
    }

    const res = await consentService.saveDraft(payload)
    if (res && res.success) {
      alertMessage.value = 'Persetujuan (e-Consent) berhasil disimpan dan dikirimkan ke petugas loket untuk diverifikasi.'
      alertType.value = 'success'
      await loadDetailConsent(form.NOPEN)
    } else {
      alertMessage.value = res?.message || 'Gagal menyimpan persetujuan.'
      alertType.value = 'error'
    }
  } catch (err) {
    const msg = err.response?.data?.message || err.message || 'Terjadi kesalahan jaringan.'
    alertMessage.value = 'Gagal menyimpan: ' + msg
    alertType.value = 'error'
  } finally {
    saving.value = false
  }
}

const refreshCurrentView = async () => {
  if (viewMode.value === 'form' && form.NOPEN) {
    await loadDetailConsent(form.NOPEN)
  } else {
    await loadConsentList(true)
  }
}

// Inisialisasi Deteksi GPS Geolocation
const detectLocation = () => {
  if (typeof window !== 'undefined' && navigator?.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(6)
        const lng = pos.coords.longitude.toFixed(6)
        const acc = Math.round(pos.coords.accuracy)
        form.LOKASI_KOORDINAT = `${lat}, ${lng} (±${acc}m)`
      },
      () => {
        // Fallback default RSUD R.A.A. Tjokronegoro
        form.LOKASI_KOORDINAT = '-7.740337, 109.995818'
      },
      { timeout: 7000 }
    )
  }
}

onMounted(async () => {
  detectLocation()

  // Cek apakah ada query param ?nopen=... di URL
  const queryNopen = route.query.nopen ? String(route.query.nopen).trim() : ''
  if (queryNopen) {
    await openConsentForm(queryNopen)
  } else {
    viewMode.value = 'list'
    await loadConsentList(true)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
})
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.25s ease-out forwards;
}
</style>
