import { error } from '@sveltejs/kit'
import { ingredientesService } from '$lib/services/ingredienteService'

export async function load({ params }: { params: { id: string } }) {
  const ingredienteId = Number(params.id)

  if (isNaN(ingredienteId)) {
    throw error(400, 'El ID del plato debe ser un número')
  }
  
  // Buscar el plato por ID
  const ingrediente = await ingredientesService.obtenerPorId(ingredienteId)

  return { ingrediente }
}