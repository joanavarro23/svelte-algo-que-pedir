import type { Ingrediente } from '../types/ingrediente'

// export type Plato = {
//   id: number,
//   nombre: string,
//   descripcion: string,
//   imagen: string,  // DEBERIA SER FILE
//   precio: number,
//   esDeAutor?: boolean,
//   enPromocion?: boolean,
//   ingredientes?: Ingrediente[]
// }

// export class Plato {
//   constructor(
//     public id: number,
//     public nombre: string,
//     public descripcion: string,
//     public precio: number,
//     public imagen: string,    // DEBERIA SER FILE?
//     public platoDeAutor?: boolean,
//     public platoDePromocion?: boolean,
//     public ingredientes?: Ingrediente[]
//   ) {}
// }

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
  imagen = $state<string>('')
  precio = $state<number | undefined>()
  platoDeAutor? = $state(false)
  platoDePromocion? = $state(false)
  ingredientes?: Ingrediente[]
  errors: ValidarMensaje[] = $state([])

  // tieneError(campo: string): boolean {
  //   return this.errors.some((_) => _.campo === campo)
  // }
  // agregarError(campo: string, mensaje: string) {
  //   this.errors.push( new ValidarMensaje(campo, mensaje))
  // }
  // mensajesError(campo: string): string {
  //   return this.errors
  //     .filter((_) => _.campo === campo)
  //     .map((_) => _.mensaje)
  //     .join('. ')
  // }

  // Validaciones
  // validarPlato() {
  //   this.errors.length = 0 // se limpian errores anteriores

  //   if (!this.nombre || this.nombre.trim().length === 0) {
  //     this.agregarError('titulo', 'Debe ingresar un nombre para el plato')
  //   }

  //   if (!this.descripcion || this.descripcion.trim().length === 0) {
  //     this.agregarError('descripcion', 'Debe ingresar una descripción')
  //   }

  //   if (!this.imagen) {
  //     this.agregarError('imagen', 'Debe seleccionar una imagen')
  //   }
  //   // if (this.imagen && !this.imagen.type.startsWith('image/')) {
  //   //   this.agregarError('imagen', 'El archivo debe ser una imagen válida')
  //   // }

  //   if (this.precio == null || this.precio <= 0) {
  //     this.agregarError('precio', 'Debe ingresar un precio válido y mayor a 0')
  //   }
  // }

  // Convierte los datos del input a un plato actualizado o en uno nuevo => id=null
  // convertirEnPlato(id?: number): Plato {
  //   return new Plato(
  //     id ?? undefined,
  //     this.titulo,
  //     this.descripcion,
  //     this.imagen,
  //     this.precio,
  //     this.platoDeAutor,
  //     this.platoDePromocion
  //   )
  // }

  // guardar(){
  //   this.validarPlato()
  //   if (this.errors.length > 0) return
  //   /* deberia validar que este ok, mostrar los mensjaes de error
  //     convertir los valores en un plato
  //     mandar al back los valores actualizados
  //   */
  // }
}