import { beforeEach, describe, expect, it, vi } from 'vitest'
import { waitFor } from '@testing-library/svelte'
import { load } from '../../routes/(app)/ingrediente/+page'

vi.mock('$lib/utils/errorHandler', () => ({
  showError: vi.fn()
}))

vi.mock('axios')

import { showError } from '$lib/utils/errorHandler'
import { Ingrediente }  from '$lib/models/ingrediente.svelte'
import axios from 'axios'

const tomate = new Ingrediente()
tomate.id = 1
tomate.nombre = 'Tomate'
tomate.costo = 0.5
tomate.grupo = 'Frutas y verduras'
tomate.origen = 'vegetal'

const arroz = new Ingrediente()
arroz.id = 2
arroz.nombre = 'Arroz'
arroz.costo = 1.2
arroz.grupo = 'Cereales y tubérculos'
arroz.origen = 'vegetal'

const pollo = new Ingrediente()
pollo.id = 3
pollo.nombre = 'Pechuga de pollo'
pollo.costo = 3.5
pollo.grupo = 'Proteínas'
pollo.origen = 'animal'

const mockIngredientes: () => Ingrediente[] = () => [tomate, arroz, pollo]


describe('+page.ts load', () => {

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('devuelve ingredientes cuando el servicio responde bien', async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: mockIngredientes().map(ingrediente => ingrediente.toJSON()), status: 200})
    const { ingredientes } = await load({depends: vi.fn(), params:{ }} as unknown as Parameters<typeof load>[0])
    await waitFor(() => {
      expect(ingredientes.length).toEqual(3)
    })
  })

  it('maneja el error cuando el servicio responde mal', async () => {
    const err = new Error('Error de red')
    vi.mocked(axios.get).mockRejectedValue(err)

    const { ingredientes } = await load({depends: vi.fn(), params:{}} as unknown as Parameters<typeof load>[0])
    
    expect(showError).toHaveBeenCalledWith('Conexión al servidor', err)
    expect(ingredientes).toEqual([])
  })
})

  



