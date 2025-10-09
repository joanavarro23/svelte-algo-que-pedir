import { platosService } from '$lib/services/platoService'
import { error } from '@sveltejs/kit'

export async function load({ params }: { params: { id: string } }) {
  if(params.id === undefined) {
    const plato =  platosService.crearPlatoVacio()
    return { plato, esNuevo: true}
  }

  const platoId = Number(params.id)
  
  if (isNaN(platoId)) {
    throw error (400, `El parametro debe ser un número válido`)
  }
  
  // Buscar el plato por ID
  const plato = await platosService.obtenerPorId(platoId)

  return { plato, esNuevo: false }
}