import { Plato } from '$lib/models/plato.svelte'
import { PLATOS_MOCK } from '$lib/data/mocks/platosMock'
import { error } from '@sveltejs/kit'

/* CONVERTIR EN CLASE SI SE QUIERE POR EJEMPLO:
Traer todos los platos, o ciertos platos 
*/


const obtenerPorId = async (id: number): Promise<Plato> => {
  // Lógica
  const plato = PLATOS_MOCK.find(p => p.id === id)
  if (!plato)
    throw error(404, `El plato con el id ${id} no fue encontrado`)

  return plato
}

const crearPlatoVacio = (): Plato => {
  return new Plato()
}

export const platosService = {obtenerPorId, crearPlatoVacio}

// CUANDO LA LLAMADA SEA AL BACK, LA BUSQUEDA SERIA:
/* const obtenerPorId = async (id: number): Promise<Plato | undefined> => {
    const response = await axios.get(`/api/platos/${id}`)
    return toPlato(response.data)
}
*/