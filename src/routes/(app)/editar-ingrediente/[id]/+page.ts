import { Ingrediente } from '$lib/models/ingrediente.svelte'
import { ingredientesService } from '$lib/services/ingredienteService'
import { redirect } from '@sveltejs/kit'

export async function load({ params }) {
  try {
    const nuevoIngrediente = params.id === 'nuevo'
    const ingrediente = nuevoIngrediente ? 
      new Ingrediente() :
      await ingredientesService.getIngredienteById(+params.id)
    return { ingrediente, nuevoIngrediente }
  } catch (error: unknown) {
    // eslint-disable-next-line no-console
    console.error('Error al cargar el ingrediente:', error)
    throw redirect(302, '/')
  }
}