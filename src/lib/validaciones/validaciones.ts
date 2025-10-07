//Función para validar que un campo numérico no sea negativo
export function noNegativo(value: number): boolean {
  return value >= 0
}

//Función para validar que un campo numérico no exceda un valor máximo
export function numMaximo(value: number, max: number): boolean {
  return value <= max
}