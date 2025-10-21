import { showToast } from "$lib/toasts/toasts"
import type { LocalDTO } from "$lib/dto/localDTO"
import { updateLocal } from "$lib/services/localService"
import { ValidarMensaje } from "$lib/utils/ValidarMensaje"
import type { MetodoDePago } from "./metodosDePago.svelte"
import { getUsuarioDelLocal } from "$lib/utils/currentSession"
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
  usuario = getUsuarioDelLocal
  metodosDePago: Record<MetodoDePago, boolean> = {
    QR: false,
    Efectivo: false,
    Transferencia: false
  }

  errors: ValidarMensaje[] = $state([])

  //Variable para hacer una copia de los valores originales de carga
  //por si el usuario descarta los cambios que realiza
  private original?: Local


  hayCambios(): boolean {
  if (!this.original) return false

  return (
    this.nombreLocal !== this.original.nombreLocal ||
    this.urlImagen !== this.original.urlImagen ||
    this.direccion !== this.original.direccion ||
    this.altura !== this.original.altura ||
    this.latitud !== this.original.latitud ||
    this.longitud !== this.original.longitud ||
    this.porcentajeApp !== this.original.porcentajeApp ||
    this.porcentajeAutor !== this.original.porcentajeAutor ||
    this.metodosDePago.QR !== this.original.metodosDePago.QR ||
    this.metodosDePago.Efectivo !== this.original.metodosDePago.Efectivo ||
    this.metodosDePago.Transferencia !== this.original.metodosDePago.Transferencia
  )
}
  // Consultar por una mejor forma de hacer esto
  copiaOriginal() {
    this.original = new Local()
    this.original.nombreLocal = this.nombreLocal
    this.original.urlImagen = this.urlImagen
    this.original.direccion = this.direccion
    this.original.altura = this.altura
    this.original.latitud = this.latitud
    this.original.longitud = this.longitud
    this.original.porcentajeApp = this.porcentajeApp
    this.original.porcentajeAutor = this.porcentajeAutor
    this.original.metodosDePago = { ...this.metodosDePago }
  }

  restaurarValores() {
    if (!this.original) return

    this.nombreLocal = this.original.nombreLocal
    this.urlImagen = this.original.urlImagen
    this.direccion = this.original.direccion
    this.altura = this.original.altura
    this.latitud = this.original.latitud
    this.longitud = this.original.longitud
    this.porcentajeApp = this.original.porcentajeApp
    this.porcentajeAutor = this.original.porcentajeAutor
    this.metodosDePago = { ...this.original.metodosDePago }
  }

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
      this.agregarError('nombreLocal', 'El nombre del local no puede estar vacío')
    }

    if (vacio(this.urlImagen)) {
      this.agregarError('urlImagen','Debe ingresar la URL de la imagen')
    }

    if (vacio(this.direccion)) {
      this.agregarError('nombreLocal', 'Por favor, ingrese una dirección válida')
    }

    if (!positivo(this.altura) || !esEntero(this.altura)) {
      this.agregarError('altura', 'Debe ingresar una altura válida')
    }

    if (LATITUD_MINIMA >= this.latitud || this.latitud >= LATITUD_MAXIMA) {
      this.agregarError('latitud', 'La latitud debe ser un valor entre -90° y 90°')
    }

    if (LONGITUD_MINIMA >= this.longitud || this.longitud >= LONGITUD_MAXIMA) {
      this.agregarError('longitud', 'La longitud debe ser un valor entre -180° y 180°')
    }

    if (PORCENTAJE_MINIMO >= this.porcentajeApp || this.porcentajeApp >= PORCENTAJE_MAXIMO) {
      this.agregarError('porcentajeApp', 'Debe ingresar un valor entre 0 y 100')
    }

    if (PORCENTAJE_MINIMO >= this.porcentajeAutor || this.porcentajeAutor >= PORCENTAJE_MAXIMO) {
      this.agregarError('porcentajeAutor', 'Debe ingresar un valor entre 0 y 100')
    }
  }

  async guardar() {
    this.validarLocal()
    if (this.errors.length > 0) return

    const mediosDePagoParaBackend: MetodoDePago[] = []
    if (this.metodosDePago.QR) mediosDePagoParaBackend.push('QR' as MetodoDePago)
    if (this.metodosDePago.Efectivo) mediosDePagoParaBackend.push('EFECTIVO' as MetodoDePago)
    if (this.metodosDePago.Transferencia) mediosDePagoParaBackend.push('TRANSFERENCIA_BANCARIA' as MetodoDePago)

    const localDTO: LocalDTO = {
      idLocal: this.idLocal ?? 1,
      nombre: this.nombreLocal,
      urlImagenLocal: this.urlImagen,
      direccion: this.direccion,
      altura: this.altura,
      latitud: this.latitud,
      longitud: this.longitud,
      porcentajeSobreCadaPlato: this.porcentajeApp,
      porcentajeRegaliasDeAutor: this.porcentajeAutor,
      usuario: this.usuario() ?? "",
      mediosDePago: mediosDePagoParaBackend
    }

    try {
      await updateLocal(localDTO)
      showToast('La información del local fue guardada correctamente', 'success', 3000)
      this.copiaOriginal()
    } catch (error) {
      showToast('Error al guardar la información del local: ' + error, 'error', 10000)
      //console.error(error)
    }
  }

  
}