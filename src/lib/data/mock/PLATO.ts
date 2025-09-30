import { Plato } from '$lib/data/models/plato'

export const PLATOS_MOCK: Plato[] = [
  { id: 1, 
    titulo:'Pasta cremosa', 
    descripcion:'Deliciosa pasta con salsa cremosa', 
    imagen:'/src/lib/assets/pasta-cremosa.png', 
    precio: 12.99,
    platoDeAutor: true,
    platoDePromocion: false
  },
  {id:2, 
    titulo:'Alitas picantes', 
    descripcion:'Alitas de pollo picantes con salsa para mojar', 
    imagen:'/src/lib/assets/alitas-picantes.png', 
    precio:9.99,
    platoDeAutor: false,
    platoDePromocion: false
  },
  {id:3, 
    titulo:'Ensalada de la Huerta', 
    descripcion:'Ensalada fresca con hojas mixtas y vinagreta', 
    imagen:'/src/lib/assets/ensalada-huerta.png', 
    precio:7.50,
    platoDeAutor: false,
    platoDePromocion: false
  },
  {id:4, 
    titulo:'Hamburguesa con queso', 
    descripcion:'Hamburguesa clásica con queso y papas fritas', 
    imagen:'/src/lib/assets/hamburguesa-con-queso.png', 
    precio:10.50,
    platoDeAutor: false,
    platoDePromocion: false
  }
]