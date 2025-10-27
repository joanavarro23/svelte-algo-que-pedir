import { pedidoService } from '$lib/services/pedidoService'
import { showError } from '$lib/utils/errorHandler'
import { EstadoDelPedido } from '$lib/models/estadosPedido'
import type { PageLoad } from './$types'

export const load : PageLoad = async ( { url, depends } ) => {
  depends('pedidos:list')
  try{
    const paramsUrl = url.searchParams.get('estado')?.toUpperCase() as keyof typeof EstadoDelPedido | null
    const estado = paramsUrl ? EstadoDelPedido[paramsUrl] : null

    const pedidos = await pedidoService.todosLosPedidos()
    return { estado, pedidos }
    
  } catch (error) {
    showError('Fallo la conexion al servidor', error)
    return {estado: EstadoDelPedido, pedidos: []}
  }
}

