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
  try {
    const response = await axios.put<LocalDTO>(API_URL, localDTO, {
      headers: { "Content-Type": "application/json" },
    })

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error en PUT /local:",
        error.response?.status,
        error.response?.data || error.message
      );
      throw new Error(
        `Error al guardar el local: ${error.response?.status || "desconocido"}`
      );
    } else {
      console.error("Error inesperado:", error)
      throw new Error("Error inesperado al guardar el local")
    }
  }
}