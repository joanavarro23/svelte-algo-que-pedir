import { platosService } from '$lib/services/platoService'
import { Plato } from '$lib/models/plato.svelte' 
import { error, redirect } from '@sveltejs/kit'

export async function load({ params }: { params: { id: string } }) {
  try {
    const nuevoPlato = params.id === undefined
    const plato = nuevoPlato ?
      new Plato() :
      await platosService.obtenerPorId(+params.id)
    if (isNaN(+params.id)) {
      throw error (400, `El parametro debe ser un número válido`)
    }
    return { plato, nuevoPlato }
  } catch (error: unknown) {
    // eslint-disable-next-line no-console
    console.error('Error al cargar el plato: ', error)
    throw redirect(302, '/')
  }
}