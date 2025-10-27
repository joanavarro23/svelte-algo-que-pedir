import { pedidoService } from '$lib/services/pedidoService'
import { showError } from '$lib/utils/errorHandler'

export const load = async ( { depends } ) => {
  try{
    depends('pedidos:list')
    const pedidos = await pedidoService.todosLosPedidos()
    return { pedidos }
  } catch (error) {
    showError('Fallo la conexion al servidor', error)
    return {pedidos: []}
  }
}

