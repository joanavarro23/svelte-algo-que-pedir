import { aceptaEstadoMinMayus } from '$lib/utils/estadoPedidos'
import type { PageLoad } from './$types'
import { error } from '@sveltejs/kit'

export const load : PageLoad = async ( { url } ) => {
  const estado = url.searchParams.get('estado')

  //Siempre va a devolver algo en plural y minuscula, no importa si llega en min o mayus
  const estadoValidado = aceptaEstadoMinMayus(estado)

  if(!estadoValidado){
    throw error(404, `El estado '${estado}' no es válido.`)
  }

  // Devuelve el estado que consume el +page.svelte con el { data }
  return { estadoValidado }
}
