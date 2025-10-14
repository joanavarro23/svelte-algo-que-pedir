//Creo este archivo porque hay una serie de funciones auxiliares para el trabajo con los estados 
//del pedido que vienen desde la URL del filtrado

import { EstadoDelPedido } from '$lib/types'

//Si en el query params viene un "pendientes" o "PENDIENTES", lo acepta
export const aceptaEstadoMinMayus = (estado? : string | null) : EstadoDelPedido | null => {
  const estadoNormalizado = estado?.trim().toLowerCase()

  switch (estadoNormalizado) {
  case 'pendientes':
  case 'pendientes'.toUpperCase():
    return EstadoDelPedido.Pendiente
  case 'preparados':
  case 'preparados'.toUpperCase():
    return EstadoDelPedido.Preparado
  case 'entregados':
  case 'entregados'.toUpperCase():
    return EstadoDelPedido.Entregado
  case 'cancelados':
  case 'cancelados'.toUpperCase():
    return EstadoDelPedido.Cancelado
  default:
    return null             //Si la ruta es /pedidos asi sin nada, no hace nada. Por eso admite la posibilidad de null.
  }
}

//Auxiliar para poder convertir a plural el estado para agregarlo a la URL. Lo usa el onclick del boton del +page.svelte
//para poder concatenarlo como string en la url.
export const estadoPlural = (estado: EstadoDelPedido): string => {
  switch (estado) {
    case EstadoDelPedido.Pendiente:
      return 'pendientes'
    case EstadoDelPedido.Preparado:
      return 'preparados'
    case EstadoDelPedido.Entregado:
      return 'entregados'
    case EstadoDelPedido.Cancelado:
      return 'cancelados'
  }
}

