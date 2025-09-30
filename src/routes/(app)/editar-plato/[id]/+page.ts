import { error } from '@sveltejs/kit'
import { PLATOS_MOCK } from '$lib/data/mock/PLATO'
// import type { PageProps } from './$types'

export function load({ params }: { params: { id: string } }) {
  const platoId = Number(params.id)

  if (isNaN(platoId)) {
    throw error(400, 'El ID del plato debe ser un número')
  }
  
  // Buscar el plato por ID
  const plato = PLATOS_MOCK.find(p => p.id === platoId)
  if (!plato) {
    throw error(404, `El plato con id ${platoId} no fue encontrado`)
  }
  
  return plato
}