import { Ingrediente, GrupoAlimenticio } from '$lib/models/ingrediente.svelte'

export const INGREDIENTES_MOCK: Ingrediente[] = [
  {
    id: 1,
    nombre: 'Tomate',
    costo: 0.50,
    grupo: GrupoAlimenticio.FRUTAS_Y_VERDURAS,
    origen: 'vegetal'
  },
  {
    id: 2,
    nombre: 'Pechuga de pollo',
    costo: 3.00,
    grupo: GrupoAlimenticio.PROTEINAS,
    origen: 'animal'
  },
  {
    id: 3,
    nombre: 'Arroz',
    costo: 1.00,
    grupo: GrupoAlimenticio.CEREALES_Y_TUBERCULOS,
    origen: 'vegetal'
  },
  {
    id: 4,
    nombre: 'Leche',
    costo: 2.00,
    grupo: GrupoAlimenticio.LACTEOS,
    origen: 'animal'
  },
  {
    id: 5,
    nombre: 'Palta',
    costo: 1.50,
    grupo: GrupoAlimenticio.FRUTAS_Y_VERDURAS,
    origen: 'vegetal'
  }
]