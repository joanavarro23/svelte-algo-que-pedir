import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, waitFor, type SvelteComponentOptions } from '@testing-library/svelte'
import Page from './+page.svelte'
import { Plato } from '$lib/models/plato.svelte'
import { Ingrediente } from '$lib/models/ingrediente.svelte'
import userEvent from '@testing-library/user-event'
import type { Component } from 'svelte'
import type { PageProps } from './$types'

vi.mock('$lib/services/platoService')
vi.mock('$lib/utils/errorHandler', () => ({
  showError: vi.fn()
}))
vi.mock('$lib/utils/toasts/toasts', () => ({
  showToast: vi.fn()
}))
vi.mock('$app/navigation', () => ({
  goto: vi.fn()
}))

import { platosService } from '$lib/services/platoService'
import { PLATOS_MOCK } from '$lib/data/mocks/platosMock'
import { goto } from '$app/navigation'
import { showError } from '$lib/utils/errorHandler'
import { showToast } from '$lib/utils/toasts/toasts'

let defaultData: SvelteComponentOptions<Component<PageProps>>

const mockIngredientes = (): Ingrediente[] => [
  new Ingrediente(1, 'Tomate', 'Verduras', 'Nacional', 50),
  new Ingrediente(2, 'Lechuga', 'Verduras', 'Nacional', 30),
  new Ingrediente(3, 'Carne', 'Proteínas', 'Importado', 200)
]

const mockPlatoExistente = (): Plato => {
  const plato = new Plato()
  plato.id = 1
  plato.nombre = 'Hamburguesa Completa'
  plato.descripcion = 'Deliciosa hamburguesa con todos los ingredientes'
  plato.imagenUrl = '/images/hamburguesa.jpg'
  plato.valorBase = 500
  plato.esDeAutor = false
  plato.estaEnPromocion = false
  plato.ingredientes = [mockIngredientes()[0], mockIngredientes()[2]]
  return plato
}

const mockPlatoNuevo = (): Plato => {
  const plato = platosService.crearPlatoVacio()
  return plato
}

