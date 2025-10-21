import { redirect } from '@sveltejs/kit'
import { getLocal } from '$lib/services/localService'
import { getIdDelLocal } from '$lib/utils/currentSession'
import { hayUsuarioLogueado } from '$lib/utils/currentSession'

export async function load() {
  if(hayUsuarioLogueado()) {
    const idLocal = getIdDelLocal()
    const localDataBackend = await getLocal(idLocal!)
    return { localDataBackend }
  }
  else {
    //showToast('Debes estar logueado para acceder a esta página. Redirigiendo al login.','error',5000)
    //setTimeout(() => {goto('/login')}, 5000)
    //alert("Debes estar logueado para acceder a esa página")
    throw redirect(302, '/login')
  }
  

}