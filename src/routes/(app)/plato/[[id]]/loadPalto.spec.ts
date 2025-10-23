import { beforeEach, describe, expect, it, vi } from 'vitest'
import { waitFor } from '@testing-library/svelte'
import { load } from './+page'
import { Plato } from '$lib/models/plato.svelte'
import { Ingrediente } from '$lib/models/ingrediente.svelte'

vi.mock('$lib/services/platoService')

import { platosService } from '$lib/services/platoService'

const mockPlato = (): Plato => {
  const plato = new Plato()
  plato.id = 1
  plato.nombre = 'Hamburguesa Completa'
  plato.descripcion = 'Deliciosa hamburguesa'
  plato.imagenUrl = '/images/hamburguesa.jpg'
  plato.valorBase = 500
  plato.esDeAutor = false
  plato.estaEnPromocion = false
  plato.ingredientes = [
    new Ingrediente(1, 'Tomate', 'Verduras', 'Nacional', 50),
    new Ingrediente(2, 'Carne', 'Proteínas', 'Importado', 200)
  ]
  return plato
}

describe('+page.ts load', () => {

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Crear nuevo plato', () => {
    it('devuelve un plato vacío cuando no hay id en params', async () => {
      const platoVacio = new Plato()
      vi.mocked(platosService.crearPlatoVacio).mockReturnValue(platoVacio)
      
      const { plato, nuevoPlato } = await load({ 
        params: {} as any 
      } as Parameters<typeof load>[0])
      
      await waitFor(() => {
        expect(nuevoPlato).toBe(true)
        expect(plato).toBeDefined()
        expect(plato.nombre).toBe('')
        expect(platosService.crearPlatoVacio).toHaveBeenCalled()
      })
    })

    it('devuelve nuevoPlato=true cuando params.id es undefined', async () => {
      const platoVacio = new Plato()
      vi.mocked(platosService.crearPlatoVacio).mockReturnValue(platoVacio)
      
      const { nuevoPlato } = await load({ 
        params: { id: undefined } as any 
      } as Parameters<typeof load>[0])
      
      expect(nuevoPlato).toBe(true)
    })
  })

  describe('Editar plato existente', () => {
    it('devuelve el plato cuando el service responde OK', async () => {
      const platoMock = mockPlato()
      vi.mocked(platosService.obtenerPorId).mockResolvedValue(platoMock)
      
      const { plato, nuevoPlato } = await load({ 
        params: { id: '1' } 
      } as Parameters<typeof load>[0])
      
      await waitFor(() => {
        expect(nuevoPlato).toBe(false)
        expect(plato).toBeDefined()
        expect(plato.id).toBe(1)
        expect(plato.nombre).toBe('Hamburguesa Completa')
        expect(platosService.obtenerPorId).toHaveBeenCalledWith(1)
      })
    })

    it('devuelve el plato con sus ingredientes', async () => {
      const platoMock = mockPlato()
      vi.mocked(platosService.obtenerPorId).mockResolvedValue(platoMock)
      
      const { plato } = await load({ 
        params: { id: '1' } 
      } as Parameters<typeof load>[0])
      
      await waitFor(() => {
        expect(plato.ingredientes.length).toBe(2)
        expect(plato.ingredientes[0].nombre).toBe('Tomate')
        expect(plato.ingredientes[1].nombre).toBe('Carne')
      })
    })

    it('lanza error 400 cuando el id no es un número válido', async () => {
      expect(async () => {
        await load({ 
          params: { id: 'abc' } 
        } as Parameters<typeof load>[0])
      }).rejects.toThrowError()
      
      // Verificar que no se llamó al servicio
      expect(platosService.obtenerPorId).not.toHaveBeenCalled()
    })

    it('lanza error 400 con mensaje descriptivo para id inválido', async () => {
      try {
        await load({ 
          params: { id: 'invalid' } 
        } as Parameters<typeof load>[0])
      } catch (error: any) {
        expect(error.status).toBe(400)
        expect(error.body.message).toContain('debe ser un número válido')
      }
    })
  })

  describe('Manejo de errores', () => {
    it('redirige a / cuando falla la carga del plato', async () => {
      const err = new Error('Not found')
      vi.mocked(platosService.obtenerPorId).mockRejectedValue(err)
      
      try {
        await load({ 
          params: { id: '999' } 
        } as Parameters<typeof load>[0])
      } catch (error: any) {
        expect(error.status).toBe(302)
        expect(error.location).toBe('/')
      }
    })

    it('loguea el error cuando falla la carga', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      const err = new Error('Connection failed')
      vi.mocked(platosService.obtenerPorId).mockRejectedValue(err)
      
      try {
        await load({ 
          params: { id: '1' } 
        } as Parameters<typeof load>[0])
      } catch {
        expect(consoleSpy).toHaveBeenCalledWith('Error al cargar el plato: ', err)
      }
      
      consoleSpy.mockRestore()
    })

    it('redirige aunque el error no tenga mensaje', async () => {
      vi.mocked(platosService.obtenerPorId).mockRejectedValue(null)
      
      try {
        await load({ 
          params: { id: '1' } 
        } as Parameters<typeof load>[0])
      } catch (error: any) {
        expect(error.status).toBe(302)
        expect(error.location).toBe('/')
      }
    })
  })

  describe('Conversión de tipos', () => {
    it('convierte correctamente string a número para el id', async () => {
      const platoMock = mockPlato()
      vi.mocked(platosService.obtenerPorId).mockResolvedValue(platoMock)
      
      await load({ 
        params: { id: '42' } 
      } as Parameters<typeof load>[0])
      
      expect(platosService.obtenerPorId).toHaveBeenCalledWith(42)
    })

    it('maneja correctamente id con espacios', async () => {
      expect(async () => {
        await load({ 
          params: { id: ' 123 ' } 
        } as Parameters<typeof load>[0])
      }).rejects.toThrowError()
    })

    it('maneja correctamente números negativos', async () => {
      expect(async () => {
        await load({ 
          params: { id: '-1' } 
        } as Parameters<typeof load>[0])
      }).rejects.toThrowError()
    })
  })
})