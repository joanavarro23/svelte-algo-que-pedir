import { Ingrediente, type IngredienteDTO as IngredienteDTO } from '$lib/models/ingrediente.svelte'
import { getAxiosData } from '$lib/services/common'
import { REST_SERVER_URL } from '$lib/services/configuration'
import axios from 'axios'

class IngredienteService {
  async todosLosIngredientes() {
    const queryIngredientes = () => axios.get<IngredienteDTO[]>(`${REST_SERVER_URL}/ingrediente`)
    return (await getAxiosData(queryIngredientes)).map(Ingrediente.fromDTO)
  }

  async getIngredienteById(id: number) {
    const queryById = () => axios.get<IngredienteDTO>(`${REST_SERVER_URL}/ingrediente/${id}`)
    const ingredienteDTO = await getAxiosData(queryById)
    return Ingrediente.fromDTO(ingredienteDTO)
  }

  async actualizarIngrediente(ingrediente: Ingrediente) {
    return axios.put<IngredienteDTO>( `${REST_SERVER_URL}/ingrediente/${ingrediente.id}`, ingrediente.toDTO())
  }

  async crearIngrediente(ingrediente: Ingrediente) {
    return axios.post<IngredienteDTO>( `${REST_SERVER_URL}/ingrediente`, ingrediente.toDTO())
  }

  async eliminarIngrediente(id: number|null) {
    return axios.delete<IngredienteDTO>( `${REST_SERVER_URL}/ingrediente/${id}`)
    console.log(axios.delete<IngredienteDTO>( `${REST_SERVER_URL}/ingrediente/${id}`))
  }
}

export const ingredientesService = new IngredienteService()