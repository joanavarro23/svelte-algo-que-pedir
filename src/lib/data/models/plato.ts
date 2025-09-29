export class Plato {
  constructor(
    public id: number,
    public titulo: string,
    public descripcion: string,
    public imagen: File,
    public precio: number,
    public platoDeAutor: boolean,
    public platoDePromocion: boolean
  ) {}
}