export type Pedido = {
  id: number,
  cliente: string,
  fecha: Date,
  items: number,
  precio: number,
  estado: EstadoDelPedido,
  direccion: string,
  medioDePago: MedioDePago
}


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