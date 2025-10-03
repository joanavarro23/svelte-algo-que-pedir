import { Plato } from '$lib/models/plato.svelte'
import { INGREDIENTES_MOCK } from "$lib/data/mocks/ingredientesMock"

const INGREDIENTES_A = [
  INGREDIENTES_MOCK[0],
  INGREDIENTES_MOCK[2],
  INGREDIENTES_MOCK[3]
]
const INGREDIENTES_B = [
  INGREDIENTES_MOCK[1],
  INGREDIENTES_MOCK[4]
]

// builder de plato para que use correctamente metodos
function PlatosBuilder(Init: Partial<Plato>){
  const plato = new Plato()
  plato.id = Init.id ?? null
  plato.nombre = Init.nombre ?? ''
  plato.descripcion = Init.descripcion ?? ''
  plato.imagen = Init.imagen ?? ''
  plato.precio = Init.precio ?? 0
  plato.platoDeAutor = Init.platoDeAutor ?? false
  plato.platoDePromocion = Init.platoDePromocion ?? false
  plato.ingredientes = Init.ingredientes ?? []
  plato.errors = Init.errors ?? []

  return plato
}


export const PLATOS_MOCK: Plato[] = [
  PlatosBuilder({
    id: 1,
    nombre: 'Pasta cremosa',
    descripcion: 'Deliciosa pasta con salsa cremosa',
    imagen: '/src/lib/assets/pasta-cremosa.png',
    precio: 12.99,
    platoDeAutor: true,
    platoDePromocion: true,
    ingredientes: INGREDIENTES_A,
    errors: [],
  }),
  PlatosBuilder({
    id: 2,
    nombre: 'Alitas picantes',
    descripcion: 'Alitas de pollo picantes con salsa para mojar',
    imagen: '/src/lib/assets/alitas-picantes.png',
    precio: 9.99,
    ingredientes: INGREDIENTES_B,
    errors: []
  }),
  PlatosBuilder({
    id: 3,
    nombre: 'Ensalada de la Huerta',
    descripcion: 'Ensalada fresca con hojas mixtas y vinagreta',
    imagen: '/src/lib/assets/ensalada-huerta.png',
    precio: 7.50,
    errors: [],
    platoDeAutor: true
  }),
  PlatosBuilder({
    id: 4,
    nombre: 'Hamburguesa con queso',
    descripcion: 'Hamburguesa clásica con queso y papas fritas',
    imagen: '/src/lib/assets/hamburguesa-con-queso.png',
    precio: 10.50,
    errors: [],
    platoDePromocion: true
  }),
  PlatosBuilder({
    id: 5,
    nombre: 'Pescado y Papas Fritas',
    descripcion: 'Pescado crujiente y papas fritas con salsa tártara',
    imagen: '/src/lib/assets/pescado-papas-fritas.png',
    precio: 11.75,
    errors: []
  }),
  PlatosBuilder({
    id: 6,
    nombre: 'Pizza Vegetariana',
    descripcion: 'Pizza vegetariana con ingredientes variados',
    imagen: '/src/lib/assets/pizza-vegetariana.png',
    precio: 14.25,
    errors: []
  }),
  PlatosBuilder({
    id: 7,
    nombre: 'Pastel de Chocolate',
    descripcion: 'Pastel de chocolate rico con glaseado',
    imagen: '/src/lib/assets/pastel-chocolate.png',
    precio: 6.50,
    errors: []
  })
]

