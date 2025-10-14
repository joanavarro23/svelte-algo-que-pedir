import axios from 'axios'
import { error } from '@sveltejs/kit'

export async function authenticateUser(username: string, password: string) {
  try {
    const response = await axios.post('http://localhost:9000/auth', { username, password }) // URL del backend
    return response.data
  } catch (err) {
    // Lanza un error que SvelteKit interpretará como HTTP 401
    throw error(401, 'Authentication failed: ' + err)
  }
}