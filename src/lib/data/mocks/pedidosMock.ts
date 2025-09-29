import type { Pedido } from '$lib/types'
import { MedioDePago, EstadoDelPedido } from '$lib/types'

export const PEDIDOS_MOCK: Pedido[] = [
  {
    id: 1,
    cliente: 'Juan Perez',
    fecha: new Date('2023-10-01T12:30:00'),
    items: 3,
    precio: 1500,
    estado: EstadoDelPedido.Pendiente,
    direccion: 'Calle Falsa 123',
    medioDePago: MedioDePago.Efectivo
  },
  {
    id: 2,
    cliente: 'Sofia Miller',
    fecha: new Date('2025-09-28T12:30:00'),
    items: 2,
    precio: 25,
    estado: EstadoDelPedido.Pendiente,
    direccion: 'Av. Siempre Viva 555',
    medioDePago: MedioDePago.Tarjeta
  }
]