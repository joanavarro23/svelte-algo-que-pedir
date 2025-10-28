import { redirect } from '@sveltejs/kit'
import { getLocal } from '$lib/services/localService'
import { getIdDelLocal } from '$lib/utils/currentSession'

export async function load() {
  if(1 == 1) { //hayUsuarioLogueado()
    const idLocal = getIdDelLocal()
    // eslint-disable-next-line
    const localDataBackend = await getLocal(idLocal!)
    return { localDataBackend }
  }
  else {
    throw redirect(302, '/login')
  }
}