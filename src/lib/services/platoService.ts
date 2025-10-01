import { Plato } from '$lib/models/plato.svelte'
import { PLATOS_MOCK } from '$lib/data/mocks/platosMock'

/* CONVERTIR EN CLASE SI SE QUIERE POR EJEMPLO:
Traer todos los platos, o ciertos platos 
*/
const obtenerPorId = async (id: number):Promise<Plato|undefined> => {
  // Lógica
  const plato = PLATOS_MOCK.find(p => p.id === id)

  return plato
}
export const platosService = {obtenerPorId}

// CUANDO LA LLAMADA SEA AL BACK, LA BUSQUEDA SERIA:
/* const obtenerPorId = async (id: number): Promise<Plato | undefined> => {
  const response = await axios.get(`/api/platos/${id}`)
  return toPlato(response.data)
}
*/


// const toPlato = (plato: any): Plato => {
//   return new Plato(
//     plato.id,
//     plato.nombre,
//     plato.descripcion,
//     plato.imagen,
//     plato.precio,
//     plato.platoDeAutor ?? false,
//     plato.platoDePromocion ?? false,
//     plato.ingredientes ?? []
//   )
// }