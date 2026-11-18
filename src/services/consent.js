import axios from 'axios'
import { secureStorage } from '../utils/secureStorage'

// Di dev server proxied ke http://127.0.0.1:8088/api, di production diproxy oleh Apache /rstn-api
const CONSENT_API_BASE = import.meta.env.VITE_CONSENT_API_URL || '/rstn-api'

const consentClient = axios.create({
  baseURL: CONSENT_API_BASE,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// Pasang interceptor otomatis melampirkan Bearer token JWT dari sapa_rstn
consentClient.interceptors.request.use(
  (config) => {
    const token = secureStorage.get('sapa_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor — sanitasi error SQL di mode production
consentClient.interceptors.response.use(
  (response) => {
    const msg = response?.data?.message
    if (typeof msg === 'string' && (msg.includes('SQLSTATE') || msg.includes('syntax error'))) {
      if (import.meta.env.PROD) {
        response.data.message = 'Terjadi kendala pada server saat memproses data persetujuan.'
      }
    }
    return response
  },
  (error) => {
    const msg = error.response?.data?.message
    if (typeof msg === 'string' && (msg.includes('SQLSTATE') || msg.includes('syntax error') || msg.includes('Base table'))) {
      if (import.meta.env.PROD) {
        error.response.data.message = 'Terjadi kendala pada server saat memproses data persetujuan.'
      }
    }
    return Promise.reject(error)
  }
)

export const consentService = {
  /**
   * Mengambil daftar dokumen General Consent yang berelasi dengan pasien (NORM)
   * @param {string} norm Nomor Rekam Medis Pasien
   * @param {number} page Halaman data (default: 1)
   * @param {number} limit Jumlah data per halaman (default: 10)
   */
  async getList(norm, page = 1, limit = 10) {
    const res = await consentClient.get(`/consent/list`, {
      params: { norm, page, limit, pageSize: limit }
    })
    return res.data
  },

  /**
   * Mengambil klausul dan template dokumen General Consent (Rajal / Ranap)
   * @param {string} kode Kode format template (cth: GC_RAJAL_IGD, GC_RANAP)
   */
  async getTemplate(kode) {
    const res = await consentClient.get(`/consent/template`, {
      params: { kode }
    })
    return res.data
  },

  /**
   * Mengambil informasi pendaftaran, data pasien, dan status persetujuan General Consent
   * @param {string} nopen Nomor pendaftaran atau nomor kunjungan pasien
   */
  async getInfo(nopen) {
    const res = await consentClient.get(`/consent/info`, {
      params: { nopen }
    })
    return res.data
  },

  /**
   * Menyimpan draft pilihan persetujuan & tanda tangan digital pasien/wali dari SAPA RSTN
   * @param {Object} payload Data persetujuan & base64 canvas tanda tangan
   */
  async saveDraft(payload) {
    const res = await consentClient.post(`/consent/save-draft`, payload)
    return res.data
  },

  /**
   * Mengambil data verifikasi dokumen TTE dari API (Publik)
   * @param {string} docUUID UUID dokumen
   */
  async verifyDoc(docUUID) {
    const res = await consentClient.get(`/consent/verify/${encodeURIComponent(docUUID)}`, {
      headers: {
        'Accept': 'application/json'
      }
    })
    return res.data
  },

  /**
   * URL untuk menampilkan / mengunduh berkas PDF General Consent
   * @param {string} docUUID UUID dokumen di document storage
   */
  getPdfUrl(docUUID) {
    return `${CONSENT_API_BASE}/consent/pdf/${encodeURIComponent(docUUID)}`
  },

  /**
   * URL verifikasi publik keabsahan tanda tangan elektronik via QR Code
   * @param {string} docUUID UUID dokumen
   */
  getVerifyUrl(docUUID) {
    return `${CONSENT_API_BASE}/consent/verify/${encodeURIComponent(docUUID)}`
  }
}

export default consentService

