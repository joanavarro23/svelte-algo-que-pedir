import { error } from '@sveltejs/kit'
import { getLocal } from '$lib/services/localService'

export async function load() {
  try {
    const local = await getLocal()
    return { local }
  } catch (err) {
    // Si se recibe un error desde el servicio, cae acá
    throw error(404, 'Local no encontrado' + err)
  }
}