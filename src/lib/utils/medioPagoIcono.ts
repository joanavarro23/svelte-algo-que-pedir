import { MedioDePago } from '$lib/types'

import tarjetaIcono from '$lib/assets/tarjeta-credito.svg'
import efectivoIcono from '$lib/assets/efectivo.svg'
import QRIcono from '$lib/assets/codigo-qr.svg'

export const mapaIconoPago = {
  [MedioDePago.Efectivo] : efectivoIcono,
  [MedioDePago.QR] : QRIcono,
  [MedioDePago.Tarjeta] : tarjetaIcono
} 



