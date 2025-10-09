import { MedioDePago } from '$lib/types'

import tarjetaIcono from '$lib/assets/tarjeta-credito.svg'
import efectivoIcono from '$lib/assets/efectivo.svg'
import QRIcono from '$lib/assets/codigo-qr.svg'

export const iconoMedioDePago = (medio: MedioDePago): string => {
  /* Para el renderizado de iconos de medio de pago diferentes */
  if (medio === MedioDePago.Efectivo) {
    return efectivoIcono
  } else if (medio === MedioDePago.QR) {
    return QRIcono
  } else {
    return tarjetaIcono
  }
}