import axios from 'axios'

// API 2: Base URL API Penyedia Webapps & Modul Pendamping RSUD
const VERIFY_API_BASE = import.meta.env.VITE_CONSENT_API_URL || '/rstn-api'

const verifyClient = axios.create({
  baseURL: VERIFY_API_BASE,
  timeout: 15000,
  headers: {
    'Accept': 'application/json'
  }
})

export const verifyService = {
  /**
   * Memverifikasi keabsahan dokumen elektronik apapun di RSUD R.A.A. Tjokronegoro (General Consent, Resume Medis, dll.)
   * @param {string} docUUID UUID unik dokumen
   * @returns {Promise<Object>} Metadata keabsahan dokumen
   */
  async verifyDocument(docUUID) {
    if (!docUUID) {
      throw new Error('UUID dokumen tidak boleh kosong')
    }

    try {
      // 1. Panggil endpoint modul verifikasi mandiri /verify/:uuid
      const res = await verifyClient.get(`/verify/${encodeURIComponent(docUUID)}`)
      return res.data
    } catch (err) {
      // Jika server mengembalikan 404 berformat JSON (dokumen tidak ditemukan / tidak valid)
      if (err.response?.data && typeof err.response.data.valid !== 'undefined') {
        return err.response.data
      }

      // 2. Fallback untuk kompatibilitas jika terhubung ke server lama (/consent/verify/:uuid)
      try {
        const fallback = await verifyClient.get(`/consent/verify/${encodeURIComponent(docUUID)}`)
        return fallback.data
      } catch (fallbackErr) {
        if (fallbackErr.response?.data && typeof fallbackErr.response.data.valid !== 'undefined') {
          return fallbackErr.response.data
        }
        throw err
      }
    }
  }
}

export default verifyService
