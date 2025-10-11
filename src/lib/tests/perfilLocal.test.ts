import '@testing-library/jest-dom'
import { Local } from '$lib/models/local.svelte'
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/svelte'
import ProfileCard from '$lib/components/perfil-local/profile-card.svelte'

describe('ProfileCard', () => {
  it('renderiza el título correctamente', () => {
    render(ProfileCard, { props: { title: 'Perfil del Local' } })
    const heading = screen.getByText('Perfil del Local')
    expect(heading).toBeInTheDocument()
  })
})

describe('Restaurar valores originales', () => {
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

    // Copia original para después restaurarla
    local.copiaOriginal()
  })

  it('debería restaurar los valores originales luego de modificar los campos', () => {
    local.nombreLocal = 'Starbucks'
    local.porcentajeApp = 99
    local.metodosDePago.QR = false

    expect(local.nombreLocal).toBe('Starbucks')

    local.restaurarValores()

    expect(local.porcentajeApp).toBe(3)
    expect(local.metodosDePago.QR).toBe(true)
    expect(local.nombreLocal).toBe('Taberna de Moe')
  })
})