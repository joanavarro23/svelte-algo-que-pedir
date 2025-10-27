import { pedidoService } from '$lib/services/pedidoService'
import { showError } from '$lib/utils/errorHandler'
import { EstadoDelPedido } from '$lib/models/estadosPedido'
import type { PageLoad } from './$types'
import { error } from '@sveltejs/kit'
import axios from 'axios'


//Tengo que poder validar lo que viene en la url como un estado
const mapaEstadosValidos: Record<string, EstadoDelPedido> = {
  pendiente : EstadoDelPedido.PENDIENTE,
  preparado : EstadoDelPedido.PREPARADO,
  entregado : EstadoDelPedido.ENTREGADO,
  cancelado : EstadoDelPedido.CANCELADO
} 

function parseEstado(raw: string | null) {
  const key = raw?.trim().toLowerCase()
  if (!key) throw error(400, 'Falta el parámetro "estado".')
  const estadoFront = mapaEstadosValidos[key]
  if (!estadoFront) throw error(404, `El estado '${raw}' no es válido.`)
  return { estadoFront, estadoBack: key }
}

export const load : PageLoad = async ( { url, depends } ) => {
  depends('pedidos:list')

  const { estadoFront, estadoBack } = parseEstado(url.searchParams.get('estado'))

  try{
    const pedidos = await pedidoService.pedidoByEstado(estadoBack)

    return { estado: estadoFront, pedidos }
    
  } catch (err : unknown) {
    if(axios.isAxiosError(err)){
      const status = err?.response?.status ?? 500
      
      if(status && status >= 400 && status < 500){
        throw error(status, err?.response?.data?.message ?? 'Solicitud invalida.')
      }else{
        throw error(500, 'No se pudieron obtener los pedidos.')
      }
    }
    
  }
}

