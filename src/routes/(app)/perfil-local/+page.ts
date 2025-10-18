import { error } from '@sveltejs/kit'
import { getLocal } from '$lib/services/localService'

export async function load() {
  try {
  const idLocal = 1 // Este ID luego se trae del usuario/local que tiene la sesión iniciada
    const localDataBackend = await getLocal(idLocal)
    return { localDataBackend }
  } catch (err) {
    // Si se recibe un error desde el servicio, cae acá
    throw error(404, 'Local no encontrado' + err)
  }
}