import axios from 'axios'
import { error } from '@sveltejs/kit'
import type { LocalDTO } from '$lib/dto/localDTO'

const API_URL = 'http://localhost:9000/local'

export async function getLocal() {
  try {
    const response = await axios.get(API_URL)
    return response.data
  } catch (err) {
    throw error(404, 'Local not found' + err)
  }

  //No agarrar el error acá, y no asumir que es un 404
  //porque el error va a ser el que devuelva el back
}

export async function updateLocal(localDTO: LocalDTO): Promise<LocalDTO> {
  const response = await fetch(API_URL, {
    method: 'PUT', //Cambiar a AXIOS
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(localDTO)
  });

  if (!response.ok) {
    const text = await response.text()
    console.error('Error en POST /local:', response.status, text)
    throw new Error(`Error al guardar el local: ${response.status}`)
  }

  return await response.json();
}