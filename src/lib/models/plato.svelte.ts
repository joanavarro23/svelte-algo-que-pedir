import { Ingrediente, type IngredienteJSON } from '$lib/models/ingrediente.svelte'
import { ValidarMensaje } from '$lib/utils/validadorMensaje/ValidarMensaje'

export class Plato {
  id: number | null = null
  nombre = $state<string>('')
  descripcion = $state<string>('')
  // imagen = $state<File | null>(null) 
  imagen = $state<string>('/src/lib/assets/plato-nuevo.jpg')             // DEBERIA SER FILE: DESCOMENTAR LA VALIDACION QUE SEA IMAGEN
  valorBase = $state<number>(0)
  esDeAutor? = $state(false)
  estaEnPromocion? = $state(false)
  valorPorcentaje = $state<number>(0)
  costoProduccion = $state<number>(0)
  ingredientes: Ingrediente[] = $state([])
  errors: ValidarMensaje[] = $state([])

  // Si el plato es nuevo (viene la info del back)
  esNuevo = $derived(this.estaEnPromocion === false)

  // Administrar ingredientes
  agregarIngrediente(ingrediente: Ingrediente) {
    if (!this.ingredientes.find(i => i.id === ingrediente.id)) {
      this.ingredientes.push(ingrediente)
    }
  }
  eliminarIngrediente(id: number) {
    this.ingredientes = this.ingredientes.filter(i => i.id !== id)
  }

  // Crea desde el DTO del back un plato
  static fromJson(platoJSON: PlatoJSON): Plato {
    return Object.assign(new Plato(), platoJSON, {
      ingredientes: platoJSON.ingredientes
        ? platoJSON.ingredientes.map(ing => Ingrediente.fromJson(ing))
        : []
    })
  }

  // Convierte a DTO el plato para enviarlo al back
  toJSON(): PlatoJSON {
    return{
      id: this.id ?? undefined,
      nombre: this.nombre,
      descripcion: this.descripcion,
      valorBase: this.valorBase,
      esDeAutor: this.esDeAutor,
      estaEnPromocion: this.estaEnPromocion,
      valorPorcentaje: this.valorPorcentaje,
      ingredientes: this.ingredientes.map(i =>  i.toJSON())
    }
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
  validarPlato() {
    this.errors.length = 0 // se limpian errores anteriores
    if (!this.nombre || this.nombre.trim().length === 0) {
      this.agregarError('nombre', 'Debe ingresar un nombre para el plato')
    }
    if (!this.descripcion || this.descripcion.trim().length === 0) {
      this.agregarError('descripcion', 'Debe ingresar una descripción')
    }
    if (!this.imagen) {
      this.agregarError('imagen', 'Debe seleccionar una imagen')
    }
    // if (this.imagen && !this.imagen.type.startsWith('image/')) {
    //   this.agregarError('imagen', 'El archivo debe ser una imagen válida')
    // }
    if (this.valorBase == null || this.valorBase <= 0) {
      this.agregarError('valorBase', 'Debe ingresar un precio válido y mayor a 0')
    }
    if (this.estaEnPromocion && (this.valorPorcentaje <= 0 || this.valorPorcentaje >= 100)) {
      this.agregarError('valorPorcentaje', "El porcentaje debe estar entre 1 y 100")
    }
  }
  
  invalid(): boolean {
    return this.errors.length > 0
  }
}

export type PlatoJSON = {
  id?: number,
  nombre: string,
  descripcion: string,
  valorBase: number,
  esDeAutor?: boolean,
  estaEnPromocion?: boolean,
  valorPorcentaje: number,
  ingredientes: IngredienteJSON[]
}