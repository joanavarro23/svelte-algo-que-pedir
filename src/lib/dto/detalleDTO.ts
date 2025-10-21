export interface PlatoDTO {
  id: number
  nombre: string
  precio: number
  descripcion: string
  imagenUrl: string
}

export interface ClienteInfoDTO {
  nombre: string
  username: string
  direccion: string
}

export interface PedidoDetalleDTO {
  id: number
  cliente: ClienteInfoDTO
  platos: PlatoDTO[]
  subtotal: number
  comisionDelivery: number
  incrementoPago: number
  total: number
  estado: string
  medioDePago: string
}