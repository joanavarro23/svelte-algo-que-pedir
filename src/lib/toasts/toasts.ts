// src/lib/stores/toast.ts
import { writable } from 'svelte/store'

export type ToastType = 'error' | 'info' | 'success' | 'warning'

export interface Toast {
  message: string
  type?: ToastType
  duration?: number // en ms
}

export const toast = writable<Toast | null>(null)

/**
 * Muestra un toast
 * @param message Texto del toast
 * @param type Tipo de toast: 'error' | 'info' | 'success' | 'warning'
 * @param duration Tiempo que se muestra el toast en ms (por defecto 3000)
 */
export function showToast(message: string, type?: ToastType, duration: number = 3000) {
  toast.set({ message, type, duration })

  if (duration > 0) {
    setTimeout(() => toast.set(null), duration)
  }
}

/**
 * Oculta el toast manualmente
 */
export function hideToast() {
  toast.set(null)
}