describe('Página de edición/creación de platos', () => {
  
  describe('Edición de plato existente', () => {
    beforeEach(() => {
      vi.clearAllMocks()
      const plato = mockPlatoExistente()
      defaultData = { 
        data: { plato, nuevoPlato: false }, 
        params: { id: '1' } 
      }
    })

    it('debería renderizar el título correcto para edición', async () => {
      const { getByText } = render(Page, defaultData)
      
      await waitFor(() => {
        expect(getByText('Editar Plato: Hamburguesa Completa')).toBeTruthy()
      })
    })

    it('debería mostrar los datos del plato en los inputs', async () => {
      const { getByTestId } = render(Page, defaultData)
      
      await waitFor(() => {
        const inputNombre = getByTestId('titulo') as HTMLInputElement
        const textareaDescripcion = getByTestId('descripcion') as HTMLTextAreaElement
        
        expect(inputNombre.value).toBe('Hamburguesa Completa')
        expect(textareaDescripcion.value).toBe('Deliciosa hamburguesa con todos los ingredientes')
      })
    })

    it('debería mostrar el valor base del plato', async () => {
      const { getByTestId } = render(Page, defaultData)
      
      await waitFor(() => {
        const inputValorBase = getByTestId('valorBase') as HTMLInputElement
        expect(inputValorBase.value).toBe('500')
      })
    })

    it('debería renderizar los ingredientes del plato', async () => {
      const { getByText } = render(Page, defaultData)
      
      await waitFor(() => {
        expect(getByText('Tomate')).toBeTruthy()
        expect(getByText('Carne')).toBeTruthy()
      })
    })

    it('debería mostrar el costo de producción calculado', async () => {
      const { getByText } = render(Page, defaultData)
      
      await waitFor(() => {
        // Tomate (50) + Carne (200) = 250
        expect(getByText('250.00')).toBeTruthy()
      })
    })

    it('debería eliminar un ingrediente al hacer click en eliminar', async () => {
      const { queryByText } = render(Page, defaultData)
      
      const btnEliminar = await waitFor(() => 
        document.querySelector('[data-testid*="eliminar"]') as HTMLElement
      )
      
      await userEvent.click(btnEliminar)
      
      await waitFor(() => {
        expect(showToast).toHaveBeenCalledWith('Ingrediente eliminado con éxito', 'success')
      })
    })

    it('debería actualizar el plato correctamente', async () => {
      vi.mocked(platosService.actualizarPlato).mockResolvedValue(mockPlatoExistente())
      
      const { getByTestId } = render(Page, defaultData)
      
      const btnGuardar = await waitFor(() => getByTestId('btnGuardar'))
      await userEvent.click(btnGuardar)
      
      await waitFor(() => {
        expect(platosService.actualizarPlato).toHaveBeenCalled()
        expect(showToast).toHaveBeenCalledWith('Plato actualizado con éxito', 'success')
      })
    })

    it('debería mostrar error si falla la actualización', async () => {
      const error = new Error('Error de red')
      vi.mocked(platosService.actualizarPlato).mockRejectedValue(error)
      
      const { getByTestId } = render(Page, defaultData)
      
      const btnGuardar = await waitFor(() => getByTestId('btnGuardar'))
      await userEvent.click(btnGuardar)
      
      await waitFor(() => {
        expect(showError).toHaveBeenCalledWith('Error al guardar el plato', error)
      })
    })

    it('debería navegar atrás al descartar cambios con confirmación', async () => {
      vi.spyOn(window, 'confirm').mockReturnValue(true)
      
      const { getByTestId } = render(Page, defaultData)
      
      const btnDescartar = await waitFor(() => getByTestId('btnDescartar'))
      await userEvent.click(btnDescartar)
      
      await waitFor(() => {
        expect(window.confirm).toHaveBeenCalled()
        expect(goto).toHaveBeenCalledWith('/menu')
      })
    })

    it('no debería navegar si se cancela el descarte', async () => {
      vi.spyOn(window, 'confirm').mockReturnValue(false)
      
      const { getByTestId } = render(Page, defaultData)
      
      const btnDescartar = await waitFor(() => getByTestId('btnDescartar'))
      await userEvent.click(btnDescartar)
      
      await waitFor(() => {
        expect(window.confirm).toHaveBeenCalled()
        expect(goto).not.toHaveBeenCalled()
      })
    })

    it('debería habilitar el campo de descuento cuando está en promoción', async () => {
      const platoEnPromo = mockPlatoExistente()
      platoEnPromo.estaEnPromocion = true
      platoEnPromo.porcentajeDescuento = 25
      
      const { getByTestId } = render(Page, {
        data: { plato: platoEnPromo, nuevoPlato: false },
        params: { id: '1' }
      })
      
      await waitFor(() => {
        const inputDescuento = getByTestId('porcentajeDescuento') as HTMLInputElement
        expect(inputDescuento).toBeTruthy()
        expect(inputDescuento.value).toBe('25')
      })
    })

    it('no debería mostrar campo de descuento si no está en promoción', async () => {
      const { queryByTestId } = render(Page, defaultData)
      
      await waitFor(() => {
        expect(queryByTestId('porcentajeDescuento')).toBeNull()
      })
    })
  })

  describe('Creación de plato nuevo', () => {
    beforeEach(() => {
      vi.clearAllMocks()
      const plato = mockPlatoNuevo()
      defaultData = { 
        data: { plato, nuevoPlato: true }, 
        params: {} 
      }
    })

    it('debería renderizar el título correcto para nuevo plato', async () => {
      const { getByText } = render(Page, defaultData)
      
      await waitFor(() => {
        expect(getByText('Agregar nuevo plato')).toBeTruthy()
      })
    })

    it('debería tener campos vacíos inicialmente', async () => {
      const { getByTestId } = render(Page, defaultData)
      
      await waitFor(() => {
        const inputNombre = getByTestId('titulo') as HTMLInputElement
        const textareaDescripcion = getByTestId('descripcion') as HTMLTextAreaElement
        
        expect(inputNombre.value).toBe('')
        expect(textareaDescripcion.value).toBe('')
      })
    })

    it('debería mostrar advertencia sobre promoción en platos nuevos', async () => {
      const { getByText } = render(Page, defaultData)
      
      await waitFor(() => {
        expect(getByText(/Los platos nuevos no pueden estar en promoción/)).toBeTruthy()
      })
    })

    it('debería crear un plato nuevo correctamente', async () => {
      const platoCreado = mockPlatoNuevo()
      platoCreado.nombre = 'Nuevo Plato'
      platoCreado.descripcion = 'Descripción del nuevo plato'
      platoCreado.valorBase = 300
      
      vi.mocked(platosService.crearPlato).mockResolvedValue(platoCreado)
      
      const { getByTestId } = render(Page, defaultData)
      
      // Llenar campos
      const inputNombre = getByTestId('titulo') as HTMLInputElement
      const textareaDescripcion = getByTestId('descripcion') as HTMLTextAreaElement
      const inputValorBase = getByTestId('valorBase') as HTMLInputElement
      
      await userEvent.clear(inputNombre)
      await userEvent.type(inputNombre, 'Nuevo Plato')
      await userEvent.clear(textareaDescripcion)
      await userEvent.type(textareaDescripcion, 'Descripción del nuevo plato')
      await userEvent.clear(inputValorBase)
      await userEvent.type(inputValorBase, '300')
      
      const btnGuardar = getByTestId('btnGuardar')
      await userEvent.click(btnGuardar)
      
      await waitFor(() => {
        expect(platosService.crearPlato).toHaveBeenCalled()
        expect(showToast).toHaveBeenCalledWith('Plato creado con éxito', 'success')
      })
    })

    it('debería mostrar el texto correcto en el botón de guardar', async () => {
      const { getByTestId } = render(Page, defaultData)
      
      await waitFor(() => {
        const btnGuardar = getByTestId('btnGuardar')
        expect(btnGuardar.textContent?.trim()).toBe('Agregar plato')
      })
    })

    it('debería deshabilitar botones mientras guarda', async () => {
      vi.mocked(platosService.crearPlato).mockImplementation(
        () => new Promise(resolve => setTimeout(resolve, 100))
      )
      
      const { getByTestId } = render(Page, defaultData)
      
      const btnGuardar = getByTestId('btnGuardar') as HTMLButtonElement
      const btnDescartar = getByTestId('btnDescartar') as HTMLButtonElement
      
      await userEvent.click(btnGuardar)
      
      expect(btnGuardar.disabled).toBe(true)
      expect(btnDescartar.disabled).toBe(true)
    })
  })

  describe('Validaciones', () => {
    beforeEach(() => {
      vi.clearAllMocks()
      const plato = mockPlatoNuevo()
      defaultData = { 
        data: { plato, nuevoPlato: true }, 
        params: {} 
      }
    })

    it('no debería permitir guardar sin nombre', async () => {
      const { getByTestId } = render(Page, defaultData)
      
      const btnGuardar = getByTestId('btnGuardar')
      await userEvent.click(btnGuardar)
      
      await waitFor(() => {
        expect(platosService.crearPlato).not.toHaveBeenCalled()
      })
    })

    it('debería validar el plato antes de guardar', async () => {
      const { getByTestId } = render(Page, defaultData)
      
      const btnGuardar = getByTestId('btnGuardar')
      await userEvent.click(btnGuardar)
      
      // El método validarPlato() del plato debería ser llamado
      await waitFor(() => {
        expect(platosService.crearPlato).not.toHaveBeenCalled()
      })
    })
  })
})