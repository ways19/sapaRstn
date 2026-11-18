import axios from 'axios'
import { secureStorage } from '../utils/secureStorage'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? '/api' : 'https://apirstjokro.purworejokab.go.id/gos2_plus/web/rsudapi')

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
  }
})

// Request interceptor — attach Bearer token
api.interceptors.request.use(
  (config) => {
    const token = secureStorage.get('sapa_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Fungsi pembantu untuk mendeteksi pesan error teknis database/SQL
const isTechnicalSqlError = (msg) => {
  if (typeof msg !== 'string') return false
  const lower = msg.toLowerCase()
  return (
    lower.includes('sqlstate') ||
    lower.includes('base table or view not found') ||
    lower.includes("table '") ||
    lower.includes('the sql being executed was') ||
    lower.includes('syntax error') ||
    lower.includes('database exception') ||
    lower.includes('query failed')
  )
}

// Response interceptor — handle 401 & sanitasi error teknis SQL di mode production
api.interceptors.response.use(
  (response) => {
    // Tangani jika respon 200 tetapi body memuat error database
    if (response?.data?.message && isTechnicalSqlError(response.data.message)) {
      if (import.meta.env.PROD) {
        response.data.message = 'Terjadi kendala pada sistem rumah sakit saat memproses data. Silakan coba beberapa saat lagi.'
      }
    }
    return response
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      secureStorage.clearAuth()
      window.location.href = '/login'
    }

    // Di mode production, jangan tampilkan dump query SQL mentah ke antarmuka pasien
    if (error.response?.data?.message && isTechnicalSqlError(error.response.data.message)) {
      if (import.meta.env.PROD) {
        error.response.data.message = 'Terjadi kendala pada sistem rumah sakit saat memproses data. Silakan coba beberapa saat lagi.'
      }
    }

    return Promise.reject(error)
  }
)

export default api
