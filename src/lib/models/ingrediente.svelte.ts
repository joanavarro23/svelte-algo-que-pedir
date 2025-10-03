export class Ingrediente {
  id: number | null = null
  nombre = $state<string>('')
  costo = $state<number>(0)
  grupo: GrupoAlimenticio | null = $state(null) 
  origen: Origen = $state('vegetal')
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