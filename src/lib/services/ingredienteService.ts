import { Ingrediente } from '$lib/models/ingrediente.svelte'
import { INGREDIENTES_MOCK } from '$lib/data/mocks/ingredientesMock'
import { error } from '@sveltejs/kit'

/* CONVERTIR EN CLASE SI SE QUIERE POR EJEMPLO:
Traer todos los platos, o ciertos platos 
*/
const obtenerPorId = async (id: number): Promise<Ingrediente> => {
  // Lógica
  const ingrediente = INGREDIENTES_MOCK.find(p => p.id === id)
  if (!ingrediente)
    throw error(404, `El ingrediente con el id ${id} no fue encontrado`)

  return ingrediente
}
export const ingredientesService = {obtenerPorId}