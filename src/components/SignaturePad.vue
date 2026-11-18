<template>
  <div class="flex flex-col gap-2">
    <div class="flex items-center justify-between gap-2 flex-wrap">
      <label v-if="label" class="text-xs font-bold text-gray-700">
        {{ label }} <span v-if="required" class="text-rose-500">*</span>
      </label>

      <div class="flex items-center gap-1.5 ml-auto">
        <!-- Pilihan Warna Tinta -->
        <div v-if="!isLocked" class="flex items-center gap-1 mr-2 px-1.5 py-0.5 rounded-lg bg-gray-100 border border-gray-200">
          <button
            type="button"
            @click="setColor('#000000')"
            class="w-4 h-4 rounded-full transition cursor-pointer"
            :class="activeColor === '#000000' ? 'ring-2 ring-gray-700 scale-110' : 'opacity-40 hover:opacity-100'"
            style="background-color: #000000;"
            title="Tinta Hitam"
          ></button>
          <button
            type="button"
            @click="setColor('#1e40af')"
            class="w-4 h-4 rounded-full transition cursor-pointer"
            :class="activeColor === '#1e40af' ? 'ring-2 ring-blue-600 scale-110' : 'opacity-40 hover:opacity-100'"
            style="background-color: #1e40af;"
            title="Tinta Biru Pulpen"
          ></button>
        </div>

        <!-- Status & Tombol Jika Terkunci -->
        <template v-if="isLocked">
          <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[11px] font-bold bg-gray-100 text-gray-700 border border-gray-300">
            <svg class="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Tersimpan
          </span>

          <button
            v-if="allowUnlock"
            type="button"
            @click="unlock"
            class="px-2.5 py-1 text-[11px] font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-lg transition flex items-center gap-1 cursor-pointer"
          >
            <svg class="w-3 h-3 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
            </svg>
            Ubah TTD
          </button>
        </template>

        <!-- Tombol Jika Belum Terkunci -->
        <template v-else>
          <button
            type="button"
            @click="clear"
            :disabled="isEmptyState"
            class="px-2.5 py-1 text-[11px] font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition flex items-center gap-1 cursor-pointer"
          >
            <svg class="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Bersihkan
          </button>
        </template>
      </div>
    </div>

    <!-- Canvas Wrapper (Rasio 2 : 1) -->
    <div
      ref="wrapperRef"
      :class="[
        'relative w-full rounded-2xl overflow-hidden shadow-inner transition select-none bg-white',
        isLocked
          ? 'border-2 border-gray-300'
          : 'border-2 border-dashed border-gray-300 hover:border-gray-400 focus-within:border-gray-500'
      ]"
      :style="{ aspectRatio: '2 / 1', width: '100%' }"
    >
      <canvas
        ref="canvasRef"
        :class="[
          'w-full h-full touch-none',
          isLocked ? 'cursor-default pointer-events-none' : 'cursor-crosshair'
        ]"
        @mousedown="startDrawing"
        @mousemove="draw"
        @mouseup="stopDrawing"
        @mouseleave="stopDrawing"
        @touchstart.prevent="handleTouchStart"
        @touchmove.prevent="handleTouchMove"
        @touchend.prevent="stopDrawing"
      ></canvas>

      <!-- Badge Pojok Kanan Atas Ketika Terkunci -->
      <div
        v-if="isLocked"
        class="pointer-events-none absolute top-2 right-2 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gray-700 text-white text-[10px] font-bold shadow-xs select-none"
      >
        <svg class="w-3 h-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        Tanda Tangan Siap
      </div>

      <!-- Placeholder Text if Empty -->
      <div
        v-if="isEmptyState"
        class="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-gray-400 select-none p-4 text-center"
      >
        <svg class="w-8 h-8 mb-1.5 opacity-40 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
        <span class="text-xs font-medium">{{ placeholder || 'Goreskan tanda tangan Anda di sini menggunakan jari atau stylus' }}</span>
      </div>

      <!-- Bottom baseline guide line -->
      <div class="pointer-events-none absolute bottom-4 left-6 right-6 border-b border-dashed border-gray-200"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'

const props = defineProps({
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  required: { type: Boolean, default: false },
  height: { type: Number, default: 180 },
  strokeColor: { type: String, default: '#0f172a' },
  strokeWidth: { type: Number, default: 2.4 },
  allowUnlock: { type: Boolean, default: true },
  initialLocked: { type: Boolean, default: false }
})

