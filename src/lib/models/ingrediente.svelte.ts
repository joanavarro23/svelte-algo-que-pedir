import { ValidarMensaje } from "$lib/utils/validarMensaje"

export class Ingrediente {
  id: number | null = null
  nombre = $state<string>('')
  costo = $state<number>(0)
  grupo: GrupoAlimenticio | string = $state('') 
  origen: Origen = $state('vegetal')
  errors: ValidarMensaje[] = $state([])

  static fromJson(ingredienteJSON: IngredienteJSON): Ingrediente {
    return Object.assign(new Ingrediente(), ingredienteJSON, {
      origen: ingredienteJSON.origenAnimal ? 'animal' : 'vegetal',
      grupo: mapGrupo(ingredienteJSON.grupo) 
    })
  }
  
  get esAnimal() {
    return this.origen === 'animal'
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

  validarIngrediente() {
    this.errors.length = 0 // se limpian errores anteriores
    if (!this.nombre || this.nombre.trim().length === 0) {
      this.agregarError('nombre', 'Debe ingresar un nombre para el ingrediente')
    }

    if (this.costo == null || this.costo <= 0) {
      this.agregarError('costo', 'Debe ingresar un costo válido y mayor a 0')
    }

    if (this.grupo == null || this.grupo === '') {
      this.agregarError('grupo', 'Debe seleccionar un grupo alimenticio')
    }
  }
}

export type Origen = 'animal' | 'vegetal'

export enum GrupoAlimenticio {
  CEREALES_Y_TUBERCULOS = 'Cereales y tubérculos',
  AZUCARES_Y_DULCES = 'Azúcares y dulces',
  LACTEOS = 'Lácteos',
  FRUTAS_Y_VERDURAS = 'Frutas y verduras',
  GRASAS_Y_ACEITES = 'Grasas y aceites',
  PROTEINAS = 'Proteínas'
}

export type IngredienteJSON = {
  id?: number,
  nombre: string,
  costo: string,
  grupo: string,
  origenAnimal: boolean
}

// función que mapea el enum del grupo alimenticio con el label
function mapGrupo(grupo: string): GrupoAlimenticio {
  return GrupoAlimenticio[grupo as keyof typeof GrupoAlimenticio]
}