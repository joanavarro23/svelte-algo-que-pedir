import { Ingrediente } from '$lib/models/ingrediente.svelte'
import { ingredientesService } from '$lib/services/ingredienteService'
import { error } from '@sveltejs/kit'

export async function load({ params }) {
  try {
    const nuevoIngrediente = params.id === 'nuevo'
    const ingrediente = nuevoIngrediente ? 
      new Ingrediente() :
      await ingredientesService.getIngredienteById(+params.id)
    return { ingrediente, nuevoIngrediente }
  } catch (err) {
    if (err instanceof Error) {
      throw error(404, err.message)
    }
    throw error(500, 'Error al cargar el pedido')
  }
}