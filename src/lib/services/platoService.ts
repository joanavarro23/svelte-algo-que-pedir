import { Plato, type PlatoJSON } from '$lib/models/plato.svelte'
import { error } from '@sveltejs/kit'
import { REST_SERVER_URL } from './configuration'
import axios from 'axios'
import { getAxiosData } from './common'

const crearPlatoVacio = (): Plato => {
  return new Plato()
}

const obtenerPorId = async (id: number): Promise<Plato> => {
  const queryById = () => axios.get<PlatoJSON>(REST_SERVER_URL + '')
  const plato = PLATOS_MOCK.find(p => p.id === id)
  if (!plato)
    throw error(404, `El plato con el id ${id} no fue encontrado`)

  return plato
}

const actualizarPlato = async (plato: Plato): Promise<Plato> => {
  return axios.put<PlatoJSON>(REST_SERVER_URL + '/plato' + plato.id, plato.toJSON())
}
const crearPlato = async(plato: Plato): Promise<Plato> => {
  return axios.post(REST_SERVER_URL + '/plato', plato.toJSON())
}

const eliminarPlato = async (plato: Plato): Promise<Plato> => {
  return axios.delete(REST_SERVER_URL + '/plato/' + plato.id)
}

export const platosService = {
  crearPlatoVacio,
  obtenerPorId, 
  actualizarPlato,
  crearPlato,
  eliminarPlato
}

// CUANDO LA LLAMADA SEA AL BACK, LA BUSQUEDA SERIA:
/* const obtenerPorId = async (id: number): Promise<Plato | undefined> => {
    const response = await axios.get(`/api/platos/${id}`)
    return toPlato(response.data)
}
*/