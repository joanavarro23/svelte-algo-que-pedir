import { showToast } from "$lib/toasts/toasts"
import type { LocalDTO } from "$lib/dto/localDTO"
import { updateLocal } from "$lib/services/localService"
import { ValidarMensaje } from "$lib/utils/validarMensaje"
import type { MetodoDePago } from "./metodosDePago.svelte"
import { esEntero, positivo, vacio } from "$lib/validaciones/validaciones"

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

  errors: ValidarMensaje[] = $state([])

  tieneError(campo: string): boolean {
    return this.errors.some((_) => _.campo === campo)
  }
  agregarError(campo: string, mensaje: string) {
    this.errors.push( new ValidarMensaje(campo, mensaje))
  }
  mensajesError(campo: string): string {
    return this.errors
      .filter((_) => _.campo === campo)
      .map((_) => _.mensaje)
      .join('. ')
  }

  // Validaciones
  validarLocal() {
    
    const PORCENTAJE_MINIMO = 0
    const PORCENTAJE_MAXIMO = 100
    const LATITUD_MINIMA = -90
    const LATITUD_MAXIMA = 90
    const LONGITUD_MINIMA = -180
    const LONGITUD_MAXIMA = 180

    this.errors.length = 0 // se limpian errores anteriores

    if (vacio(this.nombreLocal)) {
      this.agregarError('nombreLocal', 'Debe ingresar un nombre para el local')
    }

    if (vacio(this.urlImagen)) {
      this.agregarError('urlImagen','Debe ingresar la URL de la imagen')
    }

    if (vacio(this.direccion)) {
      this.agregarError('nombreLocal', 'Debe ingresar una dirección válida')
    }

    if (!positivo(this.altura) || !esEntero(this.altura)) {
      this.agregarError('altura', 'Debe ingresar una altura válida')
    }

    if (PORCENTAJE_MINIMO >= this.porcentajeApp || this.porcentajeApp >= PORCENTAJE_MAXIMO) {
      this.agregarError('porcentajeApp', 'Debe ingresar un valor entre 0 y 100')
    }

    if (LATITUD_MINIMA >= this.latitud || this.latitud >= LATITUD_MAXIMA) {
      this.agregarError('latitud', 'La latitud debe ser un valor entre -90° y 90°')
    }

    if (LONGITUD_MINIMA >= this.longitud || this.longitud >= LONGITUD_MAXIMA) {
      this.agregarError('longitud', 'La longitud debe ser un valor entre -180° y 180°')
    }

    if (PORCENTAJE_MINIMO >= this.porcentajeAutor || this.porcentajeAutor >= PORCENTAJE_MAXIMO) {
      this.agregarError('porcentajeAutor', 'Debe ingresar un valor entre 0 y 100')
    }
    
    // if (this.imagen && !this.imagen.type.startsWith('image/')) {
    //   this.agregarError('imagen', 'El archivo debe ser una imagen válida')
    // }

  }

  async guardar() {
    this.validarLocal()
    if (this.errors.length > 0) return

    const mediosDePagoParaBackend: MetodoDePago[] = []
    if (this.metodosDePago.QR) mediosDePagoParaBackend.push('QR' as MetodoDePago)
    if (this.metodosDePago.Efectivo) mediosDePagoParaBackend.push('EFECTIVO' as MetodoDePago)
    if (this.metodosDePago.Transferencia) mediosDePagoParaBackend.push('TRANSFERENCIA_BANCARIA' as MetodoDePago)

    const localDTO: LocalDTO = {
      nombre: this.nombreLocal,
      urlImagenLocal: this.urlImagen,
      direccion: this.direccion,
      altura: this.altura,
      latitud: this.latitud,
      longitud: this.longitud,
      porcentajeSobreCadaPlato: this.porcentajeApp,
      porcentajeRegaliasDeAutor: this.porcentajeAutor,
      mediosDePago: mediosDePagoParaBackend
    }

    try {
      await updateLocal(localDTO)
      showToast('La información del local fue guardada correctamente', 'success', 3000)
    } catch (error) {
      showToast('Error al guardar la información del local: ' + error, 'error', 10000)
      console.error(error)
    }
  }
}