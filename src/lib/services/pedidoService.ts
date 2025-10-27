import { Pedido, type PedidoJSON } from '$lib/models/pedido.svelte'
import { getAxiosData } from '$lib/services/common'
import { REST_SERVER_URL } from '$lib/services/configuration'
import axios from 'axios'


class PedidoService {
  async todosLosPedidos() {
    const queryPedidos = () => axios.get<PedidoJSON[]>(`${REST_SERVER_URL}/pedidos`)
    return (await getAxiosData(queryPedidos)).map(Pedido.fromJSON)
  }

  async pedidoByEstado(estado : string){
    const queryPedidosEstado = () => axios.get<PedidoJSON[]>(`${REST_SERVER_URL}/pedidos?estado=${estado}`)
    return (await getAxiosData(queryPedidosEstado)).map(Pedido.fromJSON)
  }
}

export const pedidoService = new PedidoService()