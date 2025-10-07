export type Ingrediente = {
  eliminar(): void
  id: number,
  nombre: string,
  costo: string,
  grupo: GrupoAlimenticio,
  origen: Origen
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