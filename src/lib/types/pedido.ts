export type Pedido = {
  id: number,
  cliente: string,
  hora: Date,
  items: number,
  precio: number,
  estado: EstadoDelPedido,
  direccion: string,
  medioDePago: MedioDePago
}


export enum MedioDePago {
  Efectivo = 'Efectivo',
  QR = 'QR',
  Transferencia = 'Transferencia bancaria'
}

export enum EstadoDelPedido {
  Pendiente = 'Pendiente',
  Preparado = 'Preparado',
  Entregado = 'Entregado',
  Cancelado = 'Cancelado'
}