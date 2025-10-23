import { render, waitFor, type SvelteComponentOptions } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import '@testing-library/jest-dom' // Import custom matchers
import PlatoPage from '../../routes/(app)/plato/[[id]]/+page.svelte'
import { PLATOS_MOCK } from '$lib/data/mocks/platosMock'

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
import { goto } from '$app/navigation'
import type { Component } from 'svelte'
import type { PageProps } from '../../routes/(app)/plato/[[id]]/$types'
import { showError } from '$lib/utils/errorHandler'
import { showToast } from '$lib/utils/toasts/toasts'

let defaultData: SvelteComponentOptions<Component<PageProps>>

describe('Página de edición/creación de platos', () => {
  
  describe('Edición de plato existente', () => {
    beforeEach(() => {
      vi.clearAllMocks()
      const plato = PLATOS_MOCK[0] //pasta cremosa con 3 ingredientes (lista b)
      defaultData = { 
        data: { plato, nuevoPlato: false }, 
        params: { id: '1' } 
      }
    })

    it('debería renderizar el título correcto para edición', async () => {
      const { getByText } = render(PlatoPage, defaultData)
      
      await waitFor(() => {
        expect(getByText('Editar Plato: Pasta cremosa')).toBeTruthy()
      })
    })

    it('debería mostrar los datos del plato en los inputs', async () => {
      const { getByTestId } = render(PlatoPage, defaultData)
      
      await waitFor(() => {
        const inputNombre = getByTestId('titulo') as HTMLInputElement
        const textareaDescripcion = getByTestId('descripcion') as HTMLTextAreaElement
        
        expect(inputNombre.value).toBe('Pasta cremosa')
        expect(textareaDescripcion.value).toBe('Deliciosa pasta con salsa cremosa')
      })
    })

    it('debería mostrar el valor base del plato', async () => {
      const { getByTestId } = render(PlatoPage, defaultData)
      
      await waitFor(() => {
        const inputValorBase = getByTestId('valorBase') as HTMLInputElement
        expect(inputValorBase.value).toBe('12.99')
      })
    })

    it('debería renderizar los ingredientes del plato', async () => {
      const { getByText } = render(PlatoPage, defaultData)
      
      await waitFor(() => {
        expect(getByText('Tomate')).toBeTruthy()
        expect(getByText('Arroz')).toBeTruthy()
        expect(getByText('Leche')).toBeTruthy()
      })
    })

    it('debería mostrar que el plato es de autor', async () => {
      const { container } = render(PlatoPage, defaultData)
      
      await waitFor(() => {
        const switchAutor = container.querySelector('#esDeAutor') as HTMLInputElement
        expect(switchAutor.checked).toBe(true)
      })
    })

    it('debería mostrar que el plato está en promoción', async () => {
      const { container } = render(PlatoPage, defaultData)
      
      await waitFor(() => {
        const switchPromo = container.querySelector('#estaEnPromocion') as HTMLInputElement
        expect(switchPromo.checked).toBe(true)
      })
    })

    it('debería eliminar un ingrediente al hacer click en eliminar', async () => {     
      const { container } = render(PlatoPage, defaultData)
      const btnEliminar = container.querySelector('[data-testid*="eliminar"]') as HTMLElement
      await userEvent.click(btnEliminar)
      
      await waitFor(() => {
        expect(showToast).toHaveBeenCalledWith('Ingrediente eliminado con éxito', 'success')
      })
    })

    it('debería actualizar el plato correctamente', async () => {
      vi.mocked(platosService.actualizarPlato).mockResolvedValue(PLATOS_MOCK[0])
      
      const { getByTestId } = render(PlatoPage, defaultData)
      
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
      
      const { getByTestId } = render(PlatoPage, defaultData)
      
      const btnGuardar = await waitFor(() => getByTestId('btnGuardar'))
      await userEvent.click(btnGuardar)
      
      await waitFor(() => {
        expect(showError).toHaveBeenCalledWith('Error al guardar el plato', error)
      })
    })

    it('debería navegar atrás al descartar cambios con confirmación', async () => {
      vi.spyOn(window, 'confirm').mockReturnValue(true)
      
      const { getByTestId } = render(PlatoPage, defaultData)
      
      const btnDescartar = await waitFor(() => getByTestId('btnDescartar'))
      await userEvent.click(btnDescartar)
      
      await waitFor(() => {
        expect(window.confirm).toHaveBeenCalled()
        expect(goto).toHaveBeenCalledWith('/menu')
      })
    })

    it('no debería navegar si se cancela el descarte', async () => {
      vi.spyOn(window, 'confirm').mockReturnValue(false)
      
      const { getByTestId } = render(PlatoPage, defaultData)
      
      const btnDescartar = await waitFor(() => getByTestId('btnDescartar'))
      await userEvent.click(btnDescartar)
      
      await waitFor(() => {
        expect(window.confirm).toHaveBeenCalled()
        expect(goto).not.toHaveBeenCalled()
      })
    })

    it('debería habilitar el campo de descuento cuando está en promoción', async () => {
      const platoEnPromo = PLATOS_MOCK[3] // Hamburguesa con queso está en promo
      
      const { getByTestId } = render(PlatoPage, {
        data: { plato: platoEnPromo, nuevoPlato: false }
      })
      
      await waitFor(() => {
        const inputDescuento = getByTestId('porcentajeDescuento') as HTMLInputElement
        expect(inputDescuento).toBeTruthy()
      })
    })

    it('no debería mostrar campo de descuento si no está en promoción', async () => {
      const platoSinPromo = PLATOS_MOCK[1] // alitas picantes no esta en promo
      const { queryByTestId } = render(PlatoPage, {
        data: { plato: platoSinPromo, nuevoPlato: false }
      })
      
      await waitFor(() => {
        expect(queryByTestId('porcentajeDescuento')).toBeNull()
      })
    })
  })

  describe('Creación de plato nuevo', () => {
    beforeEach(() => {
      vi.clearAllMocks()
      const plato = platosService.crearPlatoVacio()
      defaultData = { 
        data: { plato, nuevoPlato: true }, 
        params: {} 
      }
    })

    it('debería renderizar el título correcto para nuevo plato', async () => {
      const { getByText } = render(PlatoPage, defaultData)
      
      await waitFor(() => {
        expect(getByText('Agregar nuevo plato')).toBeTruthy()
      })
    })

    it('debería tener campos vacíos inicialmente', async () => {
      const { getByTestId } = render(PlatoPage, defaultData)
      
      await waitFor(() => {
        const inputNombre = getByTestId('titulo') as HTMLInputElement
        const textareaDescripcion = getByTestId('descripcion') as HTMLTextAreaElement
        
        expect(inputNombre.value).toBe('')
        expect(textareaDescripcion.value).toBe('')
      })
    })

    it('debería mostrar advertencia sobre promoción en platos nuevos', async () => {
      const { getByText } = render(PlatoPage, defaultData)
      
      await waitFor(() => {
        expect(getByText(/Los platos nuevos no pueden estar en promoción/)).toBeTruthy()
      })
    })

    it('debería crear un plato nuevo correctamente', async () => {
      const platoCreado = platosService.crearPlatoVacio()
      platoCreado.nombre = 'Nuevo Plato'
      platoCreado.descripcion = 'Descripción del nuevo plato'
      platoCreado.valorBase = 300
      
      vi.mocked(platosService.crearPlato).mockResolvedValue(platoCreado)
      
      const { getByTestId } = render(PlatoPage, defaultData)
      
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
      const { getByTestId } = render(PlatoPage, defaultData)
      
      await waitFor(() => {
        const btnGuardar = getByTestId('btnGuardar')
        expect(btnGuardar.textContent?.trim()).toBe('Agregar plato')
      })
    })

    it('debería deshabilitar botones mientras guarda', async () => {
      vi.mocked(platosService.crearPlato).mockImplementation(
        () => new Promise(resolve => setTimeout(resolve, 100))
      )
      
      const { getByTestId } = render(PlatoPage, defaultData)
      
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
      const plato = platosService.crearPlatoVacio()
      defaultData = { 
        data: { plato, nuevoPlato: true }, 
        params: {} 
      }
    })

    it('no debería permitir guardar sin nombre', async () => {
      const { getByTestId } = render(PlatoPage, defaultData)
      
      const btnGuardar = getByTestId('btnGuardar')
      await userEvent.click(btnGuardar)
      
      await waitFor(() => {
        expect(platosService.crearPlato).not.toHaveBeenCalled()
      })
    })

    it('debería validar el plato antes de guardar', async () => {
      const { getByTestId } = render(PlatoPage, defaultData)
      
      const btnGuardar = getByTestId('btnGuardar')
      await userEvent.click(btnGuardar)
      
      await waitFor(() => {
        expect(platosService.crearPlato).not.toHaveBeenCalled()
      })
    })
  })
})