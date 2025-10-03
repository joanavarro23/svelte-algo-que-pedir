/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Plato } from '$lib/types'

export const PLATOS_MOCK: Plato[] = [
  {
    id: 1,
    nombre: 'Pasta cremosa',
    descripcion: 'Deliciosa pasta con salsa cremosa',
    imagen: '/src/lib/assets/pasta-cremosa.png',
    precio: 12.99,
    errors: [],
    platoDeAutor: true,
    tieneError: function (campo: string): boolean {
      throw new Error('Function not implemented.')
    },
    agregarError: function (campo: string, mensaje: string): void {
      throw new Error('Function not implemented.')
    },
    mensajesError: function (campo: string): string {
      throw new Error('Function not implemented.')
    },
    validarPlato: function (): void {
      throw new Error('Function not implemented.')
    }
  },
  {
    id: 2,
    nombre: 'Alitas picantes',
    descripcion: 'Alitas de pollo picantes con salsa para mojar',
    imagen: '/src/lib/assets/alitas-picantes.png',
    precio: 9.99,
    errors: [],
    tieneError: function (campo: string): boolean {
      throw new Error('Function not implemented.')
    },
    agregarError: function (campo: string, mensaje: string): void {
      throw new Error('Function not implemented.')
    },
    mensajesError: function (campo: string): string {
      throw new Error('Function not implemented.')
    },
    validarPlato: function (): void {
      throw new Error('Function not implemented.')
    }
  },
  {
    id: 3,
    nombre: 'Ensalada de la Huerta',
    descripcion: 'Ensalada fresca con hojas mixtas y vinagreta',
    imagen: '/src/lib/assets/ensalada-huerta.png',
    precio: 7.50,
    errors: [],
    tieneError: function (campo: string): boolean {
      throw new Error('Function not implemented.')
    },
    agregarError: function (campo: string, mensaje: string): void {
      throw new Error('Function not implemented.')
    },
    mensajesError: function (campo: string): string {
      throw new Error('Function not implemented.')
    },
    validarPlato: function (): void {
      throw new Error('Function not implemented.')
    }
  },
  {
    id: 4,
    nombre: 'Hamburguesa con queso',
    descripcion: 'Hamburguesa clásica con queso y papas fritas',
    imagen: '/src/lib/assets/hamburguesa-con-queso.png',
    precio: 10.50,
    errors: [],
    tieneError: function (campo: string): boolean {
      throw new Error('Function not implemented.')
    },
    agregarError: function (campo: string, mensaje: string): void {
      throw new Error('Function not implemented.')
    },
    mensajesError: function (campo: string): string {
      throw new Error('Function not implemented.')
    },
    validarPlato: function (): void {
      throw new Error('Function not implemented.')
    }
  },
  {
    id: 5,
    nombre: 'Pescado y Papas Fritas',
    descripcion: 'Pescado crujiente y papas fritas con salsa tártara',
    imagen: '/src/lib/assets/pescado-papas-fritas.png',
    precio: 11.75,
    errors: [],
    tieneError: function (campo: string): boolean {
      throw new Error('Function not implemented.')
    },
    agregarError: function (campo: string, mensaje: string): void {
      throw new Error('Function not implemented.')
    },
    mensajesError: function (campo: string): string {
      throw new Error('Function not implemented.')
    },
    validarPlato: function (): void {
      throw new Error('Function not implemented.')
    }
  },
  {
    id: 6,
    nombre: 'Pizza Vegetariana',
    descripcion: 'Pizza vegetariana con ingredientes variados',
    imagen: '/src/lib/assets/pizza-vegetariana.png',
    precio: 14.25,
    errors: [],
    tieneError: function (campo: string): boolean {
      throw new Error('Function not implemented.')
    },
    agregarError: function (campo: string, mensaje: string): void {
      throw new Error('Function not implemented.')
    },
    mensajesError: function (campo: string): string {
      throw new Error('Function not implemented.')
    },
    validarPlato: function (): void {
      throw new Error('Function not implemented.')
    }
  },
  {
    id: 7,
    nombre: 'Pastel de Chocolate',
    descripcion: 'Pastel de chocolate rico con glaseado',
    imagen: '/src/lib/assets/pastel-chocolate.png',
    precio: 6.50,
    errors: [],
    tieneError: function (campo: string): boolean {
      throw new Error('Function not implemented.')
    },
    agregarError: function (campo: string, mensaje: string): void {
      throw new Error('Function not implemented.')
    },
    mensajesError: function (campo: string): string {
      throw new Error('Function not implemented.')
    },
    validarPlato: function (): void {
      throw new Error('Function not implemented.')
    }
  }
]

