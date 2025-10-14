import type { MetodoDePago } from '$lib/models/metodosDePago.svelte'

export interface LocalDTO {
  nombre: string
  urlImagenLocal: string
  direccion: string
  altura: number
  latitud: number
  longitud: number
  porcentajeSobreCadaPlato: number
  porcentajeRegaliasDeAutor: number
  mediosDePago: MetodoDePago[]
}