import type { Ingrediente } from './ingrediente'

export type Plato = {
  id: number,
  nombre: string,
  descripcion: string,
  imagen: string,
  precio: string,
  esDeAutor?: boolean,
  enPromocion?: boolean,
  ingredientes?: Ingrediente[]
}
