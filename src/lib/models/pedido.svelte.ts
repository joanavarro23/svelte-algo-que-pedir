import { MedioDePago, medioPagoDesdeBack } from '$lib/models/metodosDePago.svelte'
import { EstadoDelPedido } from '$lib/models/estadosPedido'

//Tipado de DTOs del back para poder chequear que venga todo bien
export type DireccionJSON = {
  calle: string,
  altura: number,
  latitud: number,
  longitud: number
}

export type ClienteInfoJSON = {
  nombre: string,
  username: string
}

export type PedidoJSON = {
    id: number,
    cliente: ClienteInfoJSON,
    direccion: DireccionJSON,
    hora: string,
    items: number,
    precioTotal: number,
    medioDePago: MedioDePago,
    estadoPedido: EstadoDelPedido
}

//Clase de Pedido para el front
export class Pedido {
  id: number | null = null
  cliente!: ClienteInfoJSON
  direccion!: DireccionJSON
  hora!: string
  items!: number
  precioTotal!: number
  medioDePago!: MedioDePago
  estadoPedido!: EstadoDelPedido

  //Fx para crear un Pedido del front a partir del JSON que vino del back 
  static fromJSON(pedidoJSON: PedidoJSON): Pedido {
    return Object.assign(new Pedido(), pedidoJSON, {
      medioDePago: medioPagoDesdeBack(pedidoJSON.medioDePago),        
      estadoPedido: pedidoJSON.estadoPedido  
    })
  }

  //Fx para mandar un Pedido del front al dto del back
  toJSON(): PedidoJSON {
    return {
      id: this.id?? 0,    //podria haber una validacion o algo
      cliente: this.cliente,
      direccion: this.direccion,
      hora: this.hora,
      items: this.items,
      precioTotal: this.precioTotal,
      medioDePago: this.medioDePago,
      estadoPedido: this.estadoPedido
    }
  }
}

