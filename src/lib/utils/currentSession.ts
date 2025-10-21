export function getUsuarioDelLocal(): string | null {
  return sessionStorage.getItem('usuario')
}

export function getIdDelLocal(): number | null {
  const storedId = sessionStorage.getItem('idLocal')
  return storedId ? parseInt(storedId) : null
}