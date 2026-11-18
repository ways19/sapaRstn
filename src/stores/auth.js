import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../services/api'
import { secureStorage } from '../utils/secureStorage'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(secureStorage.get('sapa_token') || null)
  const user = ref(secureStorage.get('sapa_user', true) || null)
  const loading = ref(false)
  const error = ref(null)

  const isAuthenticated = computed(() => !!token.value)
  const userName = computed(() => user.value?.NORM || '')
  const userNorm = computed(() => user.value?.NORM || '')
  const namaPasien = computed(() => user.value?.NAMA || '')

  async function login(NORM, TANGGAL_LAHIR) {
    loading.value = true
    error.value = null

    try {
      const params = new URLSearchParams()
      params.append('NORM', NORM)
      params.append('TANGGAL_LAHIR', TANGGAL_LAHIR)

      const response = await api.post('/auth/login', params)
      const data = response.data

      if (data.code === '200') {
        token.value = data.data.access_token

        // Store patient details if returned, fallback to NORM
        const pasienData = data.data.pasien || { NORM, TANGGAL_LAHIR }
        user.value = { ...pasienData, NORM }

        // Simpan token dan data user secara terenkripsi AES
        secureStorage.set('sapa_token', data.data.access_token)
        secureStorage.set('sapa_user', user.value, true)

        return { success: true }
      } else {
        error.value = data.message || 'Login gagal'
        return { success: false, message: data.message }
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Koneksi ke server gagal. Coba lagi nanti.'
      error.value = message
      return { success: false, message }
    } finally {
      loading.value = false
    }
  }

  function fetchProfile() {
    const savedUser = secureStorage.get('sapa_user', true)
    if (savedUser) {
      user.value = savedUser
    }
    return user.value
  }

  function logout() {
    token.value = null
    user.value = null
    secureStorage.clearAuth()
  }

  return {
    token,
    user,
    loading,
    error,
    isAuthenticated,
    userName,
    userNorm,
    namaPasien,
    login,
    fetchProfile,
    logout
  }
})
