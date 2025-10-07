import { Pedido } from '$lib/models/pedido.svelte.ts'
import { PEDIDOS_MOCK } from '$lib/data/mocks/pedidosMock'
import { error } from '@sveltejs/kit'

/* CONVERTIR EN CLASE SI SE QUIERE POR EJEMPLO:
Traer todos los platos, o ciertos platos 
*/
const obtenerPorId = async (id: number): Promise<Pedido> => {
  // Lógica
  const pedido = PEDIDOS_MOCK.find(p => p.id === id)
  if (!pedido)
    throw error(404, `El pedido con el id ${id} no fue encontrado`)

  return pedido
}
export const pedidoService = {obtenerPorId}