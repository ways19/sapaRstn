/**
 * Utilitas bersama untuk penggabungan, pengurutan, dan format jadwal reservasi & antrian farmasi.
 */

export function getTodayStr(now = new Date()) {
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function isHariIni(tglStr, now = new Date()) {
  if (!tglStr) return false
  return String(tglStr).trim().startsWith(getTodayStr(now))
}

export function isExpiredReservasi(tglKunjungan, jamPraktek, now = new Date()) {
  if (!tglKunjungan) return true

  let endHour = 23
  let endMinute = 59

  if (jamPraktek && typeof jamPraktek === 'string') {
    const parts = jamPraktek.split('-')
    if (parts.length >= 2) {
      const timeMatch = parts[1].trim().match(/(\d{1,2})[:.](\d{2})/)
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

  const dateOnly = String(tglKunjungan).trim().slice(0, 10)
  const dateParts = dateOnly.split('-').map(Number)
  if (dateParts.length < 3 || dateParts.some(Number.isNaN)) return true

  const [year, month, day] = dateParts
  const serviceEndDateTime = new Date(year, month - 1, day, endHour, endMinute, 59)
  return now > serviceEndDateTime
}

export function formatJamEstimasi(jamStr) {
  if (!jamStr) return '-'
  return String(jamStr).trim().slice(0, 5)
}

export function formatJadwalDisplay(tglStr, jamStr, now = new Date()) {
  if (!tglStr) return '-'
  const today = getTodayStr(now)
  const dateOnly = String(tglStr).trim().slice(0, 10)
  const isToday = dateOnly === today
  const expired = isExpiredReservasi(dateOnly, jamStr, now)

  const d = new Date(`${dateOnly}T00:00:00`)
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ]
  const dayName = isNaN(d.getTime()) ? '' : days[d.getDay()]
  const dateFormatted = isNaN(d.getTime())
    ? dateOnly
    : `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`

  const datePrefix = isToday
    ? `Hari ini, ${dateFormatted}`
    : dayName
      ? `${dayName}, ${dateFormatted}`
      : dateFormatted

  let timePart = ''
  if (jamStr && typeof jamStr === 'string' && jamStr.trim() !== '-') {
    const cleanJam = jamStr.trim()
    if (cleanJam.includes('-')) {
      timePart = ` (${cleanJam.includes('WIB') ? cleanJam : `${cleanJam} WIB`})`
    } else {
      const hhmm = formatJamEstimasi(cleanJam)
      timePart = ` (${hhmm} WIB)`
    }
  }

  const expiredPart = expired && !isToday ? ' • Selesai' : ''
  return `${datePrefix}${timePart}${expiredPart}`
}

export function mergeAndSortReservasi(reservasiList = [], bpjsKontrol = null, now = new Date()) {
  const today = getTodayStr(now)
  const items = []
  const seenCodes = new Set()

  const bpjsEntries = Array.isArray(bpjsKontrol)
    ? bpjsKontrol
    : bpjsKontrol && typeof bpjsKontrol === 'object' && Object.keys(bpjsKontrol).length > 0
      ? [bpjsKontrol]
      : []

  for (const b of bpjsEntries) {
    if (!b || typeof b !== 'object' || Object.keys(b).length === 0) continue
    const code = String(b.ID || b.kodeBooking || b.NO_REF_BPJS || 'BPJS-KONTROL')
    if (seenCodes.has(code)) continue
    seenCodes.add(code)

    const tgl = String(b.TANGGALKUNJUNGAN || today).trim().slice(0, 10)
    const jam = b.ESTIMASI_PELAYANAN || '09:00 - 12:00'
    items.push({
      isBpjs: true,
      kodeBooking: code,
      ID: b.ID || code,
      NOMOR_ANTRIAN: b.NOMOR_ANTRIAN || '01',
      namaPoli: b.poli || b.namaPoli || 'Poliklinik Rawat Jalan',
      namaDokter: b.namaDokter || '-',
      TANGGALKUNJUNGAN: tgl,
      JAM_PRAKTEK: jam,
      ESTIMASI_PELAYANAN: b.ESTIMASI_PELAYANAN || '',
      NO_REF_BPJS: b.NO_REF_BPJS || null,
      caraBayar: 'BPJS',
      isToday: tgl === today,
      isExpired: isExpiredReservasi(tgl, jam, now),
      raw: b
    })
  }

  if (Array.isArray(reservasiList)) {
    for (const item of reservasiList) {
      const code = String(item.kodeBooking || item.ID || '')
      if (code && seenCodes.has(code)) continue
      if (code) seenCodes.add(code)

      const tgl = String(item.TANGGALKUNJUNGAN || '').trim().slice(0, 10)
      const jam = item.JAM_PRAKTEK || item.ESTIMASI_PELAYANAN || '-'
      const isBpjs = String(item.caraBayar || '').toUpperCase().includes('BPJS')

      items.push({
        ...item,
        isBpjs,
        kodeBooking: code,
        ID: code,
        NOMOR_ANTRIAN: item.NOMOR_ANTRIAN || '-',
        namaPoli: item.namaPoli || 'Poliklinik Rawat Jalan',
        namaDokter: item.namaDokter || '-',
        TANGGALKUNJUNGAN: tgl,
        JAM_PRAKTEK: jam,
        ESTIMASI_PELAYANAN: item.ESTIMASI_PELAYANAN || '',
        NO_REF_BPJS: item.NO_REF_BPJS || null,
        caraBayar: item.caraBayar || 'UMUM',
        isToday: tgl === today,
        isExpired: isExpiredReservasi(tgl, jam, now)
      })
    }
  }

  const getTier = (item) => {
    if (item.isToday) return 0
    if (item.TANGGALKUNJUNGAN > today && !item.isExpired) return 1
    return 2
  }

  return items.slice().sort((a, b) => {
    const tierA = getTier(a)
    const tierB = getTier(b)
    if (tierA !== tierB) return tierA - tierB

    const jamA = a.ESTIMASI_PELAYANAN || a.JAM_PRAKTEK || ''
    const jamB = b.ESTIMASI_PELAYANAN || b.JAM_PRAKTEK || ''

    if (tierA === 0) return jamA.localeCompare(jamB)
    if (tierA === 1) {
      if (a.TANGGALKUNJUNGAN !== b.TANGGALKUNJUNGAN) {
        return a.TANGGALKUNJUNGAN.localeCompare(b.TANGGALKUNJUNGAN)
      }
      return jamA.localeCompare(jamB)
    }

    if (a.TANGGALKUNJUNGAN !== b.TANGGALKUNJUNGAN) {
      return b.TANGGALKUNJUNGAN.localeCompare(a.TANGGALKUNJUNGAN)
    }
    return jamB.localeCompare(jamA)
  })
}

export function getFarmasiStatusMeta(status) {
  switch (String(status || '')) {
    case '1':
      return {
        label: 'Menunggu Disiapkan',
        badgeClass: 'bg-amber-100 text-amber-800 border-amber-200',
        dotClass: 'bg-amber-500'
      }
    case '2':
      return {
        label: 'Sedang Disiapkan',
        badgeClass: 'bg-blue-100 text-blue-800 border-blue-200',
        dotClass: 'bg-blue-500 animate-pulse'
      }
    case '3':
      return {
        label: 'Obat Siap Diambil',
        badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        dotClass: 'bg-emerald-500'
      }
    default:
      return {
        label: 'Menunggu',
        badgeClass: 'bg-amber-100 text-amber-800 border-amber-200',
        dotClass: 'bg-amber-500'
      }
  }
}

export function getLoketLabel(loket) {
  if (!loket) return '-'
  const l = String(loket).trim().toUpperCase()
  if (l === 'A') return 'Loket A (Non Racikan)'
  if (l === 'B') return 'Loket B (Racikan)'
  return `Loket ${loket}`
}

