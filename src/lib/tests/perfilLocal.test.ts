import { Local } from '$lib/models/local.svelte'
import { describe, it, expect, beforeEach } from 'vitest'

describe('Local', () => {
  let local: Local

  beforeEach(() => {
    local = new Local()

    // Datos del local, como si los cargara el backend
    local.nombreLocal = 'Taberna de Moe'
    local.urlImagen = 'https://www.clarin.com/img/2017/10/05/SkWTevV3-_1200x0.jpg'
    local.direccion = 'Av. Siempre Viva'
    local.altura = 742
    local.porcentajeApp = 3
    local.porcentajeAutor = 3
    local.metodosDePago = { QR: true, Efectivo: false, Transferencia: true }

    // Guardamos copia original
    local.copiaOriginal()
  })

  it('debería restaurar los valores originales luego de modificar los campos', () => {
    // Hago algunos cambios, para después descartarlos y chequear que todo vuelva a como estaba antes
    local.nombreLocal = 'Starbucks'
    local.porcentajeApp = 99
    local.metodosDePago.QR = false

    local.restaurarValores()

    expect(local.nombreLocal).toBe('Taberna de Moe')
    expect(local.porcentajeApp).toBe(3)
    expect(local.metodosDePago.QR).toBe(true)
  })
})
