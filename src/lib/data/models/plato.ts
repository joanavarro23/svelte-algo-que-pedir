// Clase para guardar los datos puros del Plato. Es parte del Modelo de dominio (back)
export class Plato {
  constructor(
    public id: number | undefined,
    public titulo: string,
    public descripcion: string,
    public imagen: string | null,    // DEBERIA SER FILE?
    public precio: number | undefined,
    public platoDeAutor: boolean,
    public platoDePromocion: boolean
  ) {}
}