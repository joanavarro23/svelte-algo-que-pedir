import { platosService } from '$lib/services/platoService'

export async function load({ params }: { params: { id: string } }) {
  const platoId = Number(params.id)

  if (isNaN(platoId)) {
    const plato =  platosService.crearPlatoVacio()
    return { plato, esNuevo: true}
  }
  
  // Buscar el plato por ID
  const plato = await platosService.obtenerPorId(platoId)

  return { plato, esNuevo: false }
}