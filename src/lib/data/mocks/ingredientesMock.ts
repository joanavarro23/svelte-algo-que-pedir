import { Ingrediente, GrupoAlimenticio } from '$lib/models/ingrediente.svelte'

// builder de ingrediente para que use correctamente metodos
function ingredienteBuilder(init: Partial<Ingrediente>) {
  const ingrediente = new Ingrediente()
  ingrediente.id = init.id ?? null
  ingrediente.nombre = init.nombre ?? ''
  ingrediente.costo = init.costo ?? 0
  ingrediente.grupo = init.grupo ?? null
  ingrediente.origen = init.origen ?? 'vegetal'
  return ingrediente
}

export const INGREDIENTES_MOCK: Ingrediente[] = [
  ingredienteBuilder({
    id: 1,
    nombre: 'Tomate',
    costo: 0.50,
    grupo: GrupoAlimenticio.FRUTAS_Y_VERDURAS,
    origen: 'vegetal',
  }),
  ingredienteBuilder({
    id: 2,
    nombre: 'Pechuga de pollo',
    costo: 3.00,
    grupo: GrupoAlimenticio.PROTEINAS,
    origen: 'animal'
  }),
  ingredienteBuilder({
    id: 3,
    nombre: 'Arroz',
    costo: 1.00,
    grupo: GrupoAlimenticio.CEREALES_Y_TUBERCULOS,
    origen: 'vegetal'
  }),
  ingredienteBuilder({
    id: 4,
    nombre: 'Leche',
    costo: 2.00,
    grupo: GrupoAlimenticio.LACTEOS,
    origen: 'animal'
  }),
  ingredienteBuilder({
    id: 5,
    nombre: 'Palta',
    costo: 1.50,
    grupo: GrupoAlimenticio.FRUTAS_Y_VERDURAS,
    origen: 'vegetal'
  })
]