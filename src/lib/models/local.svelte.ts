
export class Local {

  idLocal: number | null = null
  nombreLocal = $state<string>('')
  urlImagen = $state<string>('')
  direccion = $state<string>('')
  altura = $state<number>()
  latitud = $state<number>()
  longitud = $state<number>()
  porcentajeApp = $state<number>()
  porcentajeAutor = $state<number>()
  metodosDePago: Record<string, boolean> = { QR: false, Efectivo: false, Transferencia: false }

  guardar(){}

}