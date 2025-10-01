import type { Plato } from '$lib/types'
import { PLATOS_MOCK } from '$lib/data/mocks/platosMock'

const obtenerPorId = async (id: number):Promise<Plato|undefined> => {
  // Lógica
  const plato = PLATOS_MOCK.find(p => p.id === id)

  return plato
}

export const platosService = {obtenerPorId}