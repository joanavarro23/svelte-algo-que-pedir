import { beforeEach, describe, expect, it, vi } from 'vitest'
import { waitFor } from '@testing-library/svelte'
import { load } from '../../routes/(app)/menu/+page'
import { PLATOS_MOCK } from '$lib/data/mocks/platosMock'

vi.mock('axios')
vi.mock('$lib/services/platoService')
vi.mock('$lib/utils/errorHandler', () => ({
  showError: vi.fn()
}))

import { platosService } from '$lib/services/platoService'
import { showError } from '$lib/utils/errorHandler'
import axios from 'axios'

describe('+page.ts load - gestión del menú', () => {

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Carga exitosa de platos', () => {
    it('devuelve todos los platos cuando el service responde OK', async () => {
      vi.mocked(axios.get).mockResolvedValue(PLATOS_MOCK)
      
      const { platos } = await load({
        depends: vi.fn(), 
        params: {}
      } as unknown as Parameters<typeof load>[0])
      
      await waitFor(() => {
        expect(platos.length).toBe(7)
        expect(platos).toEqual(PLATOS_MOCK)
      })
    })

    it('devuelve los platos con sus propiedades correctas', async () => {
      vi.mocked(axios.get).mockResolvedValue(PLATOS_MOCK)
      
      const { platos } = await load({
        depends: vi.fn(), 
        params: {}
      } as unknown as Parameters<typeof load>[0])
      
      await waitFor(() => {
        const primerPlato = platos[0]
        expect(primerPlato.id).toBe(1)
        expect(primerPlato.nombre).toBe('Pasta cremosa')
        expect(primerPlato.descripcion).toBe('Deliciosa pasta con salsa cremosa')
        expect(primerPlato.valorBase).toBe(12.99)
        expect(primerPlato.esDeAutor).toBe(true)
        expect(primerPlato.estaEnPromocion).toBe(true)
      })
    })

    it('devuelve platos con ingredientes correctamente', async () => {
      vi.mocked(axios.get).mockResolvedValue(PLATOS_MOCK)
      
      const { platos } = await load({
        depends: vi.fn(), 
        params: {}
      } as unknown as Parameters<typeof load>[0])
      
      await waitFor(() => {
        const platoConIngredientes = platos[0] // Pasta cremosa
        expect(platoConIngredientes.ingredientes.length).toBe(3)
        expect(platoConIngredientes.ingredientes[0].nombre).toBe('Tomate')
      })
    })

    it('devuelve array vacío cuando no hay platos', async () => {
      vi.mocked(axios.get).mockResolvedValue([])
      
      const { platos } = await load({
        depends: vi.fn(), 
        params: {}
      } as unknown as Parameters<typeof load>[0])
      
      await waitFor(() => {
        expect(platos).toEqual([])
        expect(platos.length).toBe(0)
      })
    })

    describe('Manejo de errores', () => {
      it('muestra error y devuelve array vacío cuando falla el servicio', async () => {
        const err = new Error('Connection failed')
        vi.mocked(axios.get).mockRejectedValue(err)

        const { platos } = await load({
          depends: vi.fn(), 
          params: {}
        } as unknown as Parameters<typeof load>[0])

        expect(showError).toHaveBeenCalledWith('Conexión al servidor', err)
        expect(platos).toEqual([])
      })

      it('devuelve array vacío cuando hay error de red', async () => {
        const networkError = new Error('Network error')
        vi.mocked(axios.get).mockRejectedValue(networkError)

        const { platos } = await load({
          depends: vi.fn(), 
          params: {}
        } as unknown as Parameters<typeof load>[0])

        expect(platos).toEqual([])
        expect(platos.length).toBe(0)
      })
    })

    describe('Dependencias', () => {
      it('llama a depends con el identificador correcto', async () => {
        vi.mocked(axios.get).mockResolvedValue(PLATOS_MOCK)
        const dependsMock = vi.fn()
      
        await load({
          depends: dependsMock, 
          params: {}
        } as unknown as Parameters<typeof load>[0])

        expect(dependsMock).toHaveBeenCalledWith('platos:list')
      })

      it('llama a depends antes de cargar los platos', async () => {
        vi.mocked(axios.get).mockResolvedValue(PLATOS_MOCK)
        const dependsMock = vi.fn()
      
        await load({
          depends: dependsMock, 
          params: {}
        } as unknown as Parameters<typeof load>[0])

        expect(dependsMock).toHaveBeenCalled()
        expect(platosService.todosLosPlatos).toHaveBeenCalled()
      })
    })
  })
})