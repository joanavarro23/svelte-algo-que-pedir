export type Origen = 'animal' | 'vegetal'
export class Ingrediente {
  constructor(
    public id: number,
    public nombre: string,
    public costo: string,
    public grupo: string,
    public origen: Origen
  ) {}
}

export const ingredientes = [
  new Ingrediente(1, 'Tomate', '$0.50', 'Frutas y verduras', 'vegetal'),
  new Ingrediente(2, 'Pechuga de pollo', '$3.00', 'Proteínas', 'animal'),
  new Ingrediente(3, 'Arroz', '$1.00', 'Cereales y tuberculos', 'vegetal'),
  new Ingrediente(4, 'Leche', '$2.00', 'Lácteos', 'animal'),
  new Ingrediente(5, 'Palta', '$1.50', 'Frutas y verduras', 'vegetal'),
]