
import type { MetodoDePago } from "./metodosDePago.svelte"

export class Local {

  idLocal: number | null = null
  nombreLocal = $state<string>('')
  urlImagen = $state<string>('')
  direccion = $state<string>('')
  altura = $state<number>(0)
  latitud = $state<number>(0)
  longitud = $state<number>(0)
  porcentajeApp = $state<number>(0)
  porcentajeAutor = $state<number>(0)
  metodosDePago: Record<MetodoDePago, boolean> = {
    QR: false,
    Efectivo: false,
    Transferencia: false
  }

  guardar(){}

}