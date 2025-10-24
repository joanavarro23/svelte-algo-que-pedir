export enum MedioDePago {
  Efectivo = 'Efectivo',
  QR = 'QR',
  Tarjeta = 'Tarjeta de credito'
}


export enum EstadoDelPedido {
  Pendiente = 'Pendiente',
  Preparado = 'Preparado',
  Entregado = 'Entregado',
  Cancelado = 'Cancelado'
}

//Tipos de DTOs del back
export type DireccionJSON = {
  calle: string,
  altura: number,
  latitud: number,
  longitud: number
}

export type ClienteInfoJSON = {
  nombre: string,
  username: string
}

export type PedidoJSON = {
    id: number,
    cliente: ClienteInfoJSON,
    direccion: DireccionJSON,
    hora: string,
    items: number,
    precioTotal: number,
    estado: string,
    medioDePago: MedioDePago,
    estadoPedido: EstadoDelPedido
}

//Clase de Pedido para el front
export class Pedido {
  id: number | null = null
}