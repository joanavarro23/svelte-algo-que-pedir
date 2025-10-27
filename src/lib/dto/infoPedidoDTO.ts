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