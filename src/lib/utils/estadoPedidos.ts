//Creo este archivo porque hay una serie de funciones auxiliares para el trabajo con los estados 
//del pedido que vienen desde la URL del filtrado

import { EstadoDelPedido } from '$lib/types'

//Si en el query params viene un "pendiente" o "PENDIENTE", lo acepta
export const aceptaEstadoMinMayus = (estado? : string | null) : EstadoDelPedido | null => {
  const estadoNormalizado = estado?.trim().toLowerCase()

  switch (estadoNormalizado) {
  case 'pendiente':
    return EstadoDelPedido.Pendiente
  case 'preparado':
    return EstadoDelPedido.Preparado
  case 'entregado':
    return EstadoDelPedido.Entregado
  case 'cancelado':
    return EstadoDelPedido.Cancelado
  default:
    return null             //Si la ruta es /pedidos asi sin nada, va a ir al error del +page.ts
  }
}


