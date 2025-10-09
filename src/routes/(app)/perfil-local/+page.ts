//import { PERFIL_LOCAL_MOCK } from '$lib/data/mocks/perfilLocalMock'
//
//export function load() {
//  return {
//    perfilLocal: PERFIL_LOCAL_MOCK
//  }
//}

import { error } from '@sveltejs/kit'
import { getLocal } from '$lib/services/localService'

export async function load() {
  try {
    const local = await getLocal()
    return { local }
  } catch (err) {
    // Si SvelteKit recibe un throw error desde el servicio, cae acá
    throw error(404, 'Local no encontrado' + err)
  }
}