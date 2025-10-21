 
import { error } from '@sveltejs/kit'
import axios from 'axios'
import type { PedidoDetalleDTO } from '$lib/dto/detalleDTO'
import { REST_SERVER_URL } from '$lib/services/configuration'


export async function load({ params }: { params: { id: string } }): Promise<PedidoDetalleDTO> {
  try {
    const pedidoId = Number(params.id)
    if (isNaN(pedidoId)) {
      throw error(400, 'ID de pedido inválido')
    }
    const response = await axios.get<PedidoDetalleDTO>(`${REST_SERVER_URL}/detalle-pedido/${params.id}`)
    return response.data
    
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 404) {
        throw error(404, 'Pedido no encontrado')
      }
      if (err.response?.status === 400) {
        throw error(400, 'Solicitud inválida')
      }
      throw error(500, 'Error al cargar el pedido')
    }
    throw error(500, 'Error inesperado')
  }
}