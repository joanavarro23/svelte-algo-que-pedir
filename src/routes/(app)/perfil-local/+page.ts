import { redirect } from '@sveltejs/kit'
import { getLocal } from '$lib/services/localService'
import { getIdDelLocal, hayUsuarioLogueado } from '$lib/utils/currentSession'

export async function load() {
  if(hayUsuarioLogueado()) {
    const idLocal = getIdDelLocal()
    const localDataBackend = await getLocal(idLocal!)
    return { localDataBackend }
  }
  else {
    throw redirect(302, '/login')
  }
  

}