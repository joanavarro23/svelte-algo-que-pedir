import type { Ingrediente } from '../types/ingrediente';

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

export class Plato {
  constructor(
    public id: number,
    public nombre: string,
    public descripcion: string,
    public precio: number,
    public imagen: string,    // DEBERIA SER FILE?
    public platoDeAutor?: boolean,
    public platoDePromocion?: boolean,
    public ingredientes?: Ingrediente[]
  ) {}
}