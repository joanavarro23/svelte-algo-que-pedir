import type { Pedido } from '$lib/types'
import { MedioDePago, EstadoDelPedido } from '$lib/types'

export const PEDIDOS_MOCK: Pedido[] = [
  {
    id: 1,
    cliente: 'Sofia Miller',
    fecha: new Date('2025-08-11T12:30:00'),
    items: 2,
    precio: 25,
    estado: EstadoDelPedido.Pendiente,
    direccion: 'Av. Siempre Viva 555',
    medioDePago: MedioDePago.Tarjeta
  },
  {
    id: 2,
    cliente: 'Micaela Moreno',
    fecha: new Date('2025-09-28T13:30:00'),
    items: 3,
    precio: 35,
    estado: EstadoDelPedido.Pendiente,
    direccion: 'Calle Falsa 123',
    medioDePago: MedioDePago.Efectivo
  },
  {
    id: 3,
    cliente: 'Jose Gomez',
    fecha: new Date('2025-09-28T12:00:00'),
    items: 1,
    precio: 15,
    estado: EstadoDelPedido.Pendiente,
    direccion: 'Cucha cucha 45',
    medioDePago: MedioDePago.QR
  },
  {
    id: 4,
    cliente: 'Micaela Moreno',
    fecha: new Date('2025-09-28T13:30:00'),
    items: 3,
    precio: 35,
    estado: EstadoDelPedido.Pendiente,
    direccion: 'Calle Falsa 123',
    medioDePago: MedioDePago.Tarjeta
  },
  {
    id: 5,
    cliente: 'Miguel Manso',
    fecha: new Date('2025-09-28T15:30:00'),
    items: 2,
    precio: 25,
    estado: EstadoDelPedido.Pendiente,
    direccion: 'Av. Rigoleau 333',
    medioDePago: MedioDePago.QR
  },
  {
    id: 6,
    cliente: 'Juan M. Gonzalez',
    fecha: new Date('2025-09-28T14:30:00'),
    items: 3,
    precio: 45,
    estado: EstadoDelPedido.Pendiente,
    direccion: 'Av. Siempre Viva 555',
    medioDePago: MedioDePago.Tarjeta
  },
  {
    id: 7,
    cliente: 'Juan Rodriguez',
    fecha: new Date('2025-09-20T16:30:00'),
    items: 2,
    precio: 25,
    estado: EstadoDelPedido.Pendiente,
    direccion: 'Av. Siempre Viva 556',
    medioDePago: MedioDePago.Efectivo
  }
]