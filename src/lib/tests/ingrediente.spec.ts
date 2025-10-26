import { describe, it, expect } from 'vitest'
import { Ingrediente, GrupoAlimenticio, type IngredienteJSON } from '../models/ingrediente.svelte'

describe('Ingrediente', () => {
  describe('fromJson', () => {
    it('debe crear un Ingrediente desde un JSON válido con origen animal', () => {
      const json: IngredienteJSON = {
        id: 1,
        nombre: 'Leche',
        costo: 1.5,
        grupo: 'LACTEOS',
        origenAnimal: true,
      }
      const ingrediente = Ingrediente.fromJson(json)
      expect(ingrediente.id).toBe(1)
      expect(ingrediente.nombre).toBe('Leche')
      expect(ingrediente.costo).toBe(1.5)
      expect(ingrediente.grupo).toBe(GrupoAlimenticio.LACTEOS)
      expect(ingrediente.origen).toBe('animal')
    })

    it('debe crear un Ingrediente desde un JSON válido con origen vegetal', () => {
      const json: IngredienteJSON = {
        nombre: 'Tomate',
        costo: 0.5,
        grupo: 'FRUTAS_Y_VERDURAS',
        origenAnimal: false,
      }
      const ingrediente = Ingrediente.fromJson(json)
      expect(ingrediente.nombre).toBe('Tomate')
      expect(ingrediente.costo).toBe(0.5)
      expect(ingrediente.grupo).toBe(GrupoAlimenticio.FRUTAS_Y_VERDURAS)
      expect(ingrediente.origen).toBe('vegetal')
    })
  })

  describe('esAnimal', () => {
    it('el getter debe devolver true si el origen es animal', () => {
      const ingrediente = new Ingrediente()
      ingrediente.origen = 'animal'
      expect(ingrediente.esAnimal).toBe(true)
    })

    it('el setter debe establecer el origen a animal', () => {
      const ingrediente = new Ingrediente()
      ingrediente.esAnimal = true
      expect(ingrediente.origen).toBe('animal')
    })

    it('el setter debe establecer el origen a vegetal', () => {
      const ingrediente = new Ingrediente()
      ingrediente.esAnimal = false
      expect(ingrediente.origen).toBe('vegetal')
    })
  })

  describe('validarIngrediente', () => {
    it('no debe agregar errores para un ingrediente válido', () => {
      const ingrediente = new Ingrediente()
      ingrediente.nombre = 'Arroz'
      ingrediente.costo = 2
      ingrediente.grupo = GrupoAlimenticio.CEREALES_Y_TUBERCULOS
      ingrediente.validarIngrediente()
      expect(ingrediente.invalid()).toBe(false)
    })

    it('debe agregar un error si el nombre está vacío', () => {
      const ingrediente = new Ingrediente()
      ingrediente.costo = 2
      ingrediente.grupo = GrupoAlimenticio.CEREALES_Y_TUBERCULOS
      ingrediente.validarIngrediente()
      expect(ingrediente.tieneError('nombre')).toBe(true)
      expect(ingrediente.mensajesError('nombre')).toContain('Debe ingresar un nombre')
    })

    it('debe agregar un error si el costo es cero o negativo', () => {
      const ingrediente = new Ingrediente()
      ingrediente.nombre = 'Azúcar'
      ingrediente.costo = 0
      ingrediente.grupo = GrupoAlimenticio.AZUCARES_Y_DULCES
      ingrediente.validarIngrediente()
      expect(ingrediente.tieneError('costo')).toBe(true)
      expect(ingrediente.mensajesError('costo')).toContain('Debe ingresar un costo válido')
    })

    it('debe agregar un error si el grupo no está seleccionado', () => {
      const ingrediente = new Ingrediente()
      ingrediente.nombre = 'Aceite'
      ingrediente.costo = 3
      ingrediente.grupo = ''
      ingrediente.validarIngrediente()
      expect(ingrediente.tieneError('grupo')).toBe(true)
      expect(ingrediente.mensajesError('grupo')).toContain('Debe seleccionar un grupo')
    })
  })

  describe('toJSON', () => {
    it('debe convertir un Ingrediente a su representación JSON', () => {
      const ingrediente = new Ingrediente()
      ingrediente.id = 5
      ingrediente.nombre = 'Pollo'
      ingrediente.costo = 5
      ingrediente.grupo = GrupoAlimenticio.PROTEINAS
      ingrediente.origen = 'animal'

      const json = ingrediente.toJSON()

      expect(json.id).toBe(5)
      expect(json.nombre).toBe('Pollo')
      expect(json.costo).toBe(5)
      expect(json.grupo).toBe('PROTEINAS')
      expect(json.origenAnimal).toBe(true)
    })
  })

  describe('Manejo de errores', () => {
    it('debe agregar y verificar errores correctamente', () => {
      const ingrediente = new Ingrediente()
      ingrediente.agregarError('test', 'mensaje de prueba')
      expect(ingrediente.tieneError('test')).toBe(true)
      expect(ingrediente.tieneError('otro')).toBe(false)
      expect(ingrediente.mensajesError('test')).toBe('mensaje de prueba')
    })

    it('invalid() debe devolver true si hay errores', () => {
      const ingrediente = new Ingrediente()
      ingrediente.agregarError('test', 'error')
      expect(ingrediente.invalid()).toBe(true)
    })
  })
})
