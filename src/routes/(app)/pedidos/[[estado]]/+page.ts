import { error } from '@sveltejs/kit'
import { rutasSegunEstado } from '$lib/types'

export function load({ params }) {
  const parametroEstado = params.estado?.toLowerCase()      //Trae el estado de la url con params

  // Si no hay parametro, va a /pedidos que por default esta en Pendientes
  if (!parametroEstado) {
    return { estado: null }
  }

  //Matchea lo que vino en la url con alguna ruta posible
  const estado = rutasSegunEstado[parametroEstado]      

  // Si no existe, tira error
  if (!estado) {
    throw error(404, `El estado '${params.estado}' no es válido.`)
  }

  // Devuelve el estado que consume el +page.svelte con el { data }
  return { estado }
}
