import { beforeEach, describe, expect, it } from 'vitest'
import { Plato, type PlatoJSON } from './plato.svelte'
import { Ingrediente } from './ingrediente.svelte'

describe('Plato', () => {
  let plato: Plato

  beforeEach(() => {
    plato = new Plato()
    plato.id = 1
    plato.nombre = 'Hamburguesa Completa'
    plato.descripcion = 'Deliciosa hamburguesa con todos los ingredientes'
    plato.imagenUrl = '/images/hamburguesa.jpg'
    plato.valorBase = 500
    plato.esDeAutor = false
    plato.esNuevo = false
    plato.estaEnPromocion = false
    plato.porcentajeDescuento = 0
    plato.costoProduccion = 250
  })

  describe('Manejo de ingredientes', () => {
    it('debe agregar un ingrediente correctamente', () => {
      const ingrediente = new Ingrediente(1, 'Tomate', 'Verduras', 'Nacional', 50)
      plato.agregarIngrediente(ingrediente)
      
      expect(plato.ingredientes).toHaveLength(1)
      expect(plato.ingredientes[0]).toEqual(ingrediente)
    })

    it('no debe agregar un ingrediente duplicado', () => {
      const ingrediente = new Ingrediente(1, 'Tomate', 'Verduras', 'Nacional', 50)
      plato.agregarIngrediente(ingrediente)
      plato.agregarIngrediente(ingrediente)
      
      expect(plato.ingredientes).toHaveLength(1)
    })

    it('debe agregar múltiples ingredientes diferentes', () => {
      const tomate = new Ingrediente(1, 'Tomate', 'Verduras', 'Nacional', 50)
      const lechuga = new Ingrediente(2, 'Lechuga', 'Verduras', 'Nacional', 30)
      const carne = new Ingrediente(3, 'Carne', 'Proteínas', 'Importado', 200)
      
      plato.agregarIngrediente(tomate)
      plato.agregarIngrediente(lechuga)
      plato.agregarIngrediente(carne)
      
      expect(plato.ingredientes).toHaveLength(3)
    })

    it('debe eliminar un ingrediente por id', () => {
      const tomate = new Ingrediente(1, 'Tomate', 'Verduras', 'Nacional', 50)
      const lechuga = new Ingrediente(2, 'Lechuga', 'Verduras', 'Nacional', 30)
      
      plato.agregarIngrediente(tomate)
      plato.agregarIngrediente(lechuga)
      plato.eliminarIngrediente(1)
      
      expect(plato.ingredientes).toHaveLength(1)
      expect(plato.ingredientes[0].id).toBe(2)
    })

    it('debe mantener los ingredientes si se intenta eliminar un id inexistente', () => {
      const tomate = new Ingrediente(1, 'Tomate', 'Verduras', 'Nacional', 50)
      plato.agregarIngrediente(tomate)
      plato.eliminarIngrediente(999)
      
      expect(plato.ingredientes).toHaveLength(1)
    })

    it('debe eliminar todos los ingredientes si están todos con el mismo id', () => {
      const tomate = new Ingrediente(1, 'Tomate', 'Verduras', 'Nacional', 50)
      plato.agregarIngrediente(tomate)
      plato.eliminarIngrediente(1)
      
      expect(plato.ingredientes).toHaveLength(0)
    })
  })

  describe('Conversión fromJson', () => {
    it('debe crear un plato desde JSON correctamente', () => {
      const platoJSON: PlatoJSON = {
        id: 1,
        nombre: 'Pizza Margherita',
        descripcion: 'Pizza clásica italiana',
        imagenNombre: 'pizza.jpg',
        valorBase: 800,
        esDeAutor: true,
        esNuevo: false,
        estaEnPromo: false,
        porcentajeDescuento: 0,
        costoProduccion: 300,
        listaDeIngredientes: [
          { id: 1, nombre: 'Tomate', grupo: 'Verduras', origen: 'Nacional', costo: 50 },
          { id: 2, nombre: 'Mozzarella', grupo: 'Lácteos', origen: 'Nacional', costo: 150 }
        ]
      }

      const platoFromJson = Plato.fromJson(platoJSON)

      expect(platoFromJson.id).toBe(1)
      expect(platoFromJson.nombre).toBe('Pizza Margherita')
      expect(platoFromJson.descripcion).toBe('Pizza clásica italiana')
      expect(platoFromJson.valorBase).toBe(800)
      expect(platoFromJson.esDeAutor).toBe(true)
      expect(platoFromJson.ingredientes).toHaveLength(2)
      expect(platoFromJson.ingredientes[0].nombre).toBe('Tomate')
    })

    it('debe crear un plato sin ingredientes si no vienen en el JSON', () => {
      const platoJSON: PlatoJSON = {
        id: 1,
        nombre: 'Pizza Margherita',
        descripcion: 'Pizza clásica italiana',
        imagenNombre: 'pizza.jpg',
        valorBase: 800,
        esDeAutor: true,
        esNuevo: false,
        estaEnPromo: false,
        porcentajeDescuento: 0,
        costoProduccion: 300,
        listaDeIngredientes: []
      }

      const platoFromJson = Plato.fromJson(platoJSON)

      expect(platoFromJson.ingredientes).toHaveLength(0)
    })

    it('debe manejar listaDeIngredientes undefined', () => {
      const platoJSON = {
        id: 1,
        nombre: 'Pizza Margherita',
        descripcion: 'Pizza clásica italiana',
        imagenNombre: 'pizza.jpg',
        valorBase: 800,
        esDeAutor: true,
        esNuevo: false,
        estaEnPromo: false,
        porcentajeDescuento: 0,
        costoProduccion: 300
      } as PlatoJSON

      const platoFromJson = Plato.fromJson(platoJSON)

      expect(platoFromJson.ingredientes).toHaveLength(0)
    })
  })

  describe('Conversión toJSON', () => {
    it('debe convertir a JSON correctamente', () => {
      const tomate = new Ingrediente(1, 'Tomate', 'Verduras', 'Nacional', 50)
      const carne = new Ingrediente(2, 'Carne', 'Proteínas', 'Importado', 200)
      plato.agregarIngrediente(tomate)
      plato.agregarIngrediente(carne)

      const json = plato.toJSON()

      expect(json).toEqual({
        id: 1,
        nombre: 'Hamburguesa Completa',
        descripcion: 'Deliciosa hamburguesa con todos los ingredientes',
        imagenNombre: 'hamburguesa.jpg',
        valorBase: 500,
        esDeAutor: false,
        esNuevo: false,
        estaEnPromo: false,
        porcentajeDescuento: 0,
        costoProduccion: 250,
        listaDeIngredientes: [
          { id: 1, nombre: 'Tomate', grupo: 'Verduras', origen: 'Nacional', costo: 50 },
          { id: 2, nombre: 'Carne', grupo: 'Proteínas', origen: 'Importado', costo: 200 }
        ]
      })
    })

    it('debe extraer correctamente el nombre de la imagen de la URL', () => {
      plato.imagenUrl = '/images/platos/especial.jpg'
      const json = plato.toJSON()

      expect(json.imagenNombre).toBe('especial.jpg')
    })

    it('debe usar imagen por defecto si imagenUrl está vacía', () => {
      plato.imagenUrl = ''
      const json = plato.toJSON()

      expect(json.imagenNombre).toBe('plato-nuevo.png')
    })

    it('debe convertir id null a undefined en JSON', () => {
      plato.id = null
      const json = plato.toJSON()

      expect(json.id).toBeUndefined()
    })

    it('debe convertir correctamente cuando está en promoción', () => {
      plato.estaEnPromocion = true
      plato.porcentajeDescuento = 25
      const json = plato.toJSON()

      expect(json.estaEnPromo).toBe(true)
      expect(json.porcentajeDescuento).toBe(25)
    })
  })

  describe('Manejo de errores', () => {
    it('debe saber si tiene error en un campo específico', () => {
      plato.agregarError('nombre', 'El nombre es requerido')
      
      expect(plato.tieneError('nombre')).toBe(true)
      expect(plato.tieneError('descripcion')).toBe(false)
    })

    it('debe agregar un error correctamente', () => {
      plato.agregarError('nombre', 'El nombre es requerido')
      
      expect(plato.errors).toHaveLength(1)
      expect(plato.errors[0].campo).toBe('nombre')
      expect(plato.errors[0].mensaje).toBe('El nombre es requerido')
    })

    it('debe devolver los mensajes de error de un campo', () => {
      plato.agregarError('nombre', 'El nombre es requerido')
      plato.agregarError('nombre', 'El nombre debe tener al menos 3 caracteres')
      
      const mensajes = plato.mensajesError('nombre')
      
      expect(mensajes).toBe('El nombre es requerido. El nombre debe tener al menos 3 caracteres')
    })

    it('debe devolver string vacío si no hay errores en el campo', () => {
      const mensajes = plato.mensajesError('nombre')
      
      expect(mensajes).toBe('')
    })

    it('debe saber si es inválido - caso feliz', () => {
      plato.nombre = ''
      plato.validarPlato()
      
      expect(plato.invalid()).toBe(true)
    })

    it('debe saber si es inválido - caso sin errores', () => {
      plato.validarPlato()
      
      expect(plato.invalid()).toBe(false)
    })
  })

  describe('Validaciones', () => {
    it('validación incorrecta de nombre vacío', () => {
      plato.nombre = ''
      plato.validarPlato()
      
      expect(plato.tieneError('nombre')).toBe(true)
      expect(plato.mensajesError('nombre')).toBe('Debe ingresar un nombre para el plato')
    })

    it('validación incorrecta de nombre solo con espacios', () => {
      plato.nombre = '   '
      plato.validarPlato()
      
      expect(plato.tieneError('nombre')).toBe(true)
    })

    it('validación incorrecta de descripción vacía', () => {
      plato.descripcion = ''
      plato.validarPlato()
      
      expect(plato.tieneError('descripcion')).toBe(true)
      expect(plato.mensajesError('descripcion')).toBe('Debe ingresar una descripción')
    })

    it('validación incorrecta de descripción solo con espacios', () => {
      plato.descripcion = '   '
      plato.validarPlato()
      
      expect(plato.tieneError('descripcion')).toBe(true)
    })

    it('validación incorrecta de imagen vacía', () => {
      plato.imagenUrl = ''
      plato.validarPlato()
      
      expect(plato.tieneError('imagen')).toBe(true)
      expect(plato.mensajesError('imagen')).toBe('Debe seleccionar una imagen')
    })

    it('validación incorrecta de valorBase null', () => {
      plato.valorBase = null as any
      plato.validarPlato()
      
      expect(plato.tieneError('valorBase')).toBe(true)
      expect(plato.mensajesError('valorBase')).toContain('Debe ingresar un precio válido')
    })

    it('validación incorrecta de valorBase negativo', () => {
      plato.valorBase = -100
      plato.validarPlato()
      
      expect(plato.tieneError('valorBase')).toBe(true)
      expect(plato.mensajesError('valorBase')).toContain('El precio debe ser mayor a 0')
    })

    it('validación incorrecta de valorBase en cero', () => {
      plato.valorBase = 0
      plato.validarPlato()
      
      expect(plato.tieneError('valorBase')).toBe(true)
      expect(plato.mensajesError('valorBase')).toBe('El precio debe ser mayor a 0')
    })

    it('validación incorrecta de porcentajeDescuento null cuando está en promoción', () => {
      plato.estaEnPromocion = true
      plato.porcentajeDescuento = null as any
      plato.validarPlato()
      
      expect(plato.tieneError('porcentajeDescuento')).toBe(true)
      expect(plato.mensajesError('porcentajeDescuento')).toContain('Debe ingresar un porcentaje de descuento')
    })

    it('validación incorrecta de porcentajeDescuento en cero cuando está en promoción', () => {
      plato.estaEnPromocion = true
      plato.porcentajeDescuento = 0
      plato.validarPlato()
      
      expect(plato.tieneError('porcentajeDescuento')).toBe(true)
      expect(plato.mensajesError('porcentajeDescuento')).toContain('El porcentaje debe estar entre 1% y 100%')
    })

    it('validación incorrecta de porcentajeDescuento negativo cuando está en promoción', () => {
      plato.estaEnPromocion = true
      plato.porcentajeDescuento = -10
      plato.validarPlato()
      
      expect(plato.tieneError('porcentajeDescuento')).toBe(true)
    })

    it('validación incorrecta de porcentajeDescuento mayor o igual a 100', () => {
      plato.estaEnPromocion = true
      plato.porcentajeDescuento = 100
      plato.validarPlato()
      
      expect(plato.tieneError('porcentajeDescuento')).toBe(true)
      expect(plato.mensajesError('porcentajeDescuento')).toBe('El porcentaje debe estar entre 1% y 100%')
    })

    it('validación incorrecta de porcentajeDescuento mayor a 100', () => {
      plato.estaEnPromocion = true
      plato.porcentajeDescuento = 150
      plato.validarPlato()
      
      expect(plato.tieneError('porcentajeDescuento')).toBe(true)
    })

    it('no debe validar porcentajeDescuento si no está en promoción', () => {
      plato.estaEnPromocion = false
      plato.porcentajeDescuento = 0
      plato.validarPlato()
      
      expect(plato.tieneError('porcentajeDescuento')).toBe(false)
    })

    it('debe limpiar errores previos al validar nuevamente', () => {
      plato.nombre = ''
      plato.validarPlato()
      expect(plato.errors.length).toBeGreaterThan(0)
      
      plato.nombre = 'Hamburguesa Completa'
      plato.validarPlato()
      expect(plato.tieneError('nombre')).toBe(false)
    })

    it('validación correcta con todos los campos válidos', () => {
      plato.validarPlato()
      
      expect(plato.invalid()).toBe(false)
      expect(plato.errors).toHaveLength(0)
    })

    it('validación correcta con promoción válida', () => {
      plato.estaEnPromocion = true
      plato.porcentajeDescuento = 25
      plato.validarPlato()
      
      expect(plato.invalid()).toBe(false)
    })

    it('debe acumular múltiples errores en diferentes campos', () => {
      plato.nombre = ''
      plato.descripcion = ''
      plato.imagenUrl = ''
      plato.valorBase = 0
      plato.validarPlato()
      
      expect(plato.errors.length).toBeGreaterThanOrEqual(4)
      expect(plato.tieneError('nombre')).toBe(true)
      expect(plato.tieneError('descripcion')).toBe(true)
      expect(plato.tieneError('imagen')).toBe(true)
      expect(plato.tieneError('valorBase')).toBe(true)
    })
  })

  describe('Propiedades derivadas', () => {
    it('debe generar imagenUrlCompleta correctamente', () => {
      plato.imagenUrl = '/images/hamburguesa.jpg'
      
      expect(plato.imagenUrlCompleta).toContain('/images/hamburguesa.jpg')
    })
  })
})