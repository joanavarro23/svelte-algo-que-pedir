import { error } from '@sveltejs/kit'
import { platosService } from '$lib/services/plato.service'


// import type { PageProps } from './$types'

export async function load({ params }: { params: { id: string } }) {
  const platoId = Number(params.id)

  if (isNaN(platoId)) {
    throw error(400, 'El ID del plato debe ser un número')
  }
  
  // Buscar el plato por ID
  const plato = await platosService.obtenerPorId(platoId)

  
  return plato
}