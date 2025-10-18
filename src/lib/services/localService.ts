import axios from 'axios'
import type { LocalDTO } from '$lib/dto/localDTO'

const API_URL = 'http://localhost:9000'
const PATH_LOCAL = '/local/'

export async function getLocal(id: number): Promise<LocalDTO> {
  const response = await axios.get<LocalDTO>(`${API_URL}${PATH_LOCAL}${id}`)
  return response.data
}

export async function updateLocal(localDTO: LocalDTO): Promise<LocalDTO> {
  const idLocal = 1 // Este ID luego se obtiene según el usuario/local que está logueado
  const response = await axios.put<LocalDTO>(`${API_URL}${PATH_LOCAL}${idLocal}`, localDTO, {
    headers: { 'Content-Type': 'application/json' }
  })
  return response.data
}