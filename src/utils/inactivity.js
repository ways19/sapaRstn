/**
 * Inactivity Tracker untuk SAPA RSTN
 * Melakukan auto-logout jika pengguna/pasien tidak beraktivitas dalam durasi tertentu
 * Standar keamanan rekam medis: 20 menit
 */

let inactivityTimer = null
let onTimeoutCallback = null
const INACTIVITY_TIMEOUT_MS = 20 * 60 * 1000 // 20 Menit

const ACTIVITY_EVENTS = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart', 'click']

export function setupInactivityWatcher(logoutFn) {
  if (typeof window === 'undefined') return
  onTimeoutCallback = logoutFn

  const resetTimer = () => {
    if (inactivityTimer) clearTimeout(inactivityTimer)
    inactivityTimer = setTimeout(() => {
      if (typeof onTimeoutCallback === 'function') {
        onTimeoutCallback()
      }
    }, INACTIVITY_TIMEOUT_MS)
  }

  // Pasang event listener pasif untuk efisiensi render
  ACTIVITY_EVENTS.forEach((event) => {
    window.addEventListener(event, resetTimer, { passive: true })
  })

  // Inisialisasi awal
  resetTimer()
}

export function cleanupInactivityWatcher() {
  if (inactivityTimer) {
    clearTimeout(inactivityTimer)
    inactivityTimer = null
  }
}
