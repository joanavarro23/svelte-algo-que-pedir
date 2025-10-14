import { EstadoDelPedido } from './pedido'

//Creo este archivo para centralizar las rutas de /pedido/{estado} para asociar
// un string ('pendientes') con la respectiva ruta ('/pedidos/pendientes')

//Diccionario que usa en +page.ts de /pedidos: desde la url yo leo un string que necesito
//matchaer con algo del enum de estados
export const rutasSegunEstado: Record<string, EstadoDelPedido> = {
  pendientes: EstadoDelPedido.Pendiente,
  preparados: EstadoDelPedido.Preparado,
  entregados: EstadoDelPedido.Entregado,
  cancelados: EstadoDelPedido.Cancelado
}

//Diccionario invertido que usa +page.svelte de /pedidos: quiero redireccionar a una ruta
//tomando el estado en forma enum y "traduciendolo" a un string para concatenar la url
export const estadoARuta = {
  [EstadoDelPedido.Pendiente]: 'pendientes',
  [EstadoDelPedido.Preparado]: 'preparados',
  [EstadoDelPedido.Entregado]: 'entregados',
  [EstadoDelPedido.Cancelado]: 'cancelados'
}