const emit = defineEmits(['change', 'lock-change', 'update:locked'])

const wrapperRef = ref(null)
const canvasRef = ref(null)
const isDrawing = ref(false)
const isEmptyState = ref(true)
const isLocked = ref(Boolean(props.initialLocked))
const activeColor = ref(props.strokeColor || '#000000')
let ctx = null
let dpr = 1

const setColor = (color) => {
  activeColor.value = color
  if (ctx) {
    ctx.strokeStyle = color
  }
}

watch(() => props.initialLocked, (val) => {
  isLocked.value = Boolean(val)
})

const setupCanvas = () => {
  if (!canvasRef.value || !wrapperRef.value) return
  const canvas = canvasRef.value
  const rect = wrapperRef.value.getBoundingClientRect()
  dpr = window.devicePixelRatio || 1

  // Set visual size rasio 2 : 1 (tinggi = lebar / 2)
  const targetWidth = rect.width || 300
  const targetHeight = Math.round(targetWidth / 2)

  canvas.width = targetWidth * dpr
  canvas.height = targetHeight * dpr
  canvas.style.width = `${targetWidth}px`
  canvas.style.height = `${targetHeight}px`

  ctx = canvas.getContext('2d')
  ctx.scale(dpr, dpr)
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.strokeStyle = activeColor.value
  ctx.lineWidth = props.strokeWidth
}

const getCoordinates = (e) => {
  if (!canvasRef.value) return { x: 0, y: 0 }
  const rect = canvasRef.value.getBoundingClientRect()
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  }
}

const startDrawing = (e) => {
  if (isLocked.value) return
  isDrawing.value = true
  if (isEmptyState.value) {
    isEmptyState.value = false
  }
  const { x, y } = getCoordinates(e)
  ctx.beginPath()
  ctx.moveTo(x, y)
}

const draw = (e) => {
  if (isLocked.value || !isDrawing.value) return
  const { x, y } = getCoordinates(e)
  ctx.lineTo(x, y)
  ctx.stroke()
}

const stopDrawing = () => {
  if (isDrawing.value) {
    isDrawing.value = false
    ctx.closePath()
    emit('change', toDataURL())
  }
}

const handleTouchStart = (e) => {
  if (isLocked.value) return
  if (e.touches && e.touches.length > 0) {
    startDrawing(e.touches[0])
  }
}

const handleTouchMove = (e) => {
  if (isLocked.value) return
  if (e.touches && e.touches.length > 0) {
    draw(e.touches[0])
  }
}

const lock = () => {
  if (isEmptyState.value) return
  isLocked.value = true
  emit('lock-change', true)
  emit('update:locked', true)
}

const unlock = () => {
  isLocked.value = false
  emit('lock-change', false)
  emit('update:locked', false)
}

const clear = () => {
  if (!ctx || !canvasRef.value) return
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
  isEmptyState.value = true
  isLocked.value = false
  emit('change', '')
  emit('lock-change', false)
  emit('update:locked', false)
}

const toDataURL = () => {
  if (isEmptyState.value || !canvasRef.value) return ''
  // Mengembalikan data PNG transparan murni agar goresan tanda tangan dapat menimpa teks/elemen secara alami (layer backward) tanpa blok latar belakang putih
  return canvasRef.value.toDataURL('image/png')
}

const loadFromDataURL = (dataUrl, autoLock = true) => {
  if (!dataUrl || !ctx || !canvasRef.value) return
  const img = new Image()
  img.onload = () => {
    ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
    ctx.drawImage(img, 0, 0, canvasRef.value.width / dpr, canvasRef.value.height / dpr)
    isEmptyState.value = false
    if (autoLock) {
      isLocked.value = true
      emit('lock-change', true)
      emit('update:locked', true)
    }
  }
  img.src = dataUrl
}

defineExpose({
  clear,
  lock,
  unlock,
  toDataURL,
  loadFromDataURL,
  isEmpty: () => isEmptyState.value,
  isLocked: () => isLocked.value
})

let resizeObserver = null

onMounted(async () => {
  await nextTick()
  setupCanvas()

  if (window.ResizeObserver && wrapperRef.value) {
    resizeObserver = new ResizeObserver(() => {
      const current = toDataURL()
      setupCanvas()
      if (current) loadFromDataURL(current, isLocked.value)
    })
    resizeObserver.observe(wrapperRef.value)
  }
})

onBeforeUnmount(() => {
  if (resizeObserver) resizeObserver.disconnect()
})
</script>

