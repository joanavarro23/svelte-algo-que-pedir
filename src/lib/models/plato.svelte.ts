import type { Ingrediente } from '../types/ingrediente'

export class ValidarMensaje {  
  constructor(
    public campo: string,
    public mensaje: string
  ) {}
}

export class Plato {
  id: number | null = null
  nombre = $state<string>('')
  descripcion = $state<string>('')
  // imagen = $state<File | null>(null) 
  imagen = $state<string>('')             // DEBERIA SER FILE: DESCOMENTAR LA VALIDACION QUE SEA IMAGEN
  precio = $state<number>(0)
  platoDeAutor? = $state(false)
  platoDePromocion? = $state(false)
  ingredientes?: Ingrediente[]
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
  validarPlato() {
    this.errors.length = 0 // se limpian errores anteriores
    if (!this.nombre || this.nombre.trim().length === 0) {
      this.agregarError('titulo', 'Debe ingresar un nombre para el plato')
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
    if (this.precio == null || this.precio <= 0) {
      this.agregarError('precio', 'Debe ingresar un precio válido y mayor a 0')
    }
  }

  // guardar(){
  //   this.validarPlato()
  //   if (this.errors.length > 0) return
  /* deberia validar que este ok, mostrar los mensjaes de error
      convertir los valores en un plato
      mandar al back los valores actualizados
    EN REALIDAD TENDRIA QUE LLAMAR AL SERVICE QUE SE ENCARGUE, NO ES SU RESPONSABILIDAD
  */
  // }

  // Quizas algun metodo extra para devolver el precio total (copiar metodo del back), entre otros metodos utiles
}