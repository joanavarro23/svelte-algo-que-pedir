//Enums del front de medios de pago y estados posibles para el pedido
export enum MedioDePago {
  Efectivo = 'Efectivo',
  QR = 'QR',
  Tarjeta = 'Tarjeta de credito'
}

export enum EstadoDelPedido {
  Pendiente = 'Pendiente',
  Preparado = 'Preparado',
  Entregado = 'Entregado',
  Cancelado = 'Cancelado'
}

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
      medioDePago: pedidoJSON.medioDePago,        //mapMedioPago(String(pedidoJSON.medioDePago)) no se lo paso como string a la vista
      estadoPedido: pedidoJSON.estadoPedido  //mapEstado(String(pedidoJSON.estadoPedido)) 
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









// -- AUXILIARES --


//Auxiliares para poder mapear valor del enum con label
function mapMedioPago(medio: string): MedioDePago {
  return MedioDePago[medio as keyof typeof MedioDePago]
}

function mapEstado(medio: string): MedioDePago {
  return MedioDePago[medio as keyof typeof MedioDePago]
}



//Auxiliares para poder devolver label formato enum
const toLowercase = (texto : string) => texto.trim().toLowerCase()

type MedioDePagoKey = keyof typeof MedioDePago
type EstadoKey = keyof typeof EstadoDelPedido

function medioPagoToEnum(label: string): string {
  const keys = Object.keys(MedioDePago) as MedioDePagoKey[]
  const found = keys.find(k => MedioDePago[k] === label)
  return found ?? label
}

function estadoToEnum(label: string): string {
  const keys = Object.keys(EstadoDelPedido) as EstadoKey[]
  const found = keys.find(k => EstadoDelPedido[k] === label)
  return found ?? label
}


