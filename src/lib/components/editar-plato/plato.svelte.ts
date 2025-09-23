import { Plato, platos } from "../menu/platos"

export class Platos { 
  id: number = 0
  titulo: string | null = $state(null)
  descripcion: string | null = $state(null)
  imagen: File | null = $state(null)
  precio: number | null = $state(null)
  platoDeAutor: boolean = $state(false)
  platoDePromocion: boolean = $state(false)

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

    if (!this.titulo || this.titulo.trim().length === 0) {
      this.agregarError('titulo', 'Debe ingresar un nombre para el plato')
    }

    if (!this.descripcion || this.descripcion.trim().length === 0) {
      this.agregarError('descripcion', 'Debe ingresar una descripción')
    }

    if (!this.imagen) {
      this.agregarError('imagen', 'Debe seleccionar una imagen')
    }
    if (this.imagen && !this.imagen.type.startsWith("image/")) {
      this.agregarError('imagen', 'El archivo debe ser una imagen válida')
    }

    if (this.precio == null || this.precio <= 0) {
      this.agregarError('precio', 'Debe ingresar un precio válido y mayor a 0')
    }
  }

  buscarPlato(id: number): Plato | undefined {
  return platos.find(plato => plato.id === id)
  }
}

export class ValidarMensaje {
  constructor(
    public campo: string,
    public mensaje: string
  ) {}
}