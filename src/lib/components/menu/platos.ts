export class Plato {
  constructor(
    public id: number,
    public titulo: string,
    public descripcion: string,
    public imagen: string,
    public precio: string
  ) {}
}

export const platos = [
  new Plato(1, 'Pasta cremosa', 'Deliciosa pasta con salsa cremosa', '/src/lib/assets/pasta-cremosa.png', '12.99'),
  new Plato(2, 'Alitas picantes', 'Alitas de pollo picantes con salsa para mojar', '/src/lib/assets/alitas-picantes.png', '9.99'),
  new Plato(3, 'Ensalada de la Huerta', 'Ensalada fresca con hojas mixtas y vinagreta', '/src/lib/assets/ensalada-huerta.png', '7.50'),
  new Plato(4, 'Hamburguesa con queso', 'Hamburguesa clásica con queso y papas fritas', '/src/lib/assets/hamburguesa-con-queso.png', '10.50'),
]