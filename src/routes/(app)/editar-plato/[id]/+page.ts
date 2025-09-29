import type { PageLoad } from './$types'
import { error } from '@sveltejs/kit'
import { platosMock } from '$lib/data/mock/PLATO'
// import type { PageProps } from './$types'

export const load: PageLoad = ({ params }) => {
  const platoId = parseInt(params.id)

  // const { params }: PageProps = $props()
  
  if (isNaN(platoId)) {
    throw error(400, 'ID de plato inválido')
  }

  // Buscar el plato por ID
  const plato = platosMock.find(p => p.id === platoId)

  // buscarPlato(id: number): Plato | undefined {
  // return platos.find(plato => plato.id === id)
  // }

  
  if (!plato) {
    throw error(404, 'Plato no encontrado')
  }

  return {
    plato
  }
}