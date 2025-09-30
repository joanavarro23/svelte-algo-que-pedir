import type { Ingrediente } from './ingrediente'

export type Plato = {
  id: number,
  nombre: string,
  descripcion: string,
  imagen: string,  // DEBERIA SER FILE
  precio: number,
  esDeAutor?: boolean,
  enPromocion?: boolean,
  ingredientes?: Ingrediente[]
}